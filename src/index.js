const marked = require('marked')
const loaderUtils = require('loader-utils')
const toc = require('markdown-toc')
const emoji = require('node-emoji')
require('colors')

function hasTocTag(markdown) {
  return /\[TOC\]/g.test(markdown)
}

function emojiReplacer(match) {
  return emoji.emojify(match)
}

module.exports = function(markdown) {
  // merge params and default config
  const options = loaderUtils.getOptions(this)
  this.cacheable()
  marked.setOptions(options)

  if (options.toc && hasTocTag(markdown)) {
    const tocContent = toc(markdown).content
    // console.log('toc list is：\n', tocContent.green)
    const tocHtml = marked(tocContent)
    // console.log('toc html is：\n', tocHtml.green)
    markdown = markdown.replace(/\[TOC\]/g, tocHtml.replace('<ul>', '<ul class="toc-list">'))
  }
  return marked(markdown.replace(/:.+:/g, emojiReplacer))
}
