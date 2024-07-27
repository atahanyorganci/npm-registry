import { z } from "zod";

/** @public */
export const RegistrySigningKeys = z.object({
	keys: z.array(
		z.object({
			// String in the simplified extended ISO 8601 format (e.g., `YYYY-MM-DDTHH:mm:ss.sssZ`) or `null`.
			expires: z.string().nullable(),
			// SHA256 fingerprint of the public key.
			keyid: z.string(),
			// Key type; only `ecdsa-sha2-nistp256` is currently supported by the npm CLI.
			keytype: z.string(),
			// Key scheme; only `ecdsa-sha2-nistp256` is currently supported by the npm CLI.
			scheme: z.string(),
			// Public key encoded in base64.
			key: z.string(),
		}),
	),
});

/**
 * `RegistrySigningKeys` describes the signing keys used by the registry.
 *
 * @see {@link https://docs.npmjs.com/about-registry-signatures}
 * @public
 */
export type RegistrySigningKeys = z.infer<typeof RegistrySigningKeys>;
