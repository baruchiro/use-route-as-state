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
        ]
    ]
}