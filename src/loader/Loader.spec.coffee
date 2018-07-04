
sinon = require "sinon"
{ FakePromise } = require "fake-promise"

{ Loader } = require "./Loader"
{ Layout, Include, Page } = require "../model"

describe "Loader", ->
  config =
    title: "test"
    timezone: "UTC"
    collections: []
    baseUrl: "http://paramorph.github.io/"
    image: ""
    locale: "en_US"
    menu: []
  mocks =
    projectStructure:
      scan: sinon.stub()
    frontMatter:
      read: sinon.stub()
    pageFactory:
      create: sinon.stub()

  testedLoader = null
  paramorph = null

  beforeEach ->
    testedLoader = new Loader mocks.projectStructure, mocks.frontMatter, mocks.pageFactory
  afterEach ->
    mocks.projectStructure.scan.resetBehavior()
    mocks.projectStructure.scan.resetHistory()
    mocks.frontMatter.read.resetBehavior()
    mocks.frontMatter.read.resetHistory()
    mocks.pageFactory.create.resetBehavior()
    mocks.pageFactory.create.resetHistory()

  tagPage =
    url: "/tag"
    tags: []
    categories: []
    output: false
  indexPage =
    url: "/"
    tags: []
    categories: []
    output: true

  describe "when loading empty project structure", ->
    struct =
      layouts: []
      includes: []
      collections: {}

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct

    it ".load() throws Error with complain about missing tag page", ->
      testedLoader.load config
        .then(
          (result) ->
            throw new Error "expected rejection; got #{JSON.stringify result}"
          (error) ->
            error.message.should.eql "Couldn't find page of url '/tag' (used to render tag pages)"
        )

  describe "when loading a project structure containing only tag page", ->
    struct =
      layouts: []
      includes: []
      collections: {
        pages: [
          {
            name: "tag"
            path: "./_pages/tag.markdown"
          }
        ]
      }

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      mocks.frontMatter.read.returns FakePromise.resolve {}
      mocks.pageFactory.create.returns tagPage
      paramorph = await testedLoader.load config

    it ".load() returns empty Paramorph instance", ->
      paramorph.layouts.should.eql {}
      paramorph.includes.should.eql {}
      paramorph.pages.should.eql {
        "/tag": tagPage
      }
      paramorph.categories.should.eql {}
      paramorph.tags.should.eql {}
      paramorph.config.should.eql config

  describe "when loading a project structure containing only a page with missing category", ->
    struct =
      layouts: []
      includes: []
      collections: {
        pages: [
          {
            name: "tag"
            path: "./_pages/tag.markdown"
          }
        ]
      }
    paramorphPromise = null

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      mocks.frontMatter.read.returns FakePromise.resolve {}
      mocks.pageFactory.create.returns Object.assign {}, tagPage, categories: ["missing"]

    it ".load() throws Error", ->
      testedLoader.load config
        .then(
          (result) ->
            throw new Error "expected rejection; got result=#{JSON.stringify result}",
          (error) ->
            error.message.should.equal(
              "Couldn't find category page(s): [{\"page\":\"/tag\",\"category\":\"missing\"}]"
            )
        )

  describe "when loading a project structure containing layouts", ->
    struct =
      layouts: [
        name: "default"
        path: "./_layouts/default.ts"
      ]
      includes: []
      collections: {
        pages: [
          {
            name: "tag"
            path: "./_pages/tag.markdown"
          }
        ]
      }

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      mocks.frontMatter.read.returns FakePromise.resolve {}
      mocks.pageFactory.create.returns tagPage
      paramorph = await testedLoader.load config

    it ".load() returns Paramorph containing layouts", ->
      Object.keys(paramorph.layouts).should.have.length 1
      paramorph.layouts.default.should.eql new Layout "default", "./_layouts/default.ts"

  describe "when loading a project structure containing includes", ->
    struct =
      layouts: [
      ]
      includes: [
        name: "Feed"
        path: "./_includes/Feed.ts"
      ]
      collections: {
        pages: [
          {
            name: "tag"
            path: "./_pages/tag.markdown"
          }
        ]
      }

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      mocks.frontMatter.read.returns FakePromise.resolve {}
      mocks.pageFactory.create.returns tagPage
      paramorph = await testedLoader.load config

    it ".load() returns Paramorph containing includes", ->
      Object.keys(paramorph.includes).should.have.length 1
      paramorph.includes.Feed.should.eql new Include "Feed", "./_includes/Feed.ts"

  describe "when loading a project structure containing page", ->
    postSource =
      name: "hello-world"
      path: "./_post/hello-world.md"
    struct =
      layouts: [
      ]
      includes: [
      ]
      collections:
        posts: [
          postSource
        ]
    matterPromise = null
    paramorphPromise = null

    beforeEach (end) ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      matterPromise = new FakePromise
      mocks.frontMatter.read.returns matterPromise
      paramorphPromise = testedLoader.load config
      setImmediate end

    it "calls frontMatter.read(...)", ->
      mocks.frontMatter.read.should.have.callCount 1
        .and.have.been.calledWith postSource

    describe "and after resolving frontMatter promise", ->
      matter =
        title: "Hello, World!"
        description: "Just a first post."
      page = new Page(
        "/hello-world"
        "Hello, World!"
        "Just a first post."
        null
        "posts"
        "default"
        "./_post/hello-world.md"
        true
        true
        []
        []
        0
      )

      beforeEach (end) ->
        mocks.pageFactory.create.returns page
        matterPromise.resolve matter
        setImmediate end

      it 'calls pageFactory.create(...)', ->
        mocks.pageFactory.create.should.have.callCount 1
          .and.have.been.calledWith postSource, "posts", matter

