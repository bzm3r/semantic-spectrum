import { PathLike, readFileSync } from "fs";
import { Library } from "./common";
import { Coloring } from "./common";
import { jsonToObj } from "../jsonToObj";

export const tokenReference: {
  tokens: Library<string>;
  modifiers: Library<string>;
} = jsonToObj("../schema/tokens.json");

export interface HightlightTheme {
  name: String;
  baseSemantics: Library<Coloring>;
  modifierSemantics: Library<Coloring>;
}

export interface HighlightThemeFamily {
  readmeOut: PathLike;
  readmeTemplate: PathLike;
  main: HightlightTheme;
  derived: Array<HightlightTheme>;
}
