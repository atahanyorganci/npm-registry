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

test("search-packages", async () => {
	await expect(client.searchPackages({})).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "react" })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "react", size: 0 })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "react", size: 1 })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "npm" })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "lodash" })).resolves.toBeDefined();
});
