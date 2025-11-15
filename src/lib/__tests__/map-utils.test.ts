import { isoFromFeature } from "@/lib/map-utils";

test("isoFromFeature uses iso_a3 first", () => {
  const f: any = { properties: { iso_a3: "ARG" } };
  expect(isoFromFeature(f)).toBe("ARG");
});

test("isoFromFeature falls back to name", () => {
  const f: any = { properties: { name: "Jordan" } };
  expect(isoFromFeature(f)).toBe("JOR");
});