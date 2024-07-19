import { z } from "zod";
import { DailyRegistryDownloads } from "./get-daily-registry-downloads";

export const DailyPackageDownloads = DailyRegistryDownloads.extend({
	// Package name.
	package: z.string(),
});

/**
 * `DailyPackageDownloads` describes the total number of downloads for each day
 * for a package in a given time period.
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export type DailyPackageDownloads = z.infer<typeof DailyPackageDownloads>;
