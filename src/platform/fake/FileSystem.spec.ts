
import FakeFileSystem from './FileSystem';

describe('FakeFileSystem', () => {
  let testedFs : FakeFileSystem;

  beforeEach(() => {
    testedFs = new FakeFileSystem();
  });

  it('throws when reading unexisting directory', () => {
    return testedFs.readDir('/')
      .then(
        result => { throw new Error(`expected an error got result: ${result}`); },
        err => err.should.eql(new Error('no such file or directory: /')),
      )
    ;
  });
  it('throws when stating unexisting directory', () => {
    return testedFs.lstat('/')
      .then(
        result => { throw new Error(`expected an error got result: ${result}`); },
        err => err.should.eql(new Error('no such file or directory: /')),
      )
    ;
  });
  it('throws when reading unexisting file', () => {
    return testedFs.read('/nope', 7)
      .then(
        result => { throw new Error(`expected an error got result: ${result}`); },
        err => err.should.eql(new Error('no such file or directory: /nope')),
      )
    ;
  });

  describe('when after adding directory \'/\'', () => {
    beforeEach(() => {
      return testedFs.createDir('/');
    });

    it('.readDir(\'/\') returns empty list', () => {
      return testedFs.readDir('/')
        .then(result => result.should.eql([]))
      ;
    });

    it('.lstat(\'/\') returns proper stats', () => {
      return testedFs.lstat('/')
        .then(result => result.isDirectory().should.equal(true))
      ;
    });

    describe('and after adding some files directory \'/\'', () => {
      beforeEach(() => {
        testedFs.writeFile('/file0', 'content0');
        testedFs.writeFile('/file1', 'content1');
      });

      it('.readDir(\'/\') returns added files', () => {
        return testedFs.readDir('/')
          .then(result => result.should.eql([ 'file0', 'file1' ]))
        ;
      });
      it('.lstat(\'/file0\') returns proper stats', () => {
        return testedFs.lstat('/file0')
          .then(result => result.isDirectory().should.equal(false))
        ;
      });
      it('.lstat(\'/file1\') returns proper stats', () => {
        return testedFs.lstat('/file1')
          .then(result => result.isDirectory().should.equal(false))
        ;
      });
      it('.read(\'/file0\', 8) returns proper content', () => {
        return testedFs.read('/file0', 8)
          .then(result => result.should.equal('content0'))
        ;
      });
      it('.read(\'/file1\', 8) returns proper content', () => {
        return testedFs.read('/file1', 8)
          .then(result => result.should.equal('content1'))
        ;
      });
      it('.read(\'/file1\', 7) returns proper content', () => {
        return testedFs.read('/file1', 7)
          .then(result => result.should.equal('content'))
        ;
      });
    });

    describe('and after adding some subdirectories of \'/\'', () => {
      beforeEach(() => {
        testedFs.createDir('/subdir0');
        testedFs.createDir('/subdir1');
      });

      it('.readDir(\'/\') returns added subfolder', () => {
        return testedFs.readDir('/')
          .then(result => result.should.eql('subdir0', 'subdir1'))
        ;
      });
      it('.lstat(\'/subdir0\') returns proper stats', () => {
        return testedFs.lstat('/subdir0')
          .then(result => result.isDirectory().should.equal(true))
        ;
      });
      it('.lstat(\'/subdir1\') returns proper stats', () => {
        testedFs.lstat('/subdir1')
          .then(result => result.isDirectory().should.equal(true))
        ;
      });
    });
  });
});

