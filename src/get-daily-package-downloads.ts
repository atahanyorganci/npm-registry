import { z } from "zod";
import { assertValidPackageName } from "./assert-valid-package-name";
import type { DownloadPeriod } from "./download-period";
import { fetchData } from "./fetch-data";
import { DailyRegistryDownloads } from "./get-daily-registry-downloads";
import { NPM_REGISTRY_DOWNLOADS_API_URL } from "./npm-registry";

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

/**
 * `getDailyPackageDownloads` returns the total number of downloads for each day
 * for a package in the given time period.
 *
 * @param name - package name
 * @param period - {@link DownloadPeriod | time period} in which downloads happened; the npm registry limits data to the last 18 months
 * @param registry - URL of the registry downloads API (default: npm registry downloads API)
 *
 * @see {@link DailyPackageDownloads}
 */
export async function getDailyPackageDownloads(
	name: string,
	period: DownloadPeriod,
	registry = NPM_REGISTRY_DOWNLOADS_API_URL,
): Promise<DailyPackageDownloads> {
	assertValidPackageName(name);
	const url = new URL(`/downloads/range/${period}/${name}`, registry);
	return fetchData(DailyPackageDownloads, url.toString());
}
