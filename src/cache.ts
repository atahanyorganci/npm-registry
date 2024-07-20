import { objectHash, sha256base64 } from "ohash";
import { type Driver, createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import type { Cache } from ".";

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
 * @returns base64 encoded SHA-256 hash of `objectHash`
 *
 * @see {@link https://github.com/unjs/ohash | `ohash`} package for implementation and `objectHash`
 */
export const serialize: Cache["serialize"] = (object: unknown) => sha256base64(objectHash(object));

/**
 * Create a `Cache` instance by default {@link serialize} is used for generating keys for storage and
 * {@link memoryDriver} from `unstorage/drivers/memory` is used for persistance. Serialization and
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
