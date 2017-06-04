
import { MenuEntry } from '../models';

const config = require('../../_config.yml');

function checkIsArray(value : any, name : string) {
  if (!(value instanceof Array)) {
    throw new Error(`${name} must be an array; got ${typeof value}`);
  }
  return value;
}
function checkIsString(value : any, name : string) {
  if (typeof value != 'string') {
    throw new Error(`${name} must be a string; got ${typeof value}`);
  }
  return value;
}

checkIsArray(config.menu, 'config.menu');

const isLocalUrl = (url : string) => url.charAt(0) == '/' && url.charAt(1) != '/';

function warnIfNotAPageOrCategory(url : string, requiredBy : string) {
/**
  if (isLocalUrl(url) && website.pages[url] == undefined && website.categories[url] == undefined) {
    console.warn(`page of url \'${url}\' required by ${requiredBy} is not defined`);
  }
**/
  return url;
}

const menu = config.menu.map((cfg : any, i : number) => {
  return new MenuEntry(
    checkIsString(cfg.title, `menu[${i}].title`),
    checkIsString(cfg.short, `menu[${i}].short`),
    warnIfNotAPageOrCategory(checkIsString(cfg.url, `menu[${i}].url`), `menu entry '${cfg.title}'`),
    cfg.icon && checkIsString(cfg.icon, `menu[${i}].icon`),
  );
});

export default menu;

