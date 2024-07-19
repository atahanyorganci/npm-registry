import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-package-versions-downloads", async () => {
	await expect(client.getPackageVersionsDownloads("react")).resolves.toBeDefined();
	await expect(client.getPackageVersionsDownloads("@types/node")).resolves.toBeDefined();
});
