
import { safeLoad } from 'js-yaml';

import 'offensive/assertions/aString/register';
import 'offensive/assertions/aBoolean/register';
import 'offensive/assertions/anArray/register';
import 'offensive/assertions/Undefined/register';
import 'offensive/assertions/Empty/register';
import 'offensive/assertions/allElementsThat/register';
import 'offensive/assertions/fieldThat/register';
import 'offensive/assertions/allFieldsThat/register';
import check from 'offensive';

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

  check(config, 'config')
    .has.fieldThat('title', title => title.is.aString)
    .and.fieldThat('timezone', timezone => timezone.is.aString)
    .and.fieldThat('collections', collections => collections
      .is.anObject
      .and.has.allFieldsThat(collection => collection
        .has.fieldThat('title', title => title.is.Undefined.or.aString)
        .and.fieldThat('layout', layout => layout.is.Undefined.or.aString)
        .and.fieldThat('output', output => output.is.Undefined.or.aBoolean)
      )
    )
    .and.fieldThat('image', image => image.is.Empty.or.aString)
    .and.fieldThat('baseUrl', baseUrl => baseUrl.is.aString)
    .and.fieldThat('locale', locale => locale.is.aString)
    .and.fieldThat('menu', menu => menu
      .is.anArray
      .and.has.allElementsThat(elem => elem
        .has.fieldThat('title', title => title.is.aString)
        .and.fieldThat('short', short => short.is.aString)
        .and.fieldThat('url', url => url.is.aString)
        .and.fieldThat('icon', icon => icon.is.Empty.or.aString)
      )
    )
    ();

  return config as Config;
}

export interface HashMap<T> {
  [name : string] : T | undefined;
}

