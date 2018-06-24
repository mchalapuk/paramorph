React = require "react"

{ FakePromise } = require "fake-promise"

model = require "../model"
{ Route } = require "react-router-dom"
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
  render: -> elem "div", elem "p", @props.page.title

createPage = (url, title, date) ->
  new model.Page url, title, "", null, "test", "test", "./test.md", true, true, [], [], date

locals =
  webpackStats:
    compilation:
      assets:
        "bundle.css": {}
        "bundle.js": {}

describe "ServerRenderer", ->
  testedRenderer = null

  beforeEach ->
    testedRenderer = new ServerRenderer Root

  it "renders single page", ->
    page = createPage "/", "Meeting", 0
    layout = new model.Layout "test", "./layouts/test.md"

    layoutPromise = new FakePromise
    pagePromise = new FakePromise

    paramorph = new model.Paramorph title: "website.test"
    paramorph.addLayout layout
    paramorph.addPage page

    actionPromise = new FakePromise
    route =
      path: page.url
      action: -> actionPromise

    resultPromise = testedRenderer.render locals, paramorph, [ route ]

    actionPromise.resolve React.createElement Layout, page: page

    resultPromise.then (result) ->
      (Object.keys result).should.eql [ "/" ]
      result["/"].should.equal "" +
        "<!DOCTYPE html>\n" +
        "<html>" +
          "<head><title>Meeting | website.test</title></head>" +
          "<body><div data-reactroot=\"\"><p>Meeting</p></div></body>" +
        "</html>"

