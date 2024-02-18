import { PathLike, readFileSync } from "fs";
import { KeyFreqMap } from "./keyFreqMap";
import {
  ANY_WHITESPACE,
  anyChar,
  cautiousPlus,
  greedyMatchAnyWhiteSpace,
  greedyPlus,
  greedyStar,
  matchAnyExcept,
  matchAnyIn,
  matchTaggedBody,
  namedGroup,
  NOT_ANY_WHITESPACE,
  quotedStringCleanup,
  tagBlock,
  tagEndBegin as tagEndBegin,
  testMatch,
} from "./regexParts";
import { TokenRefItems } from "./refItem";

const tableBlock = tagBlock("table");
const pBlock = tagBlock("p");

const TABLE_CONTENTS = "tableContents";
const SELECTOR = "selector";
const DESCRIPTION = "description";

function makeTableRe(tableTitle: string): string {
  return `${pBlock(tableTitle)}${matchAnyIn(
    [ANY_WHITESPACE],
    greedyStar
  )}${tableBlock(
    namedGroup(TABLE_CONTENTS, matchAnyExcept(tagEndBegin("table"), greedyPlus))
  )}`;
}

function extractTable(tokenRefHTML: string, tableTitle: string): string {
  let tableRe = makeTableRe(tableTitle);
  // console.log("tableRe: " + tableRe);
  let regex = new RegExp(tableRe, "gm");
  let match = regex.exec(tokenRefHTML);

  return testMatch(TABLE_CONTENTS, match).trim();
}

const matchTableData = (matcher?: { body?: string; name?: string }): string => {
  return matchTaggedBody("td", matcher);
};

const TABLE_ROW: string = "tableRow";
const matchTableRow = (): string => {
  return matchTaggedBody("tr", {
    name: TABLE_ROW,
  });
};

function extractTableRows(tableContents: string): string[] {
  let tableRowRe = `${matchTableRow()}`;
  // console.log("tableRowRe: " + tableRowRe);
  let regex = new RegExp(tableRowRe, "gm");

  let match = regex.exec(tableContents);
  let results: string[] = [];
  while (match?.groups) {
    results.push(match.groups[TABLE_ROW].trim());
    match = regex.exec(tableContents);
  }
  return results.filter((row) => !row.startsWith("<th>"));
}

function extractRefItem(tableRows: string[]): TokenRefItems {
  let matchSelector = matchTableData({
    body: matchTaggedBody("code", {
      body: matchAnyIn([NOT_ANY_WHITESPACE], cautiousPlus),
      name: SELECTOR,
    }),
  });
  let matchDescription = matchTableData({
    body: cautiousPlus(anyChar()),
    name: DESCRIPTION,
  });
  let tableDataRe = `${
    matchSelector + greedyMatchAnyWhiteSpace + matchDescription
  }`;
  let results: TokenRefItems = {};

  // Do not want to do a global match here, because we are repeating it not on
  // one block of text, but on pieces of text.
  let regex = new RegExp(tableDataRe);

  for (let tableRow of tableRows) {
    let match = regex.exec(tableRow);
    results[testMatch(SELECTOR, match, tableRow).trim()] = quotedStringCleanup(
      testMatch(DESCRIPTION, match, tableRow)
    );
  }
  return results;
}

const TOKEN_TABLE_TITLE: string = "Standard token types:";
const MOD_TABLE_TITLE: string = "Standard token modifiers:";

export function parseTokenRefHTML(tokenRefOut: PathLike): {
  tokens: TokenRefItems;
  modifiers: TokenRefItems;
} {
  let html = readFileSync(tokenRefOut).toString();
  let tokenTable = extractTable(html, TOKEN_TABLE_TITLE);
  let modifierTable = extractTable(html, MOD_TABLE_TITLE);
  return {
    tokens: extractRefItem(extractTableRows(tokenTable)),
    modifiers: extractRefItem(extractTableRows(modifierTable)),
  };
}
