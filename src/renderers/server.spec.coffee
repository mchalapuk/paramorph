React = require "react"

models = require "../models"
Route = require "react-router-dom"
  .Route

ServerRenderer = require "./server"
  .default

elem = (tag, children...) ->
  React.createElement tag, children: children

class Root extends React.Component
  render: ->
    (elem "html",
      (elem "head", elem "title", @props.page.title)
      (elem "body", "%%%BODY%%%")
    )
class Layout extends React.Component
  render: -> elem "div", elem @props.page.body

layout = new models.Layout "test", Layout

createPage = (url, title, date) ->
  new models.Page title, "", url, layout, (-> elem "p", title), true, date, [], [], true
createRoute = (page) ->
  React.createElement Route,
    page: page
    path: page.url
    key: page.url
    component: -> React.createElement Layout, page: page

locals =
  assets:
    "bundle.css": {}
    "bundle.js": {}

describe "ServerRenderer", ->
  testedRenderer = null

  beforeEach ->
    testedRenderer = new ServerRenderer Root

  it "renders single page", ->
    page = createPage "/", "Meeting", new Date "1954, Feb 20"
    route = createRoute page

    result = testedRenderer.render locals, [ { page, route } ]

    (Object.keys result).should.eql [ "/" ]
    result["/"].should.equal "" +
      "<!DOCTYPE html>\n" +
      "<html>" +
        "<head><title>Meeting</title></head>" +
        "<body><div data-reactroot=\"\"><p>Meeting</p></div></body>" +
      "</html>"

