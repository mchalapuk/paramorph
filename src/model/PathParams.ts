
import { EventEmitter } from 'events';

export class PathParams extends EventEmitter {
  private params : HashMap = {};

  set(newParams : HashMap) {
    const oldParams = this.params;
    this.params = newParams;

    const oldKeys = Object.keys(oldParams);
    const newKeys = Object.keys(newParams);

    const deletions = oldKeys.filter(key => newKeys.indexOf(key) === -1);
    const changes = newKeys.filter(key => newParams[key] !== oldParams[key]);

    global.setImmediate(() => {
      changes
        .concat(deletions)
        .sort()
        .forEach(key => this.emit(key, newParams[key]))
      ;
    });
  }

  get(key : string) {
    return this.params[key];
  }
}
export default PathParams;

export interface HashMap {
  [key : string] : string;
}

