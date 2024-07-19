import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-daily-registry-downloads", async () => {
	await expect(client.getDailyRegistryDownloads("last-day")).resolves.toBeDefined();
	await expect(client.getDailyRegistryDownloads("last-week")).resolves.toBeDefined();
	await expect(client.getDailyRegistryDownloads("last-month")).resolves.toBeDefined();
	await expect(client.getDailyRegistryDownloads("last-year")).resolves.toBeDefined();
});
