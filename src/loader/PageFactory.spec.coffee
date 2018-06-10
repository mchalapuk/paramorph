
{ PageFactory } = require "./PageFactory"
{ Page, Category } = require "../model"

date = "Jun 05 2018 00:00 UTC"
matter = (arg) -> { date, arg... }

describe "PageFactory", ->
  sourceFile =
    name: "test-page"
    path: "./_posts/test.md"
  collection = "posts"

  testedFactory = null

  beforeEach ->
    testedFactory = new PageFactory

  preconditionTests = [
    [
      "{}"
      {}
      "pages['test-page'].date must be a string; got undefined"
    ]
    [
      "{ date: 'jibberish' }"
      { date: 'jibberish' }
      "pages['test-page'].date must be a valid date; got 'jibberish'"
    ]
    [
      "{ role: 0 }"
      matter role: 0
      "pages['test-page'].role must be 'page' or 'category' or undefined; got 0"
    ]
    [
      "{ role: 'superhero' }"
      matter role: "superhero"
      "pages['test-page'].role must be 'page' or 'category' or undefined; got 'superhero'"
    ]
    [
      "{ title: true }"
      matter title: true
      "pages['test-page'].title must be a string or undefined; got true"
    ]
    [
      "{ description: null }"
      matter description: null
      "pages['test-page'].description must be a string or undefined; got null"
    ]
    [
      "{ permalink: 3.1415 }"
      matter permalink: 3.1415
      "pages['test-page'].permalink must be a string or undefined; got 3.1415"
    ]
    [
      "{ layout: Infinity }"
      matter layout: Infinity
      "pages['test-page'].layout must be a string or undefined; got Infinity"
    ]
    [
      "{ image: true }"
      matter image: true
      "pages['test-page'].image must be a string or undefined; got true"
    ]
    [
      "{ output: 12345 }"
      matter output: 12345
      "pages['test-page'].output must be a boolean or undefined; got 12345"
    ]
    [
      "{ categories: {} }"
      matter categories: {}
      "pages['test-page'].categories must be an array or undefined; got {}"
    ]
    [
      "{ categories: [ 0 ] }"
      matter categories: [ 0 ]
      "pages['test-page'].categories[0] must be a string; got 0 or pages['test-page'].categories must be undefined; got [0]"
    ]
    [
      "{ category: function() {} }"
      matter category: ->
      "pages['test-page'].category must be a string or undefined; got function category"
    ]
    [
      "{ tags: 0 }"
      matter tags: 0
      "pages['test-page'].tags must be an array or undefined; got 0"
    ]
    [
      "{ tags: [ 0 ] }"
      matter tags: [ 0 ]
      "pages['test-page'].tags[0] must be a string; got 0 or pages['test-page'].tags must be undefined; got [0]"
    ]
    [
      "{ feed: 12345 }"
      matter feed: 12345
      "pages['test-page'].feed must be a boolean or undefined; got 12345"
    ]
  ]

  preconditionTests.forEach (params) ->
    [ argDesc, arg, expectedMessage ] = params

    it "throws when calling .create(#{argDesc})", ->
      should -> testedFactory.create sourceFile, collection, arg
        .throw expectedMessage

  roleTests = [
    [ undefined, Page ]
    [ null, Page ]
    [ "page", Page ]
    [ "Page", Page ]
    [ "PAGE", Page ]
    [ "category", Category ]
    [ "Category", Category ]
    [ "CATEGORY", Category ]
  ]

  roleTests.forEach (params) ->
    [ role, ExpectedPrototype ] = params

    describe "when calling .create(#{JSON.stringify { role }}", ->
      result = null

      beforeEach ->
        result = testedFactory.create sourceFile, collection, matter { role }

      it "returns instance of #{ExpectedPrototype.name}", ->
        result.should.be.instanceOf ExpectedPrototype

  describe "when calling .crate({ date: '#{date}' })", ->
    result = null

    beforeEach ->
      result = testedFactory.create sourceFile, collection, matter()

    it "contains given date", ->
      result.timestamp.should.equal 1528156800000
    it "contains title generated from file name", ->
      result.title.should.equal "Test page"
    it "contains url generated from title", ->
      result.url.should.equal "/test-page"
    it "contains empty description", ->
      result.description.should.equal ""
    it "contains layout 'default'", ->
      result.layout.should.equal "default"
    it "contains output=true", ->
      result.output.should.equal true
    it "contains feed=true", ->
      result.feed.should.equal true
    it "contains no categories", ->
      result.categories.should.eql []
    it "contains no tags", ->
      result.tags.should.eql []

  fullMatter =
    permalink: '/link'
    title: "Title"
    description: "Full defined page"
    layout: "Custom"
    output: false
    feed: false

  describe "when calling .crate(#{JSON.stringify fullMatter})", ->
    result = null

    beforeEach ->
      result = testedFactory.create sourceFile, collection, matter fullMatter

    it "contains given title", ->
      result.title.should.equal fullMatter.title
    it "contains given url", ->
      result.url.should.equal fullMatter.permalink
    it "contains given description", ->
      result.description.should.equal fullMatter.description
    it "contains given layout", ->
      result.layout.should.equal fullMatter.layout
    it "contains given output", ->
      result.output.should.equal fullMatter.output
    it "contains given feed", ->
      result.feed.should.equal fullMatter.feed

  tagsMatter = tags: [ 'a', 'b', 'c' ]

  describe "when calling .crate(#{JSON.stringify tagsMatter})", ->
    result = null

    beforeEach ->
      result = testedFactory.create sourceFile, collection, matter tagsMatter

    it "contains given tags", ->
      result.tags.should.eql tagsMatter.tags

  categoriesMatter = categories: [ 'a', 'b', 'c' ]

  describe "when calling .crate(#{JSON.stringify categoriesMatter})", ->
    result = null

    beforeEach ->
      result = testedFactory.create sourceFile, collection, matter categoriesMatter

    it "contains given categories", ->
      result.categories.should.eql categoriesMatter.categories

  categoryMatter = category: 'a'

  describe "when calling .crate(#{JSON.stringify categoryMatter})", ->
    result = null

    beforeEach ->
      result = testedFactory.create sourceFile, collection, matter categoryMatter

    it "contains given categories", ->
      result.categories.should.eql [ 'a' ]

  categoriesCategoryMatter =
    categories: [ 'a', 'b', 'c' ]
    category: 'd'

  describe "when calling .crate(#{JSON.stringify categoriesCategoryMatter})", ->
    result = null

    beforeEach ->
      result = testedFactory.create sourceFile, collection, matter categoriesCategoryMatter

    it "contains given categories", ->
      result.categories.should.eql [ 'a', 'b', 'c', 'd' ]


