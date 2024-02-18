export const reEscape = (s: string): string => {
  return `\\${s}`;
};

export const TAG_LEFT = reEscape("<");
export const TAG_RIGHT = reEscape(">");
export const tagEndBegin = (tag: string) => {
  return `${TAG_LEFT}${reEscape("/")}${tag}`;
};

export const negativeLookahead = (body: string): string => {
  return `(?!${body})`;
};

export const greedyPlus = (body: string) => {
  return `${body}+`;
};

export const greedyStar = (body: string) => {
  return `${body}*`;
};

export const question = (body: string) => {
  return `${body}?`;
};

export const cautiousStar = (body: string) => {
  return question(greedyStar(body));
};

export const cautiousPlus = (body: string) => {
  return question(greedyPlus(body));
};

export const anyOf = (body: string, negate?: boolean) => {
  if (negate) {
    return `[^${body}]`;
  } else {
    return `[${body}]`;
  }
};

export const ANY_WHITESPACE = reEscape("s");
export const NOT_ANY_WHITESPACE = ANY_WHITESPACE.toUpperCase();
export const ANY_DIGIT = reEscape("d");
export const NOT_ANY_DIGIT = ANY_DIGIT.toUpperCase();
export const ANY_WORD = reEscape("w");
export const NOT_ANY_WORD = ANY_WORD.toUpperCase();

export const anyChar = (): string => {
  return anyOf([NOT_ANY_WHITESPACE, ANY_WHITESPACE].join(""));
};

export const matchAnyIn = (
  toMatch: string[],
  quantifier: (...args: any[]) => string
): string => {
  return `${quantifier(anyOf(toMatch.join("")))}`;
};

export const matchExcept = (
  except: string,
  elseMatch: string,
  quantifier?: (...args: any[]) => string
) => {
  if (!quantifier) {
    quantifier = greedyStar;
  }
  return `${quantifier(anonGroup(negativeLookahead(except) + elseMatch))}`;
};

export const matchAnyExcept = (
  except: string,
  quantifier?: (...args: any[]) => string
): string => {
  return matchExcept(except, anyChar(), quantifier);
};

export const tagStart = (tag: string, extra?: string): string => {
  if (!extra) {
    extra = matchAnyExcept(TAG_RIGHT, cautiousStar);
  }
  return `${TAG_LEFT}${tag}${extra}${TAG_RIGHT}`;
};
export const tagEnd = (tag: string): string => {
  return `${tagEndBegin(tag)}${TAG_RIGHT}`;
};

export function tagBlock(tag: string): (body: string) => string {
  return (body: string): string => {
    return `${tagStart(tag)}${body}${tagEnd(tag)}`;
  };
}

export function anonGroup(body: string): string {
  return `(?:${body})`;
}

export function namedGroup(name: string, body: string): string {
  return `(?<${name}>${body})`;
}

export const greedyMatchAnyWhiteSpace = matchAnyIn(
  [ANY_WHITESPACE],
  greedyStar
);
export const greedyMatchSomeWhiteSpace = matchAnyIn(
  [ANY_WHITESPACE],
  greedyPlus
);
export const taggedBlockBodyMatcher = (
  tag: string,
  bodyMatcher: string
): string => tagBlock(tag)(bodyMatcher);

export const group = (matcher: string, name?: string): string =>
  name ? namedGroup(name, matcher) : anonGroup(matcher);
export const matchTaggedBody = (
  tag: string,
  matcher?: {
    body?: string;
    name?: string;
  }
): string => {
  let bodyMatcher = matcher?.body ? matcher.body : anyChar();
  bodyMatcher = matchExcept(tagEndBegin(tag), bodyMatcher, greedyPlus);
  bodyMatcher = group(bodyMatcher, matcher?.name);

  return taggedBlockBodyMatcher(tag, bodyMatcher);
};

export function matchRepeatedly(
  inputString: string,
  re: string | RegExp
): Array<{
  [key: string]: string;
}> {
  if (typeof re === "string") {
    re = new RegExp(re, "gm");
  }
  let match = re.exec(inputString);
  let results = [];
  while (match?.groups) {
    results.push(match.groups);
  }
  return results;
}

export const matchQuotedString = (name?: string): string =>
  group('"' + matchAnyExcept('"', greedyStar) + '"', name);

export function getMatchGroups(match: RegExpExecArray): string[] {
  let props = [];
  for (let prop in match?.groups) {
    props.push(prop);
  }
  if (props.length === 0) {
    throw Error(`match.groups is empty! match has structure: ${match}`);
  } else {
    return props;
  }
}

export function matchErrMsg(baseMsg: string, matchInput?: string): string {
  return (
    baseMsg + (matchInput ? "\nMatch was attempted on:\n" + matchInput : "")
  );
}

export function testMatch(
  name: string,
  match: RegExpExecArray | null,
  matchInput?: string
): string {
  let errMsg = undefined;
  if (match?.groups) {
    let x: string | undefined = match.groups[name];
    if (x) {
      return x;
    } else {
      errMsg = matchErrMsg(
        `No "${name}" in match.groups, which has only: ${getMatchGroups(
          match
        )}`,
        matchInput
      );
    }
  } else {
    errMsg = matchErrMsg(
      `match.groups is undefined. match has structure: ${match}`,
      matchInput
    );
  }
  throw Error(errMsg);
}

export function quotedStringCleanup(s: string): string {
  s = s.trim();
  let wsRe = new RegExp(greedyMatchSomeWhiteSpace, "gm");
  return s.replace(wsRe, " ");
}
