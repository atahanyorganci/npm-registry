import { objectHash, sha256base64 } from "ohash";
import { createStorage, type Driver } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import type { Cache } from ".";

export interface CreateCacheOptions {
	serialize: Cache["serialize"];
	storage: Driver;
}

export function createCache({ storage: driver, ...opt }: Partial<CreateCacheOptions> = {}): Cache {
	return {
		serialize: object => {
			return sha256base64(objectHash(object));
		},
		storage: createStorage({
			driver: driver ?? memoryDriver(),
		}),
		...opt,
	};
}
