import { readFileSync } from "fs";
import { knownSemanticTokenScopes } from "../src/types/common";
import { writeJson } from "./writeJson";
import path from "path";

const willSet: Array<string | Array<string>> = [
  ["contributes", "semanticTokenScopes"],
];

let packageJSON = JSON.parse(
  readFileSync(path.join(process.cwd(), "package.json")).toString()
);

function confirmUnset(jsonObj: any, keys: Array<string | Array<string>>) {
  for (let key of keys) {
    if (Array.isArray(key)) {
      confirmUnset(jsonObj[key[0]], key.slice(1));
    } else {
      if (jsonObj[key]) {
        throw Error(
          `package.json contains a value for ${key}:\n${jsonObj[key]}`
        );
      }
    }
  }
}

confirmUnset(packageJSON, [["contributes", "semanticTokenScopes"]]);

packageJSON["contributes"]["semanticTokenScopes"] = knownSemanticTokenScopes;
writeJson("", {
  filePath: "package.json",
  contents: JSON.stringify(packageJSON),
});
