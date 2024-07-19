import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("get-registry-signing-keys", async () => {
	await expect(client.getRegistrySigningKeys()).resolves.toBeDefined();
});
