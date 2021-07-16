# Release

I'm using [semantic-release](https://semantic-release.gitbook.io/) to perform releases and changelog.

The convention is the [eslint](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint) format, with the next [rules](https://github.com/semantic-release/commit-analyzer/blob/4fa5c212ce40bd45c3f8b340d693d9b58f8a55d7/lib/default-release-rules.js#L23-L27):

```javascript
{tag: 'Breaking', release: 'major'},
{tag: 'Fix', release: 'patch'},
{tag: 'Update', release: 'minor'},
{tag: 'New', release: 'minor'},
```

When you commiting something, you don't have to keep the convention, but let's say in the PR, squash (prefer don't merge) and update the squash message with these examples:

```
Breaking: I broke something
Fix: fix (fixes #1234)
Update: some packages updates (refs #123)
New: Added a new feature
```

I think the `refs` should be the PR itself, since these messages generated in the Changelog.
