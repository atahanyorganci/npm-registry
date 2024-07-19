import { expect, test } from "vitest";
import { Client } from ".";
import { createCache } from "./cache";

const client = new Client({
	cache: createCache(),
});

test("search-packages", async () => {
	await expect(client.searchPackages({})).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "react" })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "react", size: 0 })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "react", size: 1 })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "npm" })).resolves.toBeDefined();
	await expect(client.searchPackages({ text: "lodash" })).resolves.toBeDefined();
});
