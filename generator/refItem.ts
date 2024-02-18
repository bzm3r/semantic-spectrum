import { KeyFreqMap } from "./keyFreqMap";

export type ParsedSelector = {
  selector: string;
  description: string;
};

export type UiRefItem = ParsedSelector & {
  keywords: KeyFreqMap;
};

export type TokenRefItem = ParsedSelector;

export interface TokenRefItems {
  [selector: string]: string;
}
