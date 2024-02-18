import { existsSync, PathLike, writeFileSync } from "fs";

async function fetchData(url: string | URL): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

export function saveRefData(
  url: string | URL,
  outPath: PathLike,
  overwrite?: boolean
): boolean {
  let success = false;
  if (existsSync(outPath) && !overwrite) {
    console.log(
      `[SUCCESS] ${outPath} already exists. (overwrite == ${!overwrite})`
    );
    success = true;
  } else {
    fetchData(url).then(
      (result) => {
        console.log(
          "[SUCCESS]: ${url} HTML fetched successfully (saved at: ${outPath})."
        );
        writeFileSync(outPath, result);
      },
      (reason) => {
        console.error(reason);
        success = false;
      }
    );
  }
  return success;
}
