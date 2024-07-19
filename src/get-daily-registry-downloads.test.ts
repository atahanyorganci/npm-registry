import { afterEach, beforeEach, expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";
import { persistCache, populateCache } from "./fixtures/cache";

const client = new Client({
	cache: createCache(),
});

beforeEach(async ctx => {
	if (client.cache) {
		await populateCache(ctx.task.name, client.cache);
	}
});

afterEach(async ctx => {
	if (client.cache) {
		await persistCache(ctx.task.name, client.cache);
	}
});

test("get-daily-registry-downloads", async () => {
	await expect(client.getDailyRegistryDownloads("last-day")).resolves.toBeDefined();
	await expect(client.getDailyRegistryDownloads("last-week")).resolves.toBeDefined();
	await expect(client.getDailyRegistryDownloads("last-month")).resolves.toBeDefined();
	await expect(client.getDailyRegistryDownloads("last-year")).resolves.toBeDefined();
});
