import { existsSync, mkdirSync, rmSync } from "fs";
import path from "path";
import { saveRefData } from "./htmlFetch";
import { parseTokenRefHTML } from "./tokenRefParser";
import { checkCwd } from "./cwd";
import { writeJson } from "./writeJson";

checkCwd();

let tokenRefOut = "token_ref.html";
let tokenRefURL =
  "https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide";
let overwrite = false;

if (!saveRefData(tokenRefURL, tokenRefOut, overwrite)) {
  console.error(Error("Failed to save reference data to path: " + tokenRefOut));
}
let tokenRefObj = parseTokenRefHTML(tokenRefOut);

let schemaDir = "src/schema";
let tokenSchemaPath = path.join(schemaDir, "tokens.json");

if (!existsSync(schemaDir)) {
  mkdirSync(schemaDir);
} else if (existsSync(tokenSchemaPath)) {
  rmSync(tokenSchemaPath);
}
writeJson(schemaDir, {
  filePath: tokenSchemaPath,
  contents: JSON.stringify(tokenRefObj),
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
