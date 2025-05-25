// Types for Notion API responses

export interface NotionRichText {
  type: string;
  text?: {
    content: string;
    link?: {
      url: string;
    } | null;
  };
  annotations?: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
}

export interface NotionTitle {
  title: NotionRichText[];
}

export interface NotionRichTextProperty {
  rich_text: NotionRichText[];
}

export interface NotionDateProperty {
  date: {
    start: string;
    end?: string | null;
  } | null;
}

export interface NotionNumberProperty {
  number: number | null;
}

export interface NotionCheckboxProperty {
  checkbox: boolean;
}

export interface NotionSelectProperty {
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export interface NotionMultiSelectProperty {
  multi_select: {
    id: string;
    name: string;
    color: string;
  }[];
}

export interface NotionFileProperty {
  files: {
    name: string;
    type: 'file' | 'external';
    file?: {
      url: string;
      expiry_time: string;
    };
    external?: {
      url: string;
    };
  }[];
}

export interface NotionUrlProperty {
  url: string | null;
}

export interface NotionPageProperties {
  [key: string]: NotionTitle | NotionRichTextProperty | NotionDateProperty |
                NotionNumberProperty | NotionCheckboxProperty | NotionSelectProperty |
                NotionMultiSelectProperty | NotionFileProperty | NotionUrlProperty | any;
}

export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: NotionPageProperties;
}

export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

export interface NotionDatabaseQueryResponse {
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface NotionBlocksResponse {
  results: NotionBlock[];
  next_cursor: string | null;
  has_more: boolean;
}

// Common base interface for all content types
export interface NotionContent {
  id: string;
  title: string;
  slug: string;
  content: string;
}
