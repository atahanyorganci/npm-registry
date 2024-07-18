import { ofetch } from "ofetch";
import type { z } from "zod";
import { cache } from "./cache";

export async function fetchData<T extends z.Schema>(
	schema: T,
	url: string,
	headers?: Record<string, string>,
): Promise<z.infer<T>> {
	const cacheKey = JSON.stringify({ url, headers });
	const cachedJson = cache.get(cacheKey);
	if (cachedJson) {
		return schema.parse(cachedJson) as z.infer<T>;
	}
	const json = await ofetch<unknown>(url, { headers });
	cache.set(cacheKey, json);
	return schema.parse(json) as z.infer<T>;
}
