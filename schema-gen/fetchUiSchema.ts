// let themeRefOut = "ui_ref.html";
// let themeRefUrl = "https://code.visualstudio.com/api/references/theme-color";
// let overwrite = false;

// async function readData(url: string | URL): Promise<string> {
//   const response = await fetch(url);
//   return response.text();
// }
// const codeBlock = (body: string): string => {
//   const tag = "code";
//   return `\\<${tag}\\>${body}\\<\\/${tag}\\>`;
// };

// const namedGroup = (name: string, body: string) => {
//   return `(?<${name}>${body})`;
// };

// type RefItem = {
//   option: string;
//   keywords: FrequencyMap;
//   description: string;
// };

// function isLowerCase(s: string): boolean {
//   return (s.toLowerCase() === s);
// }

// function isUpperCase(s: string): boolean {
//   return !isLowerCase(s);
// }

// function splitAtLowerToUpper(s: string): Array<string> {
//   if (s.length > 1) {
//     console.log("splitting: " + s);
//     s = s.charAt(0).toLowerCase() + s.slice(1);
//     let prevWasLower = true;
//     let thisIsLower = false;
//     let cursor = 1;

//     while (cursor < s.length) {
//       thisIsLower = isLowerCase(s[cursor]);
//       if (prevWasLower && !thisIsLower) {
//         let nextPart = s.slice(cursor);
//         return [s.slice(0, cursor), nextPart].concat(
//           splitAtLowerToUpper(nextPart),
//         );
//       }
//       prevWasLower = thisIsLower;
//       cursor += 1;
//     }
//   }

//   return [s];
// }

// function count<T>(value: T, arr: T[]): number {
//   let count = 0;
//   for (let item of arr) {
//     if (item === value) {
//       count += 1;
//     }
//   }
//   return count;
// }

// type FrequencyMap = Map<string, number>;

// function combineFrequences(a: FrequencyMap, b: FrequencyMap): FrequencyMap {
//   let x = a;
//   for (let [key, value] of b.entries()) {
//     x.set(key, (a.get(key) ?? 0) + value);
//   }
//   return x;
// }

// function getKeywords(s: string): Map<string, number> {
//   let parts = s.split(".");
//   parts = parts.flatMap(splitAtLowerToUpper);
//   let partFreq: Map<string, number> = new Map();

//   parts.forEach((value) => {
//     if (!partFreq.has(value)) {
//       partFreq.set(value, count(value, parts));
//     }
//   });
//   return partFreq;
// }

// function parseThemeRefHTML(): RefItem[] {
//   let html = readFileSync(themeRefOut).toString();
//   let optionRe = codeBlock(namedGroup("option", "(?!:)[\\S]+"));
//   let descrRe = namedGroup("description", "(?:(?!\\<\\/)[\\S ])+");
//   let itemRe = `${namedGroup("item", optionRe + ": " + descrRe)}`;
//   console.log(itemRe);
//   let regex = new RegExp(itemRe, "gm");

//   let match = regex.exec(html);
//   let results = [];
//   while (match?.groups) {
//     results.push({
//       option: match.groups["option"],
//       description: match.groups["description"],
//       keywords: getKeywords(match.groups["option"]),
//     });
//     match = regex.exec(html);
//   }
//   return results;
// }

// if (existsSync(themeRefOut) && !overwrite) {
//   console.log("ui_ref.html already exists.");
// } else {
//   readData(themeRefUrl).then((result) => {
//     console.log("[SUCCESS]: ui reference HTML fetch.");
//     writeFileSync(themeRefOut, result);
//   }, (reason) => {
//     console.error(reason);
//   });
// }

// let refItems = parseThemeRefHTML();
// let uniqueKeywords = refItems.map((item) => {
//   return item.keywords;
// }).reduce((a, b) => {
//   return combineFrequences(a, b);
// });
// let sortedUniqueKeywords = [...uniqueKeywords.entries()].sort((a, b) => {
//   return b[1] - a[1];
// });
// console.log(sortedUniqueKeywords);
