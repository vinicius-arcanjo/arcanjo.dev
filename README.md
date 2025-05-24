# Devlog com Integração Notion

Este diretório contém a implementação do Devlog, que agora é alimentado através do Notion.

## Configuração

Para configurar a integração com o Notion, siga os passos abaixo:

1. Crie uma integração no Notion:
   - Acesse [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Clique em "New integration"
   - Dê um nome à sua integração (ex: "Arcanjo Devlog")
   - Selecione o workspace onde seu banco de dados do devlog está localizado
   - Clique em "Submit"
   - Copie o "Internal Integration Token" (este será seu `NOTION_API_KEY`)

2. Crie um banco de dados no Notion para o devlog com as seguintes propriedades:
   - Title (título): Tipo "Title"
   - Date (data): Tipo "Date"
   - Summary (resumo): Tipo "Text"
   - Content (conteúdo): Tipo "Text" (para conteúdo HTML)
   - Tags: Tipo "Multi-select"
   - Slug: Tipo "Text" (para URLs amigáveis)

3. Compartilhe o banco de dados com sua integração:
   - Abra o banco de dados no Notion
   - Clique em "Share" no canto superior direito
   - Clique em "Invite" e selecione sua integração na lista

4. Obtenha o ID do banco de dados:
   - Abra o banco de dados no Notion
   - Copie o ID da URL: `https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`
   - O ID é a parte entre o nome do workspace e o parâmetro "?v"

5. Configure as variáveis de ambiente:
   - Adicione as seguintes variáveis ao arquivo `.env.local` na raiz do projeto:
     ```
     NOTION_API_KEY=seu_token_de_integracao
     NOTION_DEVLOG_DATABASE_ID=id_do_seu_banco_de_dados
     ```

## Estrutura

- `page.tsx`: Página principal do devlog que lista todas as entradas
- `[slug]/page.tsx`: Página de entrada individual do devlog
- `data.ts`: Contém a interface `DevlogEntry` usada pelo sistema

## Uso

Para adicionar novas entradas ao devlog, basta criar novos itens no banco de dados do Notion. As entradas serão automaticamente exibidas no site após a atualização.

Cada entrada deve ter:
- Um título
- Uma data
- Um resumo
- Conteúdo HTML
- Tags (opcional)
- Um slug único para a URL
