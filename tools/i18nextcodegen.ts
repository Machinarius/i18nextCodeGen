import enStrings from "../assets/en.json";
import fs from "fs";
import path from "path";
import { extractKeysHierarchy } from "./extractKeysHierarchy";

const TARGET_FILE = __dirname + "/../src/generated.ts";

function generateTypeStrings(name: string, hierarchy: KeysHierarchy): string[] {
  if (Array.isArray(hierarchy)) {
    return [
      `type ${name}Keys = ${hierarchy.map((key) => `"${key}"`).join("|")};`,
    ];
  }

  const keys = Object.keys(hierarchy);
  return [
    `type ${name}Keys = ${keys
      .map((key) => `\`${key}:\$\{${key}Keys\}\``)
      .join("|")};`,
    ...keys.flatMap((key) => generateTypeStrings(key, hierarchy[key])),
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
  `export default typesafeT;`,
]);
