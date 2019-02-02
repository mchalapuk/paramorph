
export interface Config {
  title : string;
  timezone : string;
  collections : HashMap<CollectionConfig>;
  baseUrl : string;
  image : string;
  locale : string;
  menu : MenuEntryConfig[];
}

export default Config;

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

export interface HashMap<T> {
  [name : string] : T | undefined;
}

