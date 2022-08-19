import test from 'tape'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toMarkdown} from 'mdast-util-to-markdown'
import {removePosition} from 'unist-util-remove-position'
import {inlineFactory} from 'micromark-extension-inline-factory'
import {inlineFactoryFromMarkdown, inlineFactoryToMarkdown} from './index.js'

const strikethrough = {
  markdownSymbol: '~~',
  mdastNode: 'strikethrough',
  htmlNode: 'del'
}

test('markdown -> mdast', (t) => {
  t.deepEqual(
    removePosition(
      fromMarkdown('a ~~b~~ c.', {
        extensions: [inlineFactory(strikethrough)],
        mdastExtensions: [inlineFactoryFromMarkdown(strikethrough)]
      }),
      true
    ),
    {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {type: 'text', value: 'a '},
            {type: 'delete', children: [{type: 'text', value: 'b'}]},
            {type: 'text', value: ' c.'}
          ]
        }
      ]
    },
    'should support strikethrough'
  )

  t.deepEqual(
    removePosition(
      fromMarkdown('a ~~b\nc~~ d.', {
        extensions: [inlineFactory(strikethrough)],
        mdastExtensions: [inlineFactoryFromMarkdown(strikethrough)]
      }),
      true
    ),
    {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {type: 'text', value: 'a '},
            {type: 'delete', children: [{type: 'text', value: 'b\nc'}]},
            {type: 'text', value: ' d.'}
          ]
        }
      ]
    },
    'should support strikethrough w/ eols'
  )

  t.end()
})

test('mdast -> markdown', (t) => {
  t.deepEqual(
    toMarkdown(
      {
        type: 'paragraph',
        children: [
          {type: 'text', value: 'a '},
          {type: 'delete', children: [{type: 'text', value: 'b'}]},
          {type: 'text', value: ' c.'}
        ]
      },
      {extensions: [inlineFactoryToMarkdown(strikethrough)]}
    ),
    'a ~~b~~ c.\n',
    'should serialize strikethrough'
  )

  t.deepEqual(
    toMarkdown(
      {
        type: 'paragraph',
        children: [
          {type: 'text', value: 'a '},
          {type: 'delete', children: [{type: 'text', value: 'b\nc'}]},
          {type: 'text', value: ' d.'}
        ]
      },
      {extensions: [inlineFactoryToMarkdown(strikethrough)]}
    ),
    'a ~~b\nc~~ d.\n',
    'should serialize strikethrough w/ eols'
  )

  t.end()
})
