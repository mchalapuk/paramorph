import check from 'offensive';
import { safeLoad } from 'js-yaml';

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
  icon ?: string;
}

/**
 * Parses _config.yml, validates its content and returns as instance of Config.
 *
 * @author Maciej Chałapuk
 */
export function parse(yaml : string) : Config {
  const config = safeLoad(yaml) as any | undefined;
  if (config === undefined) {
    throw new Error('Couldn\'t parse config file; is it empty?');
  }

  check(config.title, 'config.title').is.aString();
  check(config.timezone, 'config.timezone').is.aString();

  check(config.collections, 'config.collections').is.anObject();
  Object.keys(config.collections)
    .forEach((key : string) => {
      const collection = config.collections[key];
      check(collection.title, `config.collections[${name}].title`).is.either.Undefined.or.aString();
      check(collection.layout, `config.collections[${name}].layout`).is.either.Undefined.or.aString();
      check(collection.output, `config.collections[${name}].output`).is.either.Undefined.or.aBoolean();
    })
  ;

  check(config.image, 'config.image').is.either.Undefined.or.aString();
  check(config.baseUrl, 'config.baseUrl').is.aString();
  check(config.locale, 'pl_PL').is.aString();

  check(config.menu, 'config.menu').is.anArray();
  (config.menu as any[]).forEach((entry, i) => {
    check(entry, `config.menu[${i}].title`).is.aString();
    check(entry, `config.menu[${i}].short`).is.aString();
    check(entry, `config.menu[${i}].url`).is.aString();
    check(entry, `config.menu[${i}].icon`).is.either.aString.or.Undefined();
  });

  return config as Config;
}

export interface HashMap<T> {
  [name : string] : T | undefined;
}

