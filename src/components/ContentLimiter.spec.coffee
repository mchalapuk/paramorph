React = require "react"
ReactDOMServer = require "react-dom/server"

ContentLimiter = require "./ContentLimiter"
  .default

key = 0

elem = (name, children...) ->
  React.createElement name, { key: key++ }, if children.length is 1 then children[0] else children

describe "ContentLimiter", ->
  props = limit: 1, respectLimit: true, test: true

  testedLimiter = null

  noLimitTests = [
    [
      "limiting single sentence"
      elem "p", (elem "b", "Ignorance"), " is a lack of ", (elem "a", "knowledge"), "."
    ]
  ]

  noLimitTests.forEach (params) ->
    [ testName, children ] = params

    describe "when #{testName}", ->
      beforeEach ->
        testedLimiter = React.createElement ContentLimiter, props, children

      it "contains not limited children", ->
        notLimited = React.createElement "div", { className: "content" }, children
        ReactDOMServer.renderToStaticMarkup testedLimiter
          .should.equal ReactDOMServer.renderToStaticMarkup notLimited

  limitTests = [
    [
      "limiting two sentences"
      elem "p", (elem "b", "Ignorance"), " is a lack of ", (elem "a", "knowledge"), ". ",
        "Knowledge is a lack of ignorance."
      "<p><b>Ignorance</b> is a lack of <a>knowledge</a>.</p>"
    ]
    [
      "limiting images"
      elem "div", (elem "img"), (elem "img"), (elem "img")
      "<div></div>"
    ]
  ]

  limitTests.forEach (params) ->
    [ testName, children, expectedResult ] = params

    describe "when #{testName}", ->
      beforeEach ->
        testedLimiter = React.createElement ContentLimiter, props, children

      it "contains limited children", ->
        limited = "<div class=\"content\">#{expectedResult}</div>"
        ReactDOMServer.renderToStaticMarkup testedLimiter
          .should.equal limited

