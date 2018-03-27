{ Paramorph, Layout, Include, Page, Category, Tag } = require ".."
{ uneval } = require "./uneval"

describe "uneval", ->
  it "produces proper source", ->
    original = new Paramorph
      title: "Test"
    original.addLayout new Layout(
      "default"
      "./_layouts/default.ts"
    )
    original.addInclude new Include(
      "BreadCrumbs"
      "./_includes/BreadCrumbs/index.ts"
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
      ["diy"]
      ["exciting"]
      0
    )
    original.addPage new Category(
      "/diy"
      "Do It Yourself!"
      "Yes, you can!"
      "http://some.address/diy.jpg"
      "default"
      "/diy.markdown"
      true
      true
      []
      []
      1
    )
    original.addPage new Tag(
      "exciting"
      "This is an exciting tag."
      "http://some.address/exciting.jpg"
      "default"
      "/tag.markdown"
      true
      2
    )

    source = uneval original

    source.should.equal "const paramorph = new Paramorph({\"title\":\"Test\"});\n" +
      "paramorph.addLayout(new Layout(\"default\", \"./_layouts/default.ts\"));\n" +
      "paramorph.addInclude(new Include(\"BreadCrumbs\", \"./_includes/BreadCrumbs/index.ts\"));\n" +
      "paramorph.addPage(new Page(\"/\", \"Home\", \"This is a test page\", " +
      "\"http://some.address/image.jpg\", \"default\", \"/index.markdown\", " +
      "true, false, [\"diy\"], [\"exciting\"], 0));\n"+
      "paramorph.addPage(new Category(\"/diy\", \"Do It Yourself!\", \"Yes, you can!\", " +
      "\"http://some.address/diy.jpg\", \"default\", \"/diy.markdown\", " +
      "true, true, [], [], 1));\n"+
      "paramorph.addPage(new Tag(\"exciting\", \"This is an exciting tag.\", " +
      "\"http://some.address/exciting.jpg\", \"default\", \"/tag.markdown\", " +
      "true, 2));\n"

