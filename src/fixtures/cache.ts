import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import fs from "node:fs/promises";
import { z } from "zod";
import type { Cache } from "..";

const Literal = z.union([
	// Truncate strings and numbers to save space in the test DB
	// but preserve the `type` property literal values.
	z.string().transform(val => (["module", "commonjs"].includes(val) ? val : "")),
	z.number().transform(() => 0),
	z.boolean(),
	z.null(),
]);

const JsonStrip: z.ZodType<unknown> = z.lazy(() =>
	z.union([Literal, z.array(JsonStrip), z.record(JsonStrip)]),
);

export async function populateCache(name: string, cache: Cache) {
	// Don't load old data into cache if we're testing against remote.
	if (process.env.REMOTE === "true") {
		return;
	}
	const filename = `./test/${name}.json.gz`;
	const buf = await fs.readFile(filename);
	const data = JSON.parse(strFromU8(decompressSync(buf))) as [string, unknown][];
	if (data.length === 0) {
		return;
	}
	for (const [key, value] of data) {
		cache.storage.setItem<any>(key, value);
	}
}

export async function persistCache(name: string, cache: Cache) {
	if (process.env.PERSIST === "true") {
		const filename = `./test/${name}.json.gz`;
		const keys = await cache.storage.getKeys();
		const entries = await Promise.all(
			keys.toSorted().map(async key => {
				const value = await cache.storage.getItem(key);
				return [key, JsonStrip.parse(value)];
			}),
		);
		const json = JSON.stringify(entries);
		const data = compressSync(strToU8(json));
		await fs.writeFile(filename, data, {
			encoding: "binary",
		});
	}
}
