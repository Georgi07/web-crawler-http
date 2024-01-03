const {normalizeURL, getURLsFromHTML} = require('./crawl')
const {test, expect} = require('@jest/globals')

// Top level test function
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBoody = `
     <html>
      <body>
       <a href="https://blog.boot.dev/path">Boot.dev Blog</a>
      </body>
     </html> 
    `
    const inputBaseURL = "https://blog.boot.dev/path"
    const actual = getURLsFromHTML(inputHTMLBoody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBoody = `
     <html>
      <body>
       <a href="/path/">Boot.dev Blog</a>
      </body>
     </html> 
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBoody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both absolute and relative', () => {
    const inputHTMLBoody = `
     <html>
      <body>
       <a href="/path1/">Boot.dev Blog path one</a>
       <a href="https://blog.boot.dev/path2/">Boot.dev Blog path two</a>
      </body>
     </html> 
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBoody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBoody = `
     <html>
      <body>
       <a href="invalid">Invalid URL</a>
      </body>
     </html> 
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBoody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})