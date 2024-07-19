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

test("get-package-versions-downloads", async () => {
	await expect(client.getPackageVersionsDownloads("react")).resolves.toBeDefined();
	await expect(client.getPackageVersionsDownloads("@types/node")).resolves.toBeDefined();
});
