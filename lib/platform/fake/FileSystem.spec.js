// Generated by CoffeeScript 2.2.3
(function() {
  var FakeFileSystem;

  FakeFileSystem = require("./FileSystem").FileSystem;

  describe("FakeFileSystem", function() {
    var testedFs;
    testedFs = null;
    beforeEach(function() {
      return testedFs = new FakeFileSystem;
    });
    it("throws when reading unexisting directory", function() {
      return testedFs.readDir('/').then(function(result) {
        throw new Error("expected an error got result: " + result);
      }).catch(function(err) {
        return err.should.eql(new Error("no such file or directory: /"));
      });
    });
    it("throws when stating unexisting directory", function() {
      return testedFs.lstat('/').then(function(result) {
        throw new Error("expected an error got result: " + result);
      }).catch(function(err) {
        return err.should.eql(new Error("no such file or directory: /"));
      });
    });
    it("throws when reading unexisting file", function() {
      return testedFs.read('/nope', 7).then(function(result) {
        throw new Error("expected an error got result: " + result);
      }).catch(function(err) {
        return err.should.eql(new Error("no such file or directory: /nope"));
      });
    });
    return describe("when after adding directory '/'", function() {
      beforeEach(function() {
        return testedFs.createDir("/");
      });
      it(".readDir('/') returns empty list", function() {
        return testedFs.readDir("/").then(function(result) {
          return result.should.eql([]);
        });
      });
      it(".lstat('/') returns proper stats", function() {
        return testedFs.lstat("/").then(function(result) {
          return result.isDirectory().should.equal(true);
        });
      });
      describe("and after adding some files directory '/'", function() {
        beforeEach(function() {
          testedFs.writeFile("/file0", "content0");
          return testedFs.writeFile("/file1", "content1");
        });
        it(".readDir('/') returns added files", function() {
          return testedFs.readDir("/").then(function(result) {
            return result.should.eql(["file0", "file1"]);
          });
        });
        it(".lstat('/file0') returns proper stats", function() {
          return testedFs.lstat("/file0").then(function(result) {
            return result.isDirectory().should.equal(false);
          });
        });
        it(".lstat('/file1') returns proper stats", function() {
          return testedFs.lstat("/file1").then(function(result) {
            return result.isDirectory().should.equal(false);
          });
        });
        it(".read('/file0', 8) returns proper content", function() {
          return testedFs.read("/file0", 8).then(function(result) {
            return result.should.equal("content0");
          });
        });
        it(".read('/file1', 8) returns proper content", function() {
          return testedFs.read("/file1", 8).then(function(result) {
            return result.should.equal("content1");
          });
        });
        return it(".read('/file1', 7) returns proper content", function() {
          return testedFs.read("/file1", 7).then(function(result) {
            return result.should.equal("content");
          });
        });
      });
      return describe("and after adding some subdirectories of '/'", function() {
        beforeEach(function() {
          testedFs.createDir("/subdir0");
          return testedFs.createDir("/subdir1");
        });
        it(".readDir('/') returns added subfolder", function() {
          return testedFs.readDir("/").then(function(result) {
            return result.should.eql(["subdir0", "subdir1"]);
          });
        });
        it(".lstat('/subdir0') returns proper stats", function() {
          return testedFs.lstat("/subdir0").then(function(result) {
            return result.isDirectory().should.equal(true);
          });
        });
        return it(".lstat('/subdir1') returns proper stats", function() {
          return testedFs.lstat("/subdir1").then(function(result) {
            return result.isDirectory().should.equal(true);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=FileSystem.spec.js.map