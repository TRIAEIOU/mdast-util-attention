/**
 * Extension for `mdast-util-from-markdown` to create single symbol attention (sub, sup etc).
 *
 * @param {Options} options
 *   MDAST and HAST node names
 * @returns {FromMarkdownExtension}
 *   Syntax extension for micromark (passed in `mdastExtensions`).
 */
export function attentionFromMarkdown(options: Options): FromMarkdownExtension
/**
 * Extension for `mdast-util-to-markdown` to create single symbol attention (sub, sup etc).
 *
 * @param {Options} options
 *   MDAST and HAST node names
 * @return {ToMarkdownExtension}
 */
export function attentionToMarkdown(options: Options): ToMarkdownExtension
export type Delete = import('mdast').Delete
export type CompileContext = import('mdast-util-from-markdown').CompileContext
export type FromMarkdownExtension = import('mdast-util-from-markdown').Extension
export type FromMarkdownHandle = import('mdast-util-from-markdown').Handle
export type ConstructName = import('mdast-util-to-markdown').ConstructName
export type ToMarkdownExtension = import('mdast-util-to-markdown').Options
export type ToMarkdownHandle = import('mdast-util-to-markdown').Handle
export type Code = import('micromark-util-types').Code
export type Options = {
  mdastNodeName: string
  hastNodeName: string
  code: Code
}
