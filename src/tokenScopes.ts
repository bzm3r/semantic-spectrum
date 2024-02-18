import * as vscode from "vscode";
import { knownSemanticTokenScopes, SemanticTokenScopes } from "./types/common";

export function gatherSemanticTokenScopes(): SemanticTokenScopes {
  let gatheredSemanticTokenScopes = knownSemanticTokenScopes;

  for (let x of vscode.extensions.all.filter((x) => x.isActive)) {
    let contributes = x.packageJSON["contributes"];

    if (contributes) {
      let semanticTokenScopes: SemanticTokenScopes | undefined =
        contributes["semanticTokenScopes"];
      if (semanticTokenScopes) {
        console.log(`extension ${x.id} contributes semantic token scopes!`);
        gatheredSemanticTokenScopes =
          gatheredSemanticTokenScopes.concat(semanticTokenScopes);
      } else {
        console.log(
          `extension ${x.id} does not contribute any semantic token scopes :(`
        );
      }
    }
  }
  return gatheredSemanticTokenScopes;
}
