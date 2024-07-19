format:
    bun run format

check:
    bun run check

test:
    bun run test

build:
    bun run build

attw:
    bun run attw

release: format check test build
    bun run release

update-test-data:
    bun run scripts/update-test-data.ts
