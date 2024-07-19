import { ofetch } from "ofetch";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";
import { persistCache, populateCache } from "./fixtures/cache";

vi.mock("ofetch", async importOriginal => {
	const { ofetch, ...rest } = await importOriginal<typeof import("ofetch")>();
	return {
		...rest,
		// Wrap `ofetch` function to so we can assert number of called times
		ofetch: vi.fn(ofetch),
	};
});

function isRemote() {
	return process.env.REMOTE === "true";
}

const client = new Client({
	cache: createCache(),
});

beforeEach(async ctx => {
	await populateCache(ctx.task.name, client.cache!);
});

afterEach(async ctx => {
	await persistCache(ctx.task.name, client.cache!);
});

const pkgs = [
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
	"zod-package-json",
	"zod",
];

test("get-packument", async () => {
	await expect(client.cache?.storage.getKeys()).resolves.toHaveLength(isRemote() ? 0 : pkgs.length);
	for (const pkg of pkgs) {
		await expect(client.getPackument(pkg)).resolves.toBeDefined();
	}
	expect(ofetch).toBeCalledTimes(isRemote() ? pkgs.length : 0);
});
