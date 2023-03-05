export {attentionFromMarkdown, attentionToMarkdown, attentionFromHast} from './lib/index.js'

// Add custom data tracked to turn a syntax tree into markdown.
declare module 'mdast-util-to-markdown' {
  type ConstructNameMap = Record<string, string>
}
