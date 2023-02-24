# Modifcations from mdast-util-gfm-strikthrough

- Create branch
- Create .remarkignore and add notes.md
- ./index.js: rename to attentionFrom/ToMarkdown
- ./lib/index.js: parameterize attentionTo/FromMarkdown, move handleStrikethrough and handleStrikethrough.peek inside attentionToMarkdown to parameterize
- Rename test.js .test.js
- Run task `npm prepack`
- Push
