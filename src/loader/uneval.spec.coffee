Paramorph = require ".."
  .Paramorph
Page = require ".."
  .Page

uneval = require "./uneval"
  .uneval

describe "uneval", ->
  it "produces proper source", ->
    original = new Paramorph
      title: "Test"
    original.addPage "/", new Page(
      "/"
      "Home"
      "This is a test page"
      "http://some.address/image.jpg"
      "default"
      "/index.markdown"
      true
      false
      []
      []
      0
    )

    source = uneval original

    source.should.equal "const paramorph = new Paramorph({\"title\":\"Test\"});\n" +
      "paramorph.addPage(\"/\", new Page(\"/\", \"Home\", \"This is a test page\", " +
      "\"http://some.address/image.jpg\", \"default\", \"/index.markdown\", " +
      "true, false, [], [], 0));\n"

