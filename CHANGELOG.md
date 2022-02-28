# Changelog

# [5.2.0](https://github.com/baruchiro/use-route-as-state/compare/v5.1.1...v5.2.0) (2022-02-28)


### Update

* dependabot packages updates (#167) ([9f78872](https://github.com/baruchiro/use-route-as-state/commit/9f78872da517f6a63bea82ac0ea6e4f65a120a69)), closes [#167](https://github.com/baruchiro/use-route-as-state/issues/167)

## [5.1.1](https://github.com/baruchiro/use-route-as-state/compare/v5.1.0...v5.1.1) (2021-11-21)


### Fix

* Manual dependabot alerts (#149) ([55adfdd](https://github.com/baruchiro/use-route-as-state/commit/55adfdd7dbcdfdc1bcca25a7100628d7e7294546)), closes [#149](https://github.com/baruchiro/use-route-as-state/issues/149)

# [5.1.0](https://github.com/baruchiro/use-route-as-state/compare/v5.0.0...v5.1.0) (2021-11-20)


### Update

* dependabot upgrades (#148) ([f6cd262](https://github.com/baruchiro/use-route-as-state/commit/f6cd26241523e69f9a20b55af039619f520dead9)), closes [#148](https://github.com/baruchiro/use-route-as-state/issues/148)

# [5.0.0](https://github.com/baruchiro/use-route-as-state/compare/v4.2.4...v5.0.0) (2021-09-30)


### Breaking

* support for array in query params (#130) ([8a71cf7](https://github.com/baruchiro/use-route-as-state/commit/8a71cf71d7689e0adef9d7e588b10e489ea0f07a)), closes [#130](https://github.com/baruchiro/use-route-as-state/issues/130)

## [4.2.4](https://github.com/baruchiro/use-route-as-state/compare/v4.2.3...v4.2.4) (2021-09-26)


### Fix

* Dependabot upgrades ([6c0cb56](https://github.com/baruchiro/use-route-as-state/commit/6c0cb56cda204f40891a88f4e7033cc0451e02d3))

## [4.2.3](https://github.com/baruchiro/use-route-as-state/compare/v4.2.2...v4.2.3) (2021-09-09)


### Fix

* Dependabot upgrades (#125) ([48c2426](https://github.com/baruchiro/use-route-as-state/commit/48c2426006554fac8be6a872fe11c5610d33f1f2)), closes [#125](https://github.com/baruchiro/use-route-as-state/issues/125)

## [4.2.2](https://github.com/baruchiro/use-route-as-state/compare/v4.2.1...v4.2.2) (2021-07-26)


### Fix

* auto-generated CHANGELOG (#106) ([9e3e4b5](https://github.com/baruchiro/use-route-as-state/commit/9e3e4b5c98bbdb0669ccb8db1ac6e9fa63476ddd)), closes [#106](https://github.com/baruchiro/use-route-as-state/issues/106)

## [4.1.0] - 2021-05-28

Add `useUrlState` to change both *Route Params* and *Query String*.

### Added

- `useUrlState`: with type `(defaultValues?: UrlState): [UrlState, DispatchState<UrlState>]`.

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

- `useRouteParams`: with the type `(defaultValues?: Record<string, string>) => [Record<string, string>, DispatchState]`
- `useQueryString`: with the type `(defaultValues?: Record<string, string>) => [Record<string, string>, DispatchState]`
- `useQueryStringKey`: with the type `(key: string, defaultValue?: string) => [string | undefined, (updatedValue: string) => void]`

### Changed

- DEPRECATED: `useParamsAsState`, `useQueryAsState`, `useQueryKeyAsState`
