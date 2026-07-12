import { describe, expect, it } from "vitest";
import { getHappyViewUrl } from "../../src/api/happyview.js";

describe("getHappyViewUrl", () => {
  it("returns default HappyView URL when env is unset", () => {
    expect(getHappyViewUrl()).toBe("http://127.0.0.1:3001");
  });
});
