import check from 'offensive';
import { safeLoad } from 'js-yaml';

import specialDirs from './specialDirs';

export interface Config {
  title : string;
  timezone : string;
  collections : HashMap<CollectionConfig>;
  baseUrl : string;
  image : string;
  locale : string;
  menu : MenuEntryConfig[];
}

export interface CollectionConfig {
  title ?: string;
  layout ?: string;
  output ?: boolean;
}

export interface MenuEntryConfig {
  title : string;
  short : string;
  url : string;
  icon : string;
}

export function load(yaml : string) : Config {
  const config = safeLoad(yaml);

  check(config.title, 'config.title').is.aString();
  check(config.timezone, 'config.timezone').is.aString();

  check(config.collections, 'config.collections').is.anObject();
  Object.keys(config.collections)
    .filter((key : string) => {
      if (specialDirs.indexOf(key) === -1) {
        console.warn(`couldn't find folder _${key} required by collection ${key}`);
        return false;
      }
      return true;
    })
    .forEach((key : string) => {
      const collection = config.collections[key];
      check(collection.title, `config.collections[${name}].title`).is.Undefined.or.aString();
      check(collection.layout, `config.collections[${name}].layout`).is.Undefined.or.aString();
      check(collection.output, `config.collections[${name}].output`).is.Undefined.or.aBoolean();
    })
  ;

  check(config.image, 'config.image').is.aString();
  check(config.baseUrl, 'config.baseUrl').is.aString();
  check(config.locale, 'pl_PL').is.aString();

  check(config.menu, 'config.menu').is.anArray();
  (config.menu as any[]).forEach((entry, i) => {
    check(entry, `config.menu[${i}].title`).is.aString();
    check(entry, `config.menu[${i}].short`).is.aString();
    check(entry, `config.menu[${i}].url`).is.aString();
    check(entry, `config.menu[${i}].icon`).is.aString();
  });

  return config as Config;
}

export interface HashMap<T> {
  [name : string] : T | undefined;
}

