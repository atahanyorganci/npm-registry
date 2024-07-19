import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-package-manifest", async () => {
	// Default to `latest` version.
	await expect(client.getPackageManifest("@types/node")).resolves.toBeDefined();
	await expect(client.getPackageManifest("lodash")).resolves.toBeDefined();
	await expect(client.getPackageManifest("npm")).resolves.toBeDefined();
	await expect(client.getPackageManifest("react")).resolves.toBeDefined();

	// Specific semver version.
	await expect(client.getPackageManifest("lodash", "0.1.0")).resolves.toBeDefined();
	await expect(client.getPackageManifest("@types/node", "20.12.7")).resolves.toBeDefined();
	await expect(client.getPackageManifest("npm", "10.5.2")).resolves.toBeDefined();
	await expect(client.getPackageManifest("react", "18.2.0")).resolves.toBeDefined();
});
