import { z } from "zod";

/** @public */
export const RegistryDownloads = z.object({
	// Total number of downloads.
	downloads: z.number(),
	// Date of the first day (inclusive) in the format `YYYY-MM-DD`.
	start: z.string(),
	// Date of the last day (inclusive) in the format `YYYY-MM-DD`.
	end: z.string(),
});

/**
 * `RegistryDownloads` describes the total number of downloads
 * for all packages in the registry in a given time period.
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 * @public
 */
export type RegistryDownloads = z.infer<typeof RegistryDownloads>;
