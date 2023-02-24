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

  it("Parses keys with arguments", () => {
    expect(
      extractKeysHierarchy(
        {
          greetings: {
            goodEvening: "Good evening {{ name }}!",
          },
        },
        "content:"
      )
    ).toEqual({
      "content:greetings.goodEvening": ["name"],
    });
  });

  it("Parses keys with arguments and nested levels", () => {
    expect(
      extractKeysHierarchy(
        {
          greetings: {
            default: "Hello {{ name }}!",
            evening: {
              formal: "Good evening {{ name }}",
              informal: "Hey {{ name }}!",
            }
          },
        },
        "content:"
      )
    ).toEqual({
      "content:greetings.default": ["name"],
      "content:greetings.evening.formal": ["name"],
      "content:greetings.evening.informal": ["name"]
    });
  });
});
