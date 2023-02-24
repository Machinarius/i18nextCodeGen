import { extractKeysHierarchy } from "./extractKeysHierarchy";

describe("i18n file parser", () => {
  it("Parses out a simple hierarchy without arguments", () => {
    expect(
      extractKeysHierarchy(
        {
          greetings: {
            goodEvening: "Good evening!",
          },
        },
        "content:"
      )
    ).toEqual({
      "content:greetings.goodEvening": [],
    });
  });

  it("Parses a nested hierarchy without arguments", () => {
    expect(
      extractKeysHierarchy(
        {
          greetings: {
            evening: {
              formal: "Good evening",
              informal: "Hey!",
            },
          },
        },
        "content:"
      )
    ).toEqual({
      "content:greetings.evening.formal": [],
      "content:greetings.evening.informal": [],
    });
  });
});
