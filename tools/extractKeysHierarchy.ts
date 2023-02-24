type KeyLeaf = { key: string; arguments: string[] };
export type KeysObject = { [k: string]: KeysObject | string };

const argumentRegex = /{{ ?(?<argName>\w+) ?}}/g;

function visitNodes(
  root: KeysObject | string,
  path: string[],
  collector: KeyLeaf[]
) {
  if (typeof root === "string") {
    const argumentMatches = [...root.matchAll(argumentRegex)];
    const argumentKeys: string[] = argumentMatches.reduce((accumulator, nextMatch) => {
      if (nextMatch.groups && nextMatch.groups["argName"]) {
        accumulator.push(nextMatch.groups["argName"]);
      }
      return accumulator;
    }, []);
    collector.push({
      key: path.join("."),
      arguments: argumentKeys,
    });
    return;
  }

  Object.keys(root).forEach((key) => {
    const value = root[key];
    visitNodes(value, [...path, key], collector);
  });
}

export function extractKeysHierarchy(
  root: KeysObject | string,
  namespace: string
): { [key: string]: string[] } {
  const collector: KeyLeaf[] = [];
  visitNodes(root, [], collector);
  return collector.reduce(
    (result, leaf) => ({
      ...result,
      [namespace + leaf.key]: leaf.arguments,
    }),
    {}
  );
}
