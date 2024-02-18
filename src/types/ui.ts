import { readFileSync } from "fs";
import { Library } from "./common";
import { jsonToObj } from "../jsonToObj";

const uiReference: Library<string> = jsonToObj("../schema/ui.json");
