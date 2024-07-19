import { afterEach, beforeEach, expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";
import { persistCache, populateCache } from "./fixtures/cache";

const client = new Client({
	cache: createCache(),
});

beforeEach(async ctx => {
	await populateCache(ctx.task.name, client.cache!);
});

afterEach(async ctx => {
	await persistCache(ctx.task.name, client.cache!);
});

test("get-abbreviated-packument", async () => {
	for (const pkg of [
		"@types/node",
		"axios",
		"canvas",
		"chalk",
		"commander",
		"debug",
		"eslint",
		"express",
		"fs-extra",
		"inquirer",
		"lodash",
		"npm",
		"picocolors",
		"prettier",
		"react-dom",
		"react",
		"semver",
		"temp",
		"tslib",
		"typescript",
		"vite",
		"vitest",
		"vue",
		"webpack",
		"zod",
	]) {
		await expect(client.getAbbreviatedPackument(pkg)).resolves.toBeDefined();
	}
});
