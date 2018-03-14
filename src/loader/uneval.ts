import { Paramorph, Page } from '..';

export function uneval(paramorph : Paramorph, varName : string = 'paramorph') : string {
  return `const ${varName} = new Paramorph(${JSON.stringify(paramorph.config)});\n`
    + Object.keys(paramorph.pages)
    .map(url => `${varName}.addPage("${url}", ${unevalPage(paramorph.pages[url] as Page)});\n`)
    .join('')
  ;
}

export default uneval;

export function unevalPage(page : Page) {
  return `new Page(${
    JSON.stringify(page.url)
  }, ${
    JSON.stringify(page.title)
  }, ${
    JSON.stringify(page.description)
  }, ${
    JSON.stringify(page.image)
  }, ${
    JSON.stringify(page.layout)
  }, ${
    JSON.stringify(page.source)
  }, ${
    JSON.stringify(page.output)
  }, ${
    JSON.stringify(page.feed)
  }, ${
    JSON.stringify(page.categories)
  }, ${
    JSON.stringify(page.tags)
  }, ${
    JSON.stringify(page.timestamp)
  })`;
}

