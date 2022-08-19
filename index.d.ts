/**
 * Generate mdast node insertion extension for tag
 * @param {{mdastNode: string, htmlNode: string}} cfg
 * @returns {FromMarkdownExtension}
 */
export function inlineFactoryFromMarkdown(cfg: {
  mdastNode: string
  htmlNode: string
}): FromMarkdownExtension
/**
 * Generate mdast node serialization extension for tag
 * @param {{mdastNode: string, markdownSymbol: string}} cfg
 * @returns {ToMarkdownExtension}
 */
export function inlineFactoryToMarkdown(cfg: {
  mdastNode: string
  markdownSymbol: string
}): ToMarkdownExtension
export type Delete = import('mdast').Delete
export type FromMarkdownExtension = import('mdast-util-from-markdown').Extension
export type FromMarkdownHandle = import('mdast-util-from-markdown').Handle
export type ToMarkdownExtension = import('mdast-util-to-markdown').Options
export type ToMarkdownHandle = import('mdast-util-to-markdown').Handle
export type InlineType = {
  type: string
  children: import('mdast').PhrasingContent[]
}
export type Inline = import('mdast-util-from-markdown/lib').Parent & InlineType
