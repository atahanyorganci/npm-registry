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

test("get-daily-package-downloads", async () => {
	await expect(client.getDailyPackageDownloads("react", "last-day")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("react", "last-week")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("react", "last-month")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("react", "last-year")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("@types/node", "last-day")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("@types/node", "last-week")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("@types/node", "last-month")).resolves.toBeDefined();
	await expect(client.getDailyPackageDownloads("@types/node", "last-year")).resolves.toBeDefined();
});
