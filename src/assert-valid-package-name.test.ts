import { expect, test } from "vitest";
import { assertStrictPackageName, assertValidPackageName } from "./assert-valid-package-name";

test("basic package names", () => {
	expect(() => assertValidPackageName("some-package")).not.toThrow();
	expect(() => assertValidPackageName("example.com")).not.toThrow();
	expect(() => assertValidPackageName("under_score")).not.toThrow();
	expect(() => assertValidPackageName("period.js")).not.toThrow();
	expect(() => assertValidPackageName("123numeric")).not.toThrow();
	expect(() => assertValidPackageName("crazy!")).not.toThrow();
});

test("basic package names - strict", () => {
	expect(() => assertStrictPackageName("some-package")).not.toThrow();
	expect(() => assertStrictPackageName("example.com")).not.toThrow();
	expect(() => assertStrictPackageName("under_score")).not.toThrow();
	expect(() => assertStrictPackageName("period.js")).not.toThrow();
	expect(() => assertStrictPackageName("123numeric")).not.toThrow();
	expect(() => assertValidPackageName("crazy!")).not.toThrow();
});

test("scoped npm packages", () => {
	expect(() => assertValidPackageName("@npm/thingy")).not.toThrow();
	expect(() => assertStrictPackageName("@npm/thingy")).not.toThrow();
});

test("empty package name", () => {
	expect(() => assertValidPackageName("")).toThrow();
	expect(() => assertStrictPackageName("")).toThrow();
});

test("starting with dot, underscore", () => {
	expect(() => assertValidPackageName(".start-with-period")).toThrow();
	expect(() => assertStrictPackageName(".start-with-period")).toThrow();
	expect(() => assertValidPackageName("_starts-with-underscore")).toThrow();
	expect(() => assertStrictPackageName("_starts-with-underscore")).toThrow();
});

test("can only container URL friendly characters", () => {
	expect(() => assertValidPackageName("npm:package")).toThrow();
	expect(() => assertStrictPackageName("npm:package")).toThrow();
	expect(() => assertValidPackageName("s/l/a/s/h/e/s")).toThrow();
	expect(() => assertStrictPackageName("s/l/a/s/h/e/s")).toThrow();
});

test("cannot have leading or trailing space", () => {
	expect(() => assertValidPackageName(" leading-space")).toThrow();
	expect(() => assertStrictPackageName(" leading-space")).toThrow();
	expect(() => assertValidPackageName("trailing-space ")).toThrow();
	expect(() => assertStrictPackageName("trailing-space ")).toThrow();
});

test("cannot be a blacklisted name", () => {
	expect(() => assertValidPackageName("node_modules")).toThrow();
	expect(() => assertStrictPackageName("node_modules")).toThrow();
	expect(() => assertValidPackageName("favicon.ico")).toThrow();
	expect(() => assertStrictPackageName("favicon.ico")).toThrow();
});

test("old names can be node builtins", () => {
	expect(() => assertValidPackageName("http")).not.toThrow();
	expect(() => assertValidPackageName("process")).not.toThrow();
});

test("strict names cannot be node builtins", () => {
	expect(() => assertStrictPackageName("http")).toThrow();
	expect(() => assertStrictPackageName("process")).toThrow();
});

const LONGER_THAN_214 =
	"ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou-";

const SHORTER_THAN_214 =
	"ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou";

test("old package name can be longer than 214", () => {
	expect(() => assertValidPackageName(SHORTER_THAN_214)).not.toThrow();
	expect(() => assertValidPackageName(LONGER_THAN_214)).not.toThrow();
});

test("strict package name cannot be longer than 214", () => {
	expect(() => assertStrictPackageName(SHORTER_THAN_214)).not.toThrow();
	expect(() => assertStrictPackageName(LONGER_THAN_214)).toThrow();
});

test("old packages can have capital letters", () => {
	expect(() => assertValidPackageName("ShorterThan214")).not.toThrow();
	expect(() => assertValidPackageName("LONGER_THAN_214")).not.toThrow();
});

test("strict packages can have capital letters", () => {
	expect(() => assertStrictPackageName("ShorterThan214")).toThrow();
	expect(() => assertStrictPackageName("LONGER_THAN_214")).toThrow();
});
