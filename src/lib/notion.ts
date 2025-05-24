import { Client } from '@notionhq/client';
import { DevlogEntry } from '@/app/devlog/data';

// Initialize the Notion client
// Note: In a production environment, this should be stored in environment variables
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// The ID of the database containing devlog entries
// This should also be stored in environment variables
const databaseId = process.env.NOTION_DEVLOG_DATABASE_ID;

/**
 * Fetches all blocks for a specific page
 */
async function getPageBlocks(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    // Process blocks to create HTML content
    let content = '';
    let currentListType = null;
    let isListOpen = false;

    for (const block of blocks.results) {
      const blockType = block.type;

      // Handle list items specially to group them
      if (blockType === 'bulleted_list_item' || blockType === 'numbered_list_item') {
        const listType = blockType === 'bulleted_list_item' ? 'ul' : 'ol';

        // If we're not in a list or in a different type of list, close the previous list and start a new one
        if (!isListOpen || currentListType !== listType) {
          if (isListOpen) {
            content += `</${currentListType}>`;
          }
          content += `<${listType}>`;
          currentListType = listType;
          isListOpen = true;
        }

        // Add the list item
        content += processBlock(block, true);
      } else {
        // If we're leaving a list, close it
        if (isListOpen) {
          content += `</${currentListType}>`;
          isListOpen = false;
          currentListType = null;
        }

        // Process the non-list block
        content += processBlock(block);
      }
    }

    // Close any open list at the end
    if (isListOpen) {
      content += `</${currentListType}>`;
    }

    return content;
  } catch (error) {
    console.error('Error fetching page blocks from Notion:', error);
    return '';
  }
}

/**
 * Processes a block and returns HTML content
 */
function processBlock(block: any, isListItem = false): string {
  if (!block || !block.type) return '';

  const blockType = block.type;
  const blockContent = block[blockType];

  if (!blockContent) return '';

  switch (blockType) {
    case 'paragraph':
      return `<p>${getRichTextContent(blockContent.rich_text)}</p>`;
    case 'heading_1':
      return `<h1>${getRichTextContent(blockContent.rich_text)}</h1>`;
    case 'heading_2':
      return `<h2>${getRichTextContent(blockContent.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3>${getRichTextContent(blockContent.rich_text)}</h3>`;
    case 'bulleted_list_item':
      // If it's being processed as part of a list, just return the li element
      return isListItem
        ? `<li>${getRichTextContent(blockContent.rich_text)}</li>`
        : `<ul><li>${getRichTextContent(blockContent.rich_text)}</li></ul>`;
    case 'numbered_list_item':
      // If it's being processed as part of a list, just return the li element
      return isListItem
        ? `<li>${getRichTextContent(blockContent.rich_text)}</li>`
        : `<ol><li>${getRichTextContent(blockContent.rich_text)}</li></ol>`;
    case 'code':
      return `<pre><code>${getRichTextContent(blockContent.rich_text)}</code></pre>`;
    case 'quote':
      return `<blockquote>${getRichTextContent(blockContent.rich_text)}</blockquote>`;
    case 'divider':
      return `<hr>`;
    case 'image':
      if (blockContent.type === 'external') {
        return `<figure><img src="${blockContent.external.url}" alt="${blockContent.caption ? getRichTextContent(blockContent.caption) : ''}" />${blockContent.caption ? `<figcaption>${getRichTextContent(blockContent.caption)}</figcaption>` : ''}</figure>`;
      } else if (blockContent.type === 'file') {
        return `<figure><img src="${blockContent.file.url}" alt="${blockContent.caption ? getRichTextContent(blockContent.caption) : ''}" />${blockContent.caption ? `<figcaption>${getRichTextContent(blockContent.caption)}</figcaption>` : ''}</figure>`;
      }
      return '';
    case 'callout':
      return `<div class="callout">${blockContent.icon ? `<div class="callout-icon">${blockContent.icon.emoji}</div>` : ''}<div class="callout-content">${getRichTextContent(blockContent.rich_text)}</div></div>`;
    case 'toggle':
      return `<details><summary>${getRichTextContent(blockContent.rich_text)}</summary><div class="toggle-content"></div></details>`;
    case 'bookmark':
      return `<a href="${blockContent.url}" class="bookmark" target="_blank" rel="noopener noreferrer">${blockContent.url}</a>`;
    case 'table':
      return `<div class="table-container"><table><tbody></tbody></table></div>`;
    default:
      console.log(`Unhandled block type: ${blockType}`);
      return '';
  }
}

/**
 * Gets the formatted text content from rich text objects
 */
function getRichTextContent(richText: any[]): string {
  if (!richText || richText.length === 0) return '';

  return richText.map(text => {
    let formattedText = text.plain_text;

    // Apply text formatting
    if (text.annotations) {
      if (text.annotations.bold) {
        formattedText = `<strong>${formattedText}</strong>`;
      }
      if (text.annotations.italic) {
        formattedText = `<em>${formattedText}</em>`;
      }
      if (text.annotations.strikethrough) {
        formattedText = `<del>${formattedText}</del>`;
      }
      if (text.annotations.underline) {
        formattedText = `<u>${formattedText}</u>`;
      }
      if (text.annotations.code) {
        formattedText = `<code>${formattedText}</code>`;
      }
    }

    // Handle links
    if (text.href) {
      formattedText = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${formattedText}</a>`;
    }

    return formattedText;
  }).join('');
}

/**
 * Fetches all devlog entries from Notion
 */
export async function getDevlogEntries(): Promise<DevlogEntry[]> {
  if (!databaseId) {
    console.error('Notion database ID is not defined');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const entries = [];

    for (const page of response.results) {
      const properties = page.properties;
      const pageContent = await getPageBlocks(page.id);

      entries.push({
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
        summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
        content: pageContent,
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      });
    }

    return entries;
  } catch (error) {
    console.error('Error fetching devlog entries from Notion:', error);
    return [];
  }
}

/**
 * Fetches a specific devlog entry by slug
 */
export async function getDevlogEntryBySlug(slug: string): Promise<DevlogEntry | undefined> {
  if (!databaseId) {
    console.error('Notion database ID is not defined');
    return undefined;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Status',
            select: {
              equals: 'Published'
            }
          }
        ]
      },
    });

    if (response.results.length === 0) {
      return undefined;
    }

    const page = response.results[0];
    const properties = page.properties;
    const pageContent = await getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
      summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
    };
  } catch (error) {
    console.error('Error fetching devlog entry from Notion:', error);
    return undefined;
  }
}
