# use-route-as-state

> Use React Router **route** and **query string** as component **state**

[![npm](https://img.shields.io/npm/v/use-route-as-state?logo=npm&label=version)](https://www.npmjs.com/package/use-route-as-state)
[![npm](https://img.shields.io/npm/dw/use-route-as-state?label=npm)](https://www.npmjs.com/package/use-route-as-state)
[![Release](https://github.com/baruchiro/use-route-as-state/workflows/Release/badge.svg)](https://github.com/baruchiro/use-route-as-state/actions?query=workflow%3ARelease)
[![Github Pages](https://github.com/baruchiro/use-route-as-state/workflows/Github%20Pages/badge.svg)](https://baruchiro.github.io/use-route-as-state/)

## Install

```bash
npm install --save use-route-as-state
```

## Usage

You can see a live demo, including code, [here](https://baruchiro.github.io/use-route-as-state/).

```tsx
// URL: /:param?query=
import * as React from 'react'

import { useRouteParams, useQueryString } from 'use-route-as-state'

const Example = () => {
  const [{ param }, setRouteParams] = useRouteParams()
  const [{ query }, setQueryParams] = useQueryString()

  return (
    <div>
      <input
        value={ param }
        onChange={({ target }) => setRouteParams({ param: target.value })} />
      <input
        value={ query }
        onChange={({ target }) => setQueryString({ query: target.value })} />
    </div>
  )
}
```

## API

This library is trying to behave like the `useState` React hook, by exposing a similar interface.

```typescript
type DispatchState<TState> = Dispatch<SetStateAction<TState>>
type RouteObject = Record<string, string>
```

### `useRouteParams`

> **Type:** `useRouteParams: (defaultValues?: RouteObject): [RouteObject, DispatchState<RouteObject>]`

**Use to sync the [URL Parameters](https://reactrouter.com/web/example/url-params) with you component.**

This custom hook returns an array with two elements:

- The **first element** is a *string to string* object, when the `key` is the *route param* name, and the `value` is the value of this param.

- The **second element** is a *function* to update the *route* with new *string to string* object. Like in `useState`, you can set a new object, or set a function to transaform the `prev` state to a new one.

> Updating the `route` will [**`push`**](https://reactrouter.com/web/api/history) the updated route to the `history`.

The *params object* will be reactive to the *route*. It means the any time the *route* changed, the *params object* (the **first element** from `useParamsAsState`) will change according to the *route* and will render the component.

The *update function* (the **second element** from `useParamsAsState`) will change the *route*, and it will cause an update in the *params object*, respectively.

#### Note

To use `Route Params`, you have to declare the params with the [React Router API](https://reactrouter.com/web/example/url-params).

### `useQueryString`

> **Type:** `useQueryString: (defaultValues?: RouteObject): [RouteObject, DispatchState<RouteObject>]`

**Use to sync the [Query Parameters](https://reactrouter.com/web/example/query-parameters) with you component.**

This hook works just like `useParamsAsState`, except you don't need to declare any special *route* in the React Router. You can use this hook in any component, down in the tree, as long as there is a *Router* somewhere up in the tree.

> Updating the `route` will [**`replace`**](https://reactrouter.com/web/api/history) the updated route to the `history`.

#### `useQueryStringKey`

> **Type:** `useQueryStringKey: (key: string, defaultValue?: string): [string | undefined, Dispatch<SetStateAction<string>>]`

Instead of managing the whole **query** object, you can use this to get a reactive reference to the value itself.

Example:

```tsx
// URL: /?foo=bar
import * as React from 'react'
import { useQueryStringKey } from 'use-route-as-state'

const Example = () => {
  const [foo, setFoo] = useQueryStringKey('foo')

  return (
    <div>
      <input
        value={ query }
        onChange={({ target }) => setFoo(target.value)} />
    </div>
  )
}
```

### `useUrlState`

```typescript
type UrlState = {
  params: RouteObject,
  query: RouteObject
}
```

> **Type:** `useUrlState: (defaultValues?: UrlState): [UrlState, DispatchState<UrlState>]`

Due to limitations in *React Router*, and *React* itself, you can't use different hooks here together during one render cycle.

In order to solve that, you can use this hook to control both *route params* and *query string* at once.

## Development

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
yarn start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
yarn start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
