React = require "react"
ReactDOMServer = require "react-dom/server"

sinon = require "sinon"

ContentLimiter = require "./Content"
  .default

key = 0

elem = (name, children...) ->
  React.createElement name, { key: key++ }, if children.length is 0 then undefined else if children.length is 1 then children[0] else children

class TestComponent extends React.Component
  render: () -> React.createElement "div", { className: "test" }, @props.children

describe "Content", ->
  props = null
  testedContent = null

  beforeEach ->
    props = limit: 1, respectLimit: true, test: true

  renderingTests = [
    [
      "empty div"
      elem "div"
      "<div></div>"
    ]
    [
      "a paragraph"
      elem "p", "Lorem ipsum dolor sit amet."
      "<p>Lorem ipsum dolor sit amet.</p>"
    ]
    [
      "react component without children"
      elem TestComponent
      "<div class=\"test\"></div>"
    ]
    [
      "react component with children"
      elem TestComponent, elem "p", "Luke, I'm your father."
      "<div class=\"test\"><p>Luke, I&#x27;m your father.</p></div>"
    ]
  ]

  renderingTests.forEach (params) ->
    [ testName, children, expectedResult ] = params

    it "renders #{testName}", ->
      testedContent = React.createElement ContentLimiter, props, children

      limited = "<div class=\"content\">#{expectedResult}</div>"
      ReactDOMServer.renderToStaticMarkup testedContent
        .should.equal limited

  limitTests = [
    [
      "two sentences"
      [
        elem "p", (elem "b", "Ignorance"), " is a lack of ", (elem "a", "knowledge"), ". "
        "Knowledge is a lack of ignorance."
      ]
      "<p><b>Ignorance</b> is a lack of <a>knowledge</a>.</p>"
    ]
    [
      "images"
      elem "div", (elem "img"), (elem "img"), (elem "img")
      "<div></div>"
    ]
  ]

  limitTests.forEach (params) ->
    [ testName, children, expectedResult ] = params

    describe "when limiting #{testName}", ->
      beforeEach ->
        testedContent = React.createElement ContentLimiter, props, children

      it "renders limited children", ->
        limited = "<div class=\"content\">#{expectedResult}</div>"
        ReactDOMServer.renderToStaticMarkup testedContent
          .should.equal limited

  describe "with mapper configured", ->
    mapper = null
    testedContent = null

    beforeEach ->
      mapper = sinon.spy (node) -> elem "strong", "mapped"
      props = Object.assign { mapper }, props

    it "maps root component", ->
      children = elem "p", "root"
      testedContent = React.createElement ContentLimiter, props, children

      markup = ReactDOMServer.renderToStaticMarkup testedContent

      markup.should.equal "<div class=\"content\"><strong>mapped</strong></div>"

    it "maps children with mapper before parents", ->
      children = elem "p", (elem "b", "Ignorance"), " is a lack of elem knowledge."
      testedContent = React.createElement ContentLimiter, props, children

      ReactDOMServer.renderToStaticMarkup testedContent

      mapper.getCall(0).args[0].type.should.equal "b"
      mapper.getCall(1).args[0].type.should.equal "p"

    it "maps components after limiting", ->
      children = elem "p", ".", (elem "b", "To be limited"), "."
      testedContent = React.createElement ContentLimiter, props, children

      ReactDOMServer.renderToStaticMarkup testedContent

      mapper.should.have.callCount 1

