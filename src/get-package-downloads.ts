import { z } from "zod";
import { RegistryDownloads } from "./get-registry-downloads";

/** @public */
export const PackageDownloads = RegistryDownloads.extend({
	// Package name.
	package: z.string(),
});

/**
 * `PackageDownloads` describes the total number of downloads for a package in a given time period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 * @public
 */
export type PackageDownloads = z.infer<typeof PackageDownloads>;
