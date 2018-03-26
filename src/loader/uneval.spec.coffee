Paramorph = require ".."
  .Paramorph
Layout = require ".."
  .Layout
Page = require ".."
  .Page

uneval = require "./uneval"
  .uneval

describe "uneval", ->
  it "produces proper source", ->
    original = new Paramorph
      title: "Test"
    original.addLayout new Layout(
      "default"
      "./_layouts/default.ts"
    )
    original.addPage new Page(
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
      "paramorph.addLayout(new Layout(\"default\", \"./_layouts/default.ts\"));\n" +
      "paramorph.addPage(new Page(\"/\", \"Home\", \"This is a test page\", " +
      "\"http://some.address/image.jpg\", \"default\", \"/index.markdown\", " +
      "true, false, [], [], 0));\n"

