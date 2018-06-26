React = require "react"
PropTypes = require "prop-types"

sinon = require "sinon"
{ FakePromise } = require "fake-promise"

model = require "../model"
{ ServerRenderer } = require "./server"

elem = (tag, children...) ->
  React.createElement tag, children: children

class Root extends React.Component
  render: ->
    (elem "html",
      (elem "head", elem "title", "#{@props.page.title} | #{@props.paramorph.config.title}")
      (elem "body", "%%%BODY%%%")
    )
class Layout extends React.Component
  @contextTypes: page: PropTypes.object
  render: ->
    elem "div", elem "p", @context.page.title

createPage = (url, title, date) ->
  new model.Page url, title, "", null, "test", "test", "./test.md", true, true, [], [], date

describe "ServerRenderer", ->
  router = null
  testedRenderer = null

  beforeEach ->
    page = createPage "/", "Meeting", 0
    layout = new model.Layout "test", "./layouts/test.md"

    paramorph = new model.Paramorph title: "website.test"
    paramorph.addLayout layout
    paramorph.addPage page

    history = {}
    router = resolve: sinon.stub()

    testedRenderer = new ServerRenderer history, router, paramorph

  describe "after calling render", ->
    routerPromise = null
    resultPromise = null

    beforeEach ->
      locals =
        Root: Root
        webpackStats:
          compilation:
            assets:
              "bundle.css": {}
              "bundle.js": {}

      routerPromise = new FakePromise
      router.resolve.returns routerPromise

      resultPromise = testedRenderer.render locals
      undefined

    describe "and after resoling router promise", ->
      beforeEach ->
        routerPromise.resolve React.createElement Layout

      it "renders single page", ->
        resultPromise.then (result) ->
          (Object.keys result).should.eql [ "/" ]
          result["/"].should.equal "" +
            "<!DOCTYPE html>\n" +
            "<html>" +
              "<head><title>Meeting | website.test</title></head>" +
              "<body><div data-reactroot=\"\"><p>Meeting</p></div></body>" +
            "</html>"

