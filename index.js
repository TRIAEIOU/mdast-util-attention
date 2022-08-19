/**
 * @typedef {import('mdast').Delete} Delete
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 */

/**
 * @typedef {Object} InlineType
 * @property {String} type
 * @property {import('mdast').PhrasingContent[]} children
 * @typedef {import('mdast-util-from-markdown/lib').Parent & InlineType} Inline
 */

import {containerPhrasing} from 'mdast-util-to-markdown/lib/util/container-phrasing.js'
import {track} from 'mdast-util-to-markdown/lib/util/track.js'

/**
 * Generate mdast node insertion extension for tag
 * @param {{mdastNode: string, htmlNode: string}} cfg
 * @returns {FromMarkdownExtension}
 */
export function inlineFactoryFromMarkdown(cfg) {
  /** @type {FromMarkdownExtension} */
  const temporary = {
    canContainEols: [cfg.mdastNode],
    enter: {},
    exit: {}
  }
  // @ts-ignore - FIXME: How to JSDoc cast as we know it is not undefined
  temporary.enter[cfg.mdastNode] = enterInline
  // @ts-ignore - FIXME: How to JSDoc cast as we know it is not undefined
  temporary.exit[cfg.mdastNode] = exitInline
  return temporary

  /** @type {FromMarkdownHandle} */
  function enterInline(token) {
    // @ts-ignore - FIXME: How to JSDoc extend typedef
    this.enter(
      {type: cfg.mdastNode, children: [], data: {hName: cfg.htmlNode}},
      token
    )
  }

  /** @type {FromMarkdownHandle} */
  function exitInline(token) {
    this.exit(token)
  }
}

/**
 * Generate mdast node serialization extension for tag
 * @param {{mdastNode: string, markdownSymbol: string}} cfg
 * @returns {ToMarkdownExtension}
 */
export function inlineFactoryToMarkdown(cfg) {
  const temporary = {
    unsafe: [{character: cfg.markdownSymbol, inConstruct: 'phrasing'}],
    handlers: {}
  }
  // @ts-ignore - FIXME: How to JSDoc cast as we know it is not undefined
  temporary.handlers[cfg.mdastNode] = handleInline
  // @ts-ignore - FIXME: How to JSDoc cast as we know it is not undefined
  temporary.handlers[cfg.mdastNode].peek = peekInline
  return temporary

  /**
   * @type {ToMarkdownHandle}
   * @param {Inline} node
   */
  function handleInline(node, _, context, safeOptions) {
    const tracker = track(safeOptions)
    const exit = context.enter('phrasing')
    let value = tracker.move(cfg.markdownSymbol)
    value += containerPhrasing(node, context, {
      ...tracker.current(),
      before: value,
      after: cfg.markdownSymbol[0]
    })
    value += tracker.move(cfg.markdownSymbol)
    exit()
    return value
  }

  /** @type {ToMarkdownHandle} */
  function peekInline() {
    return cfg.markdownSymbol[0]
  }
}
