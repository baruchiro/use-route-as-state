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

You can see a live demo, including code, [here](https://baruchiro.github.io/example).

```tsx
// URL: /:param?query=
import * as React from 'react'

import { useParamsAsState, useQueryAsState } from 'use-route-as-state'

const Example = () => {
  const [{ param }, updateRouteParams] = useParamsAsState()
  const [{ query }, updateQueryParams] = useQueryAsState()

  return (
    <div>
      <input
        value={ param }
        onChange={({ target }) => updateRouteParams({ param: target.value })} />
      <input
        value={ query }
        onChange={({ target }) => useQueryAsState({ query: target.value })} />
    </div>
  )
}
```

## API

### `useParamsAsState`

Type: `useParamsAsState: () => [Record<string, string>, (updatedParams: Record<string, string>) => void]`

This custom hook returns an array with two elements:

- The **first element** is a *string to string* object, when the `key` is the *route param* name, and the `value` is the value of this param.

- The **second element** is a *function* to update the *route* with updated `value`s for specific `key`s. If one of the `key`s (the *Route Params*) is not in the *update object*, it will remain unchanged.

The *params object* will be reactive to the *route*. It means the any time the *route* changed, the *params object* (the **first element** from `useParamsAsState`) will change according to the *route* and will render the component.

The *update function* (the **second element** from `useParamsAsState`) will change the *route*, and it will cause an update in the *params object*, respectively.

#### Note

To use `Route Params`, you have to declare the params with the [React Router API](https://reactrouter.com/web/example/url-params).

### `useQueryAsState`

Type: `useQueryAsState: () => [Record<string, string>, (updatedParams: Record<string, string>) => void]`

This hook works just like `useParamsAsState`, except you don't need to declare any special *route* in the React Router. You can use this hook in any component, down in the tree, as long as there is a *Router* somewhere up in the tree.

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
