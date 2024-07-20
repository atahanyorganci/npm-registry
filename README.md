# npm Registry API Client

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

`@yorganci/npm-registry-api` is a fully typesafe [npm registry API][npm-registry-api] client with optional caching.

## Features

- Validates registry responses using [`zod`](https://github.com/colinhacks/zod).
- Supports response caching with [`unstorage`](https://github.com/unjs/unstorage).
- Compatible with both Node.js and browser environments.
- Works seamlessly with third-party npm-compatible registries.

## Useful Links

- [npm registry API][npm-registry-api] for REST API docs.
- [`ohash` docs](https://github.com/unjs/ohash) for serializing cache keys.
- [`unstorage` drivers](https://unstorage.unjs.io/drivers) for caching layer.

## Usage

Install `@yorganci/npm-registry-api` npm package:

```sh
# yarn
yarn add @yorganci/npm-registry-api

# npm
npm install @yorganci/npm-registry-api

# pnpm
pnpm add @yorganci/npm-registry-api
```

Basic usage

```ts
import { Client } from "@yorganci/npm-registry-api";

const client = new Client();

await client.searchPackages({ text: "react", size: 1 });
```

### npm Registry API

| Function Name                                                      | Description                                                                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| [`getAbbreviatedPackument`][get-abbreviated-packument]             | Fetches abbreviated packument (package document) containing only the metadata necessary to install a package. |
| [`getBulkDailyPackageDownloads`][get-bulk-daily-package-downloads] | Retrieves the total number of downloads for each day for some packages in the given time period.              |
| [`getBulkPackageDownloads`][get-bulk-package-downloads]            | Fetches the total number of downloads for the given packages in the given time period.                        |
| [`getDailyPackageDownloads`][get-daily-package-downloads]          | Retrieves the total number of downloads for each day for a package in the given time period.                  |
| [`getDailyRegistryDownloads`][get-daily-registry-downloads]        | Gets the total number of downloads for each day for all packages in the registry in the given time period.    |
| [`getPackageDownloads`][get-package-downloads]                     | Fetches total number of downloads for a package in the given time period.                                     |
| [`getPackageManifest`][get-package-manifest]                       | Retrieves the manifest describing a specific version of a package (e.g., `foo@1.0.0`).                        |
| [`getPackageVersionsDownloads`][get-package-versions-downloads]    | Gets the total number of downloads for each version of a package in the previous 7 days.                      |
| [`getPackument`][get-packument]                                    | Fetches full packument (package document) containing all the metadata available about a package.              |
| [`getRegistryDownloads`][get-registry-downloads]                   | Retrieves total number of downloads for all packages in the registry in the given time period.                |
| [`getRegistryMetadata`][get-registry-metadata]                     | Fetches metadata describing the registry itself.                                                              |
| [`getRegistrySigningKeys`][get-registry-signing-keys]              | Retrieves public signing keys used by the registry.                                                           |
| [`searchPackages`][search-packages]                                | Searches packages corresponding to a given query.                                                             |

### Caching API

`@yorganci/npm-registry-api/cache` module provides basic factory function to create `Cache` object to be used by `Client`. By default `createCache`, uses `ohash` under the hood to generate cache keys from URL and HTTP headers and any `Driver` implementation from `unstorage` can be used for persistance the default is `unstorage/drivers/memory`.

```ts
import { Client } from "@yorganci/npm-registry-api";
import { createCache } from "@yorganci/npm-registry-api/cache";

// By default `Map<string, unknown>` is used as caching layer
const cachedClient = new Client({
  cache: createCache(),
});
```

```ts
import { Client } from "@yorganci/npm-registry-api";
import { createCache } from "@yorganci/npm-registry-api/cache";
import fs from "unstorage/drivers/fs";

// By default `Map<string, unknown>` is used as caching layer
const cachedClient = new Client({
  cache: createCache({
    storage: fs({
      base: "./data",
    }),
  }),
});
```

## License

[MIT](./LICENSE)

[npm-version-src]: https://img.shields.io/npm/v/@yorganci/npm-registry-api?style=for-the-badge&logo=git&label=release
[npm-version-href]: https://npmjs.com/package/@yorganci/npm-registry-api
[npm-downloads-src]: https://img.shields.io/npm/dm/@yorganci/npm-registry-api?style=for-the-badge&logo=npm
[npm-downloads-href]: https://npmjs.com/package/@yorganci/npm-registry-api
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@yorganci/npm-registry-api?style=for-the-badge
[bundle-href]: https://bundlephobia.com/result?p=@yorganci/npm-registry-api
[license-src]: https://img.shields.io/github/license/atahanyorganci/npm-registry-api.svg?style=for-the-badge
[license-href]: https://github.com/atahanyorganci/npm-registry-api/blob/main/LICENSE
[npm-registry-api]: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md
[get-abbreviated-packument]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-abbreviated-packument.ts
[get-bulk-daily-package-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-bulk-daily-package-downloads.ts
[get-bulk-package-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-bulk-package-downloads.ts
[get-daily-package-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-daily-package-downloads.ts
[get-daily-registry-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-daily-registry-downloads.ts
[get-package-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-package-downloads.ts
[get-package-manifest]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-package-manifest.ts
[get-package-versions-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-package-versions-downloads.ts
[get-packument]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-packument.ts
[get-registry-downloads]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-registry-downloads.ts
[get-registry-metadata]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-registry-metadata.ts
[get-registry-signing-keys]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/get-registry-signing-keys.ts
[search-packages]: https://github.com/atahanyorganci/npm-registry-api/blob/main/src/search-packages.ts
