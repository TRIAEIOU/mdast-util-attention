# mdast-util-attention

Mdast extension to handle nodes inserted by [micromark-extension-attention](https://github.com/TRIAEIOU/micromark-extension-attention).

## Modifcations from mdast-util-gfm-strikthrough

*   Create branch
*   Create .remarkignore and add notes.md
*   ./index.js: rename to attentionFrom/ToMarkdown
*   ./lib/index.js: parameterize attentionTo/FromMarkdown, move handleStrikethrough and handleStrikethrough.peek inside attentionToMarkdown to parameterize
*   Rename test.js .test.js
*   Run task `npm prepack`
*   Push

Note that the shipped `npm prepack` overwrites custom annotations in the .d.ts files and the eslint errors on import types. Also an .eslintrc had to be added to fix spurious errors in the source.
