export function isLowerCase(s: string): boolean {
  return (s.toLowerCase() === s);
}

export function splitAtIndex(s: string, index: number): [string, string] {
  if (index < 0) {
    return ["", s];
  } else if (index > s.length) {
    return [s, ""];
  } else {
    return [s.slice(0, index), s.slice(index)];
  }
}

export function deCapitalize(s: string): string {
  if (s.length > 0 && !(isLowerCase(s[0]))) {
    let [head, tail] = splitAtIndex(s, 1);
    return head.toLowerCase() + tail;
  }
  return s;
}

export function resetSplitVars(remainder: string): {
  remainder: string;
  prevWasLower: boolean;
  thisIsLower: boolean;
  cursor: number;
} {
  return {
    remainder: deCapitalize(remainder),
    prevWasLower: true,
    thisIsLower: true,
    cursor: 1,
  };
}

export function splitAtLowerToUpper(s: string): Array<string> {
  let splits = [];
  //console.log("splitting: " + s);
  let { remainder, prevWasLower, thisIsLower, cursor } = resetSplitVars(s);
  let head: string;

  while (cursor < remainder.length) {
    let ch = remainder.at(cursor);
    if (ch) {
      thisIsLower = isLowerCase(ch);
      if (prevWasLower && !thisIsLower) {
        [head, remainder] = splitAtIndex(remainder, cursor);
        splits.push(head);
        ({ remainder, prevWasLower, thisIsLower, cursor } = resetSplitVars(
          remainder,
        ));
        thisIsLower = false;
      } else {
        prevWasLower = thisIsLower;
        cursor += 1;
      }
    }
  }
  splits.push(remainder);
  //console.log("\tsplit into: " + splits);
  return splits;
}
