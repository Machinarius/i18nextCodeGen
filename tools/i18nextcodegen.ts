import enStrings from "../assets/en.json";
import fs from "fs";
import path from "path";

const TARGET_FILE = __dirname + "/../src/generated.ts";

type KeysHierarchy = string[] | { [k: string]: KeysHierarchy };
type KeysObject = { [k: string]: KeysObject | string}

function extractKeysHierarchy(root: KeysObject): KeysHierarchy {
  const keys = Object.keys(root);
  if (!keys.length) {
    return [];
  }

  // Assume object is consistent with i18next json hierarchy:
  // It either contains child objects or string values, but not a mix of both
  if (typeof root[keys[0]] === "string") {
    return keys;
  }

  return keys.reduce((container, key) => ({
    ...container,
    [key]: extractKeysHierarchy(root[key] as KeysObject)
  }), {});
}

function generateTypeStrings(name: string, hierarchy: KeysHierarchy): string[] {
  if (Array.isArray(hierarchy)) {
    return [`type ${name}Keys = ${hierarchy.map(key => `"${key}"`).join("|")};`];
  }

  const keys = Object.keys(hierarchy);
  return [
    `type ${name}Keys = ${keys.map(key => `\`${key}:\$\{${key}Keys\}\``).join("|")};`,
    ...keys.flatMap(key => generateTypeStrings(key, hierarchy[key]))
  ];
}

function dumpTypeStringsToFile(strings: string[]) {
  const absolutePath = path.resolve(TARGET_FILE);
  console.log("Writing types to " + absolutePath);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
  
  fs.openSync(absolutePath, "w");
  fs.writeFileSync(absolutePath, strings.join("\n"));
}

const hierarchy = extractKeysHierarchy(enStrings);
const generatedStrings = generateTypeStrings("Root", hierarchy);
dumpTypeStringsToFile([
  `import { TFunction } from "i18next";`,
  ...generatedStrings,
  `const typesafeT = (t: TFunction, key: RootKeys) => t(key);`,
  `export default typesafeT;`
]);
