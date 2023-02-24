type KeyLeaf = { key: string; arguments: string[] };
export type KeysObject = { [k: string]: KeysObject | string };

function visitNodes(
  root: KeysObject | string,
  path: string[],
  collector: KeyLeaf[]
) {
  if (typeof root === "string") {
    collector.push({
      key: path.join("."),
      arguments: [],
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
