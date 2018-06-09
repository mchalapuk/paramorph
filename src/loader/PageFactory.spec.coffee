
{ PageFactory } = require "./PageFactory"
{ Page, Category } = require "../model"

matter = (arg) ->
  { date: "Jun 05 2018 00:00 UTC", arg... }

describe "PageFactory", ->
  sourceFile =
    name: "test"
    path: "./_posts/test.md"
  collection = "posts"

  testedFactory = null

  beforeEach ->
    testedFactory = new PageFactory

  preconditionTests = [
    [
      "{}"
      {}
      "pages['test'].date must be a string; got undefined"
    ]
    [
      "{ date: 'jibberish' }"
      { date: 'jibberish' }
      "pages['test'].date must be a valid date; got 'jibberish'"
    ]
    [
      "{ role: 0 }"
      matter role: 0
      "pages['test'].role must be 'page' or 'category' or undefined; got 0"
    ]
    [
      "{ role: 'superhero' }"
      matter role: 0
      "pages['test'].role must be 'page' or 'category' or undefined; got 'superhero"
    ]
    [
      "{ title: true }"
      matter title: true
      "pages['test'].title must be a string or undefined; got true"
    ]
    [
      "{ description: null }"
      matter description: null
      "pages['test'].description must be a string or undefined; got null"
    ]
    [
      "{ permalink: 3.1415 }"
      matter permalink: 3.1415
      "pages['test'].permalink must be a string or undefined; got 3.1415"
    ]
    [
      "{ layout: Infinity }"
      matter layout: Infinity
      "pages['test'].layout must be a string or undefined; got Infinity"
    ]
    [
      "{ image: true }"
      matter image: true
      "pages['test'].image must be a string or undefined; got true"
    ]
    [
      "{ output: 12345 }"
      matter output: 12345
      "pages['test'].output must be a boolean or undefined; got 12345"
    ]
    [
      "{ categories: {} }"
      matter categories: {}
      "pages['test'].categories must be an array or undefined; got {}"
    ]
    [
      "{ categories: [ 0 ] }"
      matter categories: [ 0 ]
      "pages['test'].categories[0] must be a string; got 0 or pages['test'].categories must be undefined; got [0]"
    ]
    [
      "{ category: function() {} }"
      matter category: ->
      "pages['test'].category must be a string or undefined; got function category"
    ]
    [
      "{ tags: 0 }"
      matter tags: 0
      "pages['test'].tags must be an array or undefined; got 0"
    ]
    [
      "{ tags: [ 0 ] }"
      matter tags: [ 0 ]
      "pages['test'].tags[0] must be a string; got 0 or pages['test'].tags must be undefined; got [0]"
    ]
    [
      "{ feed: 12345 }"
      matter feed: 12345
      "pages['test'].feed must be a boolean or undefined; got 12345"
    ]
  ]

  preconditionTests.forEach (params) ->
    [ argDesc, arg, expectedMessage ] = params

    it "throws when calling .create(#{argDesc})", ->
      should -> testedFactory.create sourceFile, collection, arg
        .throw expectedMessage

  roleTests = [
    [ undefined, Page ]
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

