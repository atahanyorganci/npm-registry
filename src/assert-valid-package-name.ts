import { z } from "zod";

/**
 * Builtin modules for Node.js
 */
export const nodeBuiltinModules = [
	"_http_agent",
	"_http_client",
	"_http_common",
	"_http_incoming",
	"_http_outgoing",
	"_http_server",
	"_stream_duplex",
	"_stream_passthrough",
	"_stream_readable",
	"_stream_transform",
	"_stream_wrap",
	"_stream_writable",
	"_tls_common",
	"_tls_wrap",
	"assert",
	"assert/strict",
	"async_hooks",
	"buffer",
	"child_process",
	"cluster",
	"console",
	"constants",
	"crypto",
	"dgram",
	"diagnostics_channel",
	"dns",
	"dns/promises",
	"domain",
	"events",
	"fs",
	"fs/promises",
	"http",
	"http2",
	"https",
	"inspector",
	"inspector/promises",
	"module",
	"net",
	"os",
	"path",
	"path/posix",
	"path/win32",
	"perf_hooks",
	"process",
	"punycode",
	"querystring",
	"readline",
	"readline/promises",
	"repl",
	"stream",
	"stream/consumers",
	"stream/promises",
	"stream/web",
	"string_decoder",
	"sys",
	"timers",
	"timers/promises",
	"tls",
	"trace_events",
	"tty",
	"url",
	"util",
	"util/types",
	"v8",
	"vm",
	"wasi",
	"worker_threads",
	"zlib",
];

export const blacklistedNames = ["node_modules", "favicon.ico"];

export const NpmPackageName = z
	.string()
	.min(1)
	.refine(name => !name.match(/^\./), "Package name cannot start with a leading period.")
	.refine(name => !name.match(/^_/), "Package name cannot start with a leading underscore.")
	.refine(name => name.trim() === name, "Package cannot contain leading or trailing spaces.")
	.refine(
		name => !blacklistedNames.includes(name.toLowerCase()),
		"Package name cannot be node_modules or favicon.ico.",
	)
	.refine(name => {
		const match = name.match(/^(?:@([^/]+?)[/])?([^/]+?)$/);
		if (!match) {
			return false;
		}
		const [_match, user, pkg] = match;
		if (user && encodeURIComponent(user.toString()) !== user) {
			return false;
		}
		if (pkg && encodeURIComponent(pkg.toString()) !== pkg) {
			return false;
		}
		return true;
	}, "Package name can only contain URL-friendly characters.");

export function assertValidPackageName(name: unknown) {
	NpmPackageName.parse(name);
}

export const StrictNpmPackageName = NpmPackageName.refine(
	name => !nodeBuiltinModules.includes(name.toLowerCase()),
	"Package name cannot be node_modules or favicon.ico.",
)
	.refine(name => name.length <= 214, "Package name cannot be longer than 214 characters.")
	.refine(name => name === name.toLowerCase(), "Package name should be lower case.")
	.refine(
		name => !name.match(/(\[|~|'|!|\(|\)|\*|\])/),
		"Package name cannot container special characters.",
	);

export function assertStrictPackageName(name: unknown) {
	StrictNpmPackageName.parse(name);
}
