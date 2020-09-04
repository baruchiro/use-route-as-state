# use-route-as-state

> Use React Router **route** and **query string** as component **state**

[![npm](https://img.shields.io/npm/v/use-route-as-state?logo=npm&label=version)](https://www.npmjs.com/package/use-route-as-state)
[![npm](https://img.shields.io/npm/dw/use-route-as-state?label=npm)](https://www.npmjs.com/package/use-route-as-state)

## Install

```bash
npm install --save use-route-as-state
```

## Usage

You can see a live demo, including code, [here](https://baruchiro.github.io/example).

```tsx
import * as React from 'react'

import { useParamsAsState, useQueryAsState } from 'use-route-as-state'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

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
