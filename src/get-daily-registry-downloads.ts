import { z } from "zod";

/** @public */
export const DailyRegistryDownloads = z.object({
	// Date of the first day (inclusive) in the format `YYYY-MM-DD`.
	start: z.string(),
	// Date of the last day (inclusive) in the format `YYYY-MM-DD`.
	end: z.string(),
	// Download counts for each day.
	downloads: z.array(
		z.object({
			// Total number of downloads for the day.
			downloads: z.number(),
			// Date of the day in the format `YYYY-MM-DD`.
			day: z.string(),
		}),
	),
});

/**
 * `DailyRegistryDownloads` describes the total number of downloads for each day
 * for all packages in the registry in a given time period.
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 * @public
 */
export type DailyRegistryDownloads = z.infer<typeof DailyRegistryDownloads>;
