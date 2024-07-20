/**
 * Utilities for creating {@link Cache} instances for {@link Client}. This module includes default implementation for
 * {@link serialize | `serialize`} and {@link createCache | `createCache`} factory method.
 *
 * @example
 * Basic usage with default driver.
 *
 * ```ts
 * import { Client } from "@yorganci/npm-registry-api";
 * import { createCache } from "@yorganci/npm-registry-api/cache";
 *
 * // By default `Map<string, unknown>` is used as caching layer
 * const cachedClient = new Client({
 *     cache: createCache(),
 * });
 * ```
 * @example
 * Usage with `fsDriver` from `unstorage`.
 *
 * ```ts
 * import { Client } from "@yorganci/npm-registry-api";
 * import { createCache } from "@yorganci/npm-registry-api/cache";
 * import fs from "unstorage/drivers/fs";
 *
 * // By default `Map<string, unknown>` is used as caching layer
 * const cachedClient = new Client({
 *     cache: createCache({
 *         storage: fs({
 *             base: "./data",
 *         }),
 *     }),
 * });
 * ```
 *
 *  @module
 */
import { objectHash, sha256base64 } from "ohash";
import { type Driver, createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import type { Cache, Client } from ".";

export interface CreateCacheOptions {
	// used to create keys for `storage`
	serialize: Cache["serialize"];
	// `unstorage` driver used to persist keys
	storage: Driver;
}

/**
 * Create SHA-256 hash from any JS object
 *
 * @param object object to serialize
 * @returns base64 encoded SHA-256 hash of {@link objectHash | `objectHash`}
 *
 * @see {@link https://github.com/unjs/ohash | `ohash`} package for implementation and {@link objectHash | `objectHash`}
 */
export const serialize: Cache["serialize"] = (object: unknown) => sha256base64(objectHash(object));

/**
 * Create a {@link Cache | `Cache`} instance by default {@link serialize | `serialize`} is used for generating keys for storage and
 * {@link memoryDriver | `memoryDriver`} from {@link https://github.com/unjs/unstorage | `unstorage`} is used for persistance. Serialization and
 * persistance method can be customized.
 */
export function createCache({ storage: driver, ...opts }: Partial<CreateCacheOptions> = {}): Cache {
	return {
		serialize,
		storage: createStorage({
			driver: driver ?? memoryDriver(),
		}),
		...opts,
	};
}
