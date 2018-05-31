
sinon = require "sinon"
FakePromise = require "fake-promise"
  .FakePromise

Loader = require "./Loader"
  .Loader

{ Layout, Include } = require "../model"

describe "Loader", ->
  config =
    title: 'test'
    timezone: 'UTC'
    collections: []
    baseUrl: 'http://paramorph.github.io/'
    image: ''
    locale: 'en_US'
    menu: []
  mocks =
    projectStructure:
      scan: sinon.stub()
    frontMatter:
      load: sinon.stub()

  testedLoader = null
  paramorph = null

  beforeEach ->
    testedLoader = new Loader mocks.projectStructure, mocks.frontMatter
  afterEach ->
    mocks.projectStructure.scan.resetBehavior()
    mocks.projectStructure.scan.resetHistory()
    mocks.frontMatter.load.resetBehavior()
    mocks.frontMatter.load.resetHistory()

  describe 'when loading empty project structure', ->
    struct =
      layouts: []
      includes: []
      collections: []

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      paramorph = await testedLoader.load config

    it '.load() returns empty Paramorph instance', ->
      paramorph.layouts.should.eql {}
      paramorph.includes.should.eql {}
      paramorph.pages.should.eql {}
      paramorph.categories.should.eql {}
      paramorph.tags.should.eql {}
      paramorph.config.should.eql config

  describe 'when loading a project structure containing layouts', ->
    struct =
      layouts: [
        name: "default"
        path: "./_layouts/default.ts"
      ]
      includes: []
      collections: []

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      paramorph = await testedLoader.load config

    it '.load() returns Paramorph containing layouts', ->
      Object.keys(paramorph.layouts).should.have.length 1
      paramorph.layouts.default.should.eql new Layout "default", "./_layouts/default.ts"

  describe 'when loading a project structure containing includes', ->
    struct =
      layouts: [
      ]
      includes: [
        name: "Feed"
        path: "./_includes/Feed.ts"
      ]
      collections: []

    beforeEach ->
      mocks.projectStructure.scan.returns FakePromise.resolve struct
      paramorph = await testedLoader.load config

    it '.load() returns Paramorph containing includes', ->
      Object.keys(paramorph.includes).should.have.length 1
      paramorph.includes.Feed.should.eql new Include "Feed", "./_includes/Feed.ts"

