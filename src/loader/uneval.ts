import { Paramorph, Layout, Include, Page } from '..';

export function uneval(paramorph : Paramorph, varName : string = 'paramorph') : string {
  return `const ${varName} = new Paramorph(${JSON.stringify(paramorph.config)});\n`
    + Object.keys(paramorph.layouts)
    .map(key => paramorph.layouts[key] as Layout)
    .map(layout => `${varName}.addLayout(${unevalLayout(layout)});\n`)
    .join('')
    + Object.keys(paramorph.includes)
    .map(key => paramorph.includes[key] as Layout)
    .map(include => `${varName}.addInclude(${unevalInclude(include)});\n`)
    .join('')
    + Object.keys(paramorph.pages)
    .map(key => paramorph.pages[key] as Page)
    .map(page => `${varName}.addPage(${unevalPage(page)});\n`)
    .join('')
  ;
}

export default uneval;

export function unevalLayout(layout : Layout) {
  return `new Layout(${
    JSON.stringify(layout.name)
  }, ${
    JSON.stringify(layout.path)
  })`;
}

export function unevalInclude(include : Include) {
  return `new Include(${
    JSON.stringify(include.name)
  }, ${
    JSON.stringify(include.path)
  })`;
}

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

