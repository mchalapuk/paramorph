
import SourceFile from './SourceFile';

export interface SourceDirectory {
  readonly name : string;
  readonly path : string;
  readonly files : SourceFile[];
}

export default SourceDirectory;

