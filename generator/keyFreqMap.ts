import { Key } from "readline";
import { KeySet } from "./keySet";
import { splitAtLowerToUpper } from "./splitter";

export class KeyFreqMap extends Map<string, number> {
  keySet(): KeySet {
    return new KeySet([...this.keys()]);
  }

  splitOn(otherKeys: KeySet): {
    shared: KeyFreqMap;
    different: KeyFreqMap;
  } {
    let { shared, different } = this.keySet().splitOn(otherKeys);
    return {
      shared: this.onlyKeys(shared),
      different: this.onlyKeys(different),
    };
  }

  onlyKeys(keys: KeySet): KeyFreqMap {
    return this.filter((kw) => keys.has(kw));
  }

  insert(k: string, v: number) {
    if (v > 0) {
      this.set(k, v);
    }
  }

  merge(others: KeyFreqMap[]): KeyFreqMap {
    let result = this;
    for (let other of others) {
      for (let [k, v] of other.entries()) {
        result.insert(k, (result.get(k) ?? 0) + v);
      }
    }
    return result;
  }

  filter(predicate: (k: string, n: number) => boolean): KeyFreqMap {
    let items = [...this.entries()].filter(([k, n]) => {
      return predicate(k, n);
    });
    return new KeyFreqMap(items);
  }

  /**
   * Converts this `KeyFreqMap` into an array, and sorts it using the given
   * comparator function.
   *
   * @param comparator should return negative number if `a < b`, otherwise `>=
   * 0` (`== 0` if `a` == `b`)
   *
   * @returns `Array` representation of `KeyFreqMap` sorted by `comparator`.
   */
  sort(
    comparator: (a: [string, number], b: [string, number]) => number
  ): Array<[string, number]> {
    return [...this.entries()].sort(comparator);
  }

  constructor(input: [string, number][] | string) {
    let entries: [string, number][] = [];
    if (typeof input === "string") {
      //console.log("received a string: ", input);
      let keywords = input.split(".").flatMap((part) => {
        return splitAtLowerToUpper(part);
      });
      //console.log("\tconstructor(KFM): keywords:" + keywords);
      let keySet = new KeySet(keywords);
      //console.log("constructor(KFM): [...keySet]: " + [...keySet]);
      entries = keySet.map((k) => {
        let count = 0;
        keywords.forEach((x) => {
          if (x === k) {
            count += 1;
          }
        });
        //console.log(`${k} appears ${count} times in ${keywords}`);
        return [k, count];
      });
    } else {
      entries = input;
    }
    super(entries);
  }
}
