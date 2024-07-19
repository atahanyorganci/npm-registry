import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-bulk-daily-package-downloads", async () => {
	await expect(
		client.getBulkDailyPackageDownloads(["npm", "react"], "last-week"),
	).resolves.toBeDefined();
	await expect(
		client.getBulkDailyPackageDownloads(["npm", "react"], "last-month"),
	).resolves.toBeDefined();
	await expect(
		client.getBulkDailyPackageDownloads(["npm", "react"], "last-year"),
	).resolves.toBeDefined();

	// Non existing package.
	await expect(
		client.getBulkDailyPackageDownloads(
			["npm", "radial-guts-fool-bullseye-hypnotist"],
			"last-week",
		),
	).resolves.toBeDefined();

	// Scoped package names are not supported by the npm registry.
	await expect(
		client.getBulkDailyPackageDownloads(["npm", "@types/node"], "last-week"),
	).rejects.toThrow();
});
