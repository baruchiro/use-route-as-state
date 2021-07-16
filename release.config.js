module.exports = {
    release: {
        branches: ["master"]
    },
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'eslint'
            }
        ],
        '@semantic-release/release-notes-generator', '@semantic-release/npm', '@semantic-release/github',
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "CHANGELOG.md"
            }
        ],
        [
            "@semantic-release/exec",
            {
                "successCmd": "echo \"SEMVER_VERSION=${nextRelease.version}\" > $GITHUB_ENV"
            }
        ]
    ]
}