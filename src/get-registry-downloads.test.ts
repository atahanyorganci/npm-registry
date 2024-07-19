import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-registry-downloads", async () => {
	await expect(client.getRegistryDownloads("last-day")).resolves.toBeDefined();
	await expect(client.getRegistryDownloads("last-week")).resolves.toBeDefined();
	await expect(client.getRegistryDownloads("last-month")).resolves.toBeDefined();
	await expect(client.getRegistryDownloads("last-year")).resolves.toBeDefined();
});
