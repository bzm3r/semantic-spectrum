import { PathLike, readFileSync } from "fs";
import { KeyFreqMap } from "./keyFreqMap";
import {
  greedyPlus,
  matchAnyExcept,
  namedGroup,
  quotedStringCleanup,
  TAG_LEFT,
  tagBlock,
  tagEndBegin,
} from "./regexParts";
import { UiRefItem } from "./refItem";

const codeBlock = tagBlock("code");

export function parseUiRefHtml(uiRefOut: PathLike): UiRefItem[] {
  let html = readFileSync(uiRefOut).toString();
  let selectorRe = codeBlock(
    namedGroup("selector", matchAnyExcept(tagEndBegin("code"), greedyPlus))
  );
  let descrRe = namedGroup("description", matchAnyExcept(TAG_LEFT, greedyPlus));
  let refItemRe = `${namedGroup("item", selectorRe + ": " + descrRe)}`;
  console.log(refItemRe);
  let regex = new RegExp(refItemRe, "gm");

  let match = regex.exec(html);
  let results = [];
  while (match?.groups) {
    let selector = match.groups["selector"].trim();
    results.push({
      selector,
      description: quotedStringCleanup(match.groups["description"]),
      keywords: new KeyFreqMap(selector),
    });
    match = regex.exec(html);
  }
  return results;
}
