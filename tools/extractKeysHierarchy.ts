type KeyLeaf = { key: string; arguments: string[] };

const argumentRegex = /{{ ?(?<argName>\w+) ?}}/g;

function visitNodes(
  root: unknown,
  path: string[],
  collector: KeyLeaf[]
) {
  if (typeof root === "string") {
    const argumentMatches = [...root.matchAll(argumentRegex)];
    const argumentKeys = argumentMatches.reduce((accumulator, nextMatch) => {
      if (nextMatch.groups && nextMatch.groups["argName"]) {
        accumulator.push(nextMatch.groups["argName"]);
      }
      return accumulator;
    }, new Array<string>());
    collector.push({
      key: path.join("."),
      arguments: argumentKeys,
    });
    return;
  }

  if (typeof root === "object") {
    Object.entries(root).forEach(([key, value]) => {
      visitNodes(value, [...path, key], collector);
    });
  }
}

export function extractKeysHierarchy(
  root: unknown,
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
