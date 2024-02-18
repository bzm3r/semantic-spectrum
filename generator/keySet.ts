type IterableKeys = KeySet | Array<string> | IterableIterator<string>;

export class KeySet extends Set<string> {
  union(others: IterableKeys): KeySet {
    return new KeySet(others);
  }

  filter(p: (x: string) => boolean): KeySet {
    return new KeySet([...this].filter((x) => p(x)));
  }

  splitOn(others: IterableKeys): {
    shared: KeySet;
    different: KeySet;
  } {
    let otherSet = new KeySet(others);
    let shared = new KeySet([]);
    let different = new KeySet([]);

    for (let key of [...this]) {
      if (otherSet.has(key)) {
        shared.add(key);
      } else {
        different.add(key);
      }
    }

    return {
      shared,
      different,
    };
  }

  intersection(others: IterableKeys): KeySet {
    let otherSet = new KeySet(others);
    return otherSet.filter((x) => this.has(x));
  }

  difference(others: IterableKeys): KeySet {
    let otherSet: KeySet = new KeySet(others);
    return this.filter((x) => !otherSet.has(x));
  }

  map<T>(f: (k: string) => T): Array<T> {
    return [...this].map(f);
  }

  constructor(others: IterableKeys) {
    if (others instanceof KeySet) {
      return others;
    } else {
      super([...others]);
    }
  }
}
