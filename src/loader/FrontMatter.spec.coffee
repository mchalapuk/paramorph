FakeFileSystem = require "../platform/fake/FileSystem"
  .default
FrontMatter = require "./FrontMatter"
  .default

source = path: 'file.markdown'

describe "FrontMatter,", ->
  fileSystem = null
  testedFrontMatter = null

  beforeEach ->
    fileSystem = new FakeFileSystem
    testedFrontMatter = new FrontMatter fileSystem

  describe "when source file is not existent", ->
    it "throws when reading a source file", ->
      testedFrontMatter.read source
        .then(
          (result) -> throw new Error "expected rejection; got result #{result}",
          (error) -> error.should.eql new Error "no such file or directory: file.markdown",
        )
  describe "when source file is empty", ->
    beforeEach ->
      fileSystem.writeFile source.path, ''
    it "throws when reading a source file", ->
      testedFrontMatter.read source
        .then(
          (result) -> throw new Error "expected rejection; got result #{result}",
          (error) -> error.should.eql new Error "Couldn't find front matter data at the beginning of #{
            source.path}; expected '---\\n'; got ''.",
        )
  describe "when source doesn't have closing front-matter delimiter", ->
    beforeEach ->
      fileSystem.writeFile source.path, '---\n\n'
    it "throws when reading a source file", ->
      testedFrontMatter.read source
        .then(
          (result) -> throw new Error "expected rejection; got result #{result}",
          (error) ->
            error.should.eql new Error(
              "Couldn't find end of front matter data in first 2048 bytes of #{source.path}.",
            ),
        )
  describe "when source front-matter containes invalid yaml", ->
    beforeEach ->
      fileSystem.writeFile source.path, '---\n%#@$#$@L>><\n---\n'
    it "throws when reading a source file", ->
      testedFrontMatter.read source
        .then(
          (result) -> throw new Error "expected rejection; got result #{result}",
          (error) -> error.name.should.equal "YAMLException",
        )
  describe "when source front-matter contains valid yaml", ->
    beforeEach ->
      fileSystem.writeFile source.path, "---\ntable:\n- entry0\n- entry1\n---\n"
    it "returns parsed front-matter", ->
      testedFrontMatter.read source
        .then (result) -> result.should.eql table: [ "entry0", "entry1" ]

