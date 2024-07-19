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

test("get-registry-downloads", async () => {
	await expect(client.getRegistryDownloads("last-day")).resolves.toBeDefined();
	await expect(client.getRegistryDownloads("last-week")).resolves.toBeDefined();
	await expect(client.getRegistryDownloads("last-month")).resolves.toBeDefined();
	await expect(client.getRegistryDownloads("last-year")).resolves.toBeDefined();
});
