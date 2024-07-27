name := `jq -r '.name' package.json`
version := `jq -r '.version' package.json`

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

api-extractor:
    bunx api-extractor run --local --verbose

ci: format lint check test build attw

[private]
is-clean:
    #!/usr/bin/env bash

    if [[ -n $(git status --porcelain) ]]; then
        echo "Repository is dirty, commit or stash changes and try again."
        exit 1
    fi

[confirm("Are you sure you want to publish new version of the package?")]
@publish NEW_VERSION: is-clean ci
    echo "Updating {{ name }} from v{{ version }} to v{{ NEW_VERSION }}"
    sed -i 's/"version": "{{ version }}"/"version": "{{ NEW_VERSION }}"/g' package.json jsr.json
    git add package.json jsr.json
    git commit -m "{{ NEW_VERSION }}"
    git tag 'v{{ NEW_VERSION }}'

update-test-data:
    REMOTE=true PERSIST=true bun run test
