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

test("get-package-downloads", async () => {
	await expect(client.getPackageDownloads("react", "last-day")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("react", "last-week")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("react", "last-month")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("react", "last-year")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("@types/node", "last-day")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("@types/node", "last-week")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("@types/node", "last-month")).resolves.toBeDefined();
	await expect(client.getPackageDownloads("@types/node", "last-year")).resolves.toBeDefined();
});
