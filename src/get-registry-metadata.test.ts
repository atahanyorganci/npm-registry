import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-registry-metadata", async () => {
	await expect(client.getRegistryMetadata()).resolves.toBeDefined();
});
