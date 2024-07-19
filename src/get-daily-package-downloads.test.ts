import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
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
