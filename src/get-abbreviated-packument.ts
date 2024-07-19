import { z } from "zod";
import { DistTags } from "./dist-tags";
import { PackageManifest } from "./get-package-manifest";

export const AbbreviatedPackument = z.object({
	// Package name.
	name: z.string(),
	// Timestamp of when the package was last modified in ISO 8601 format (e.g., `2021-11-23T19:12:24.006Z`).
	modified: z.string(),
	// Mapping of distribution tags to semver version numbers e.g., `{ "latest": "1.0.0" }`).
	"dist-tags": DistTags,
	// Mapping of semver version numbers to the required metadata for installing a package version.
	versions: z.record(
		z.string(),
		PackageManifest.pick({
			name: true,
			version: true,
			dist: true,
			deprecated: true,
			dependencies: true,
			optionalDependencies: true,
			devDependencies: true,
			bundleDependencies: true,
			peerDependencies: true,
			peerDependenciesMeta: true,
			bin: true,
			directories: true,
			engines: true,
			cpu: true,
			os: true,
			_hasShrinkwrap: true,
		}).extend({
			// True if the package contains an `install` script.
			hasInstallScript: z.boolean().optional(),
		}),
	),
});

/**
 *`AbbreviatedPackument` (package document) describes the minimal metadata needed for installing a package.
 *@see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format}
 */
export type AbbreviatedPackument = z.infer<typeof AbbreviatedPackument>;
