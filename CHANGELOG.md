
# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [4.0.0] - 2021-05-26

Update `useQueryStringKey` to allow dispatch.

### Added

- Hooks test coverage. Now we can reproduce bug easily.

### Changed

- `useQueryStringKey`: now with the type `(key: string, defaultValue?: string) => [string | undefined, Dispatch<SetStateAction<string>>]` (Now you can update with the previous value)
- **breaking changes**: The behaviour of `useQueryStringKey` in case of updating with empty string or `undefined` was not clear. You may expect for **breaking changes** in this case.

## [3.0.2] - 2021-05-20

Dependencies Upgrades.

- Bumps [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/HEAD/packages/commonjs) from 18.0.0 to 19.0.0.
- Bumps [hosted-git-info](https://github.com/npm/hosted-git-info) from 2.8.8 to 2.8.9.
- Bumps [@testing-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library) from 5.0.3 to 6.0.0.

## [3.0.1] - 2021-04-11
  
Major release fixes.

### Fixed

- `QueryStringKey` resets the query string.

## [3.0.0] - 2021-04-11

Change the API to the `useState` interface.

### Added

- `useRouteParams`: with the type `(defaultValues?: Record<string, string>) => [Record<string, string>, DisaptchState]`
- `useQueryString`: with the type `(defaultValues?: Record<string, string>) => [Record<string, string>, DisaptchState]`
- `useQueryStringKey`: with the type `(key: string, defaultValue?: string) => [string | undefined, (updatedValue: string) => void]`

### Changed

- DEPRECATED: `useParamsAsState`, `useQueryAsState`, `useQueryKeyAsState`
