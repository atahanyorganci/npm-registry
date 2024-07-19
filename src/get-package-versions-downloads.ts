import { z } from "zod";

export const PackageVersionsDownloads = z.object({
	// Package name.
	package: z.string(),
	// Mapping of semver version numbers to total number of downloads.
	downloads: z.record(z.number()),
});

/**
 * `PackageVersionsDownloads` describes the total number of downloads
 * for each version of a package in the previous 7 days.
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#per-version-download-counts}
 */
export type PackageVersionsDownloads = z.infer<typeof PackageVersionsDownloads>;
