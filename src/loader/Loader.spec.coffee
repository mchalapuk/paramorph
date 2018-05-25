
sinon = require "sinon"

Loader = require "./Loader"
  .Loader

describe "Loader", ->
  mocks =
    projectStructure:
      scan: sinon.stub()
    frontMatter:
      load: sinon.stub()

  testedLoader = null

  beforeEach ->
    testedLoader = new Loader mocks.projectStructure, mocks.frontMatter
  afterEach ->
    mocks.projectStructure.scan.resetBehavior()
    mocks.projectStructure.scan.resetHistory()
    mocks.frontMatter.load.resetBehavior()
    mocks.frontMatter.load.resetHistory()

  describe 'when loading front empty project structure', ->
    config =
      title: 'test'
      timezone: 'UTC'
      collections: []
      baseUrl: 'http://paramorph.github.io/'
      image: ''
      locale: 'en_US'
      menu: []

    paramorph = null

    beforeEach ->
      mocks.projectStructure.scan.returns layouts: [], includes: [], collections: []
      paramorph = testedLoader.load config

    it '.load() returns empty Paramorph instance', ->
      paramorph.layouts.should.eql []
      paramorph.includes.should.eql []
      paramorph.pages.should.eql []
      paramorph.categories.should.eql []
      paramorph.tags.should.eql []
      paramorph.config.should.eql config

