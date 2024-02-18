import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { KeyFreqMap } from "./keyFreqMap";
import path from "path";
import { saveRefData } from "./htmlFetch";
import { parseUiRefHtml } from "./uiRefParser";
import { UiRefItem } from "./refItem";
import { writeJson } from "./writeJson";
import { checkCwd } from "./cwd";

let cwd = checkCwd();

let uiRefOut = "ui_ref.html";
let uiRefURL = "https://code.visualstudio.com/api/references/theme-color";
let overwrite = false;

saveRefData(uiRefURL, uiRefOut, overwrite);

let refItems = parseUiRefHtml(uiRefOut);

let allKeyWords = new KeyFreqMap([]).merge(refItems.map((x) => x.keywords));

interface Selectors {
  [selector: string]: {
    description: string;
    keywords: string[];
  };
}

interface Categories {
  [key: string]: string[];
}

function createSelectors(refItems: UiRefItem[]): Selectors {
  let selectors: Selectors = {};
  for (let item of refItems) {
    selectors[item.selector] = {
      description: item.description,
      keywords: [...item.keywords.keySet()],
    };
  }
  return selectors;
}

function createCategories(refItems: UiRefItem[]): Categories {
  let categories: Categories = {};
  let kws = allKeyWords.keySet();
  kws.forEach((kw) => {
    categories[kw] = [];
  });
  for (let item of refItems) {
    for (let [kw] of item.keywords) {
      categories[kw].push(item.selector);
    }
  }
  return categories;
}

let uiSchemaObj = {
  selectors: createSelectors(refItems),
  categories: createCategories(refItems),
};

let schemaDir = path.join(cwd, "src/schema");
let uiSchemaPath = path.join(schemaDir, "ui.json");
writeJson(schemaDir, {
  filePath: uiSchemaPath,
  contents: JSON.stringify(uiSchemaObj),
});

// function logFirstTen<T>(title: string, xs: IterableIterator<T> | Array<T>) {
//   console.log(`${title}:\n`);
//   [...xs].slice(0, 10).forEach((x, ix) => {
//     console.log(`\t(${ix}): ${x}`);
//   });
// }

// logFirstTen("refItems", refItems.entries());

// logFirstTen("allKeyWords", allKeyWords.entries());

// let sortedKeyWords = allKeyWords.sort((a, b) => {
//   return (b[1] - a[1]);
// });
// logFirstTen(
//   "sortedKeyWords",
//   sortedKeyWords,
// );
