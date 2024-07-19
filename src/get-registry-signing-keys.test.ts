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

test("get-registry-signing-keys", async () => {
	await expect(client.getRegistrySigningKeys()).resolves.toBeDefined();
});
