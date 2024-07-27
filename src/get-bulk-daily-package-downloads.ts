import { z } from "zod";
import { DailyPackageDownloads } from "./get-daily-package-downloads";

/** @public */
export const BulkDailyPackageDownloads = z.record(z.union([z.null(), DailyPackageDownloads]));

/**
 * `BulkDailyPackageDownloads` describes the total number of downloads for each day for some packages in a given time period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries}
 * @public
 */
export type BulkDailyPackageDownloads = z.infer<typeof BulkDailyPackageDownloads>;
