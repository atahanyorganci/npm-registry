import { z } from "zod";
import { PackageDownloads } from "./get-package-downloads";

export const BulkPackageDownloads = z.record(z.union([z.null(), PackageDownloads]));

/**
 * `BulkPackageDownloads` describes the total number of downloads for some packages in a given time period.
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries}
 */
export type BulkPackageDownloads = z.infer<typeof BulkPackageDownloads>;
