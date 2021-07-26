const conventionalCommits = {
    preset: 'eslint'
}

module.exports = {
    release: {
        branches: ["master"]
    },
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            conventionalCommits
        ],
        [
            '@semantic-release/release-notes-generator',
            conventionalCommits
        ],
        '@semantic-release/npm',
        '@semantic-release/github',
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