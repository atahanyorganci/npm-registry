format:
    bun run format

lint:
    bun run lint

check:
    bun run check

test:
    bun run test

build:
    bun run build

attw:
    bun run attw

pre-publish: format lint check test build attw
    @echo "Ready for publishing"

update-test-data:
    REMOTE=true PERSIST=true bun run test
