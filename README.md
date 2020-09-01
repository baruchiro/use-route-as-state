# use-route-as-state

> Use React Router route and query string as component state

[![NPM](https://img.shields.io/npm/v/use-route-as-state.svg)](https://www.npmjs.com/package/use-route-as-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-route-as-state
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-route-as-state'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [baruchiro](https://github.com/baruchiro)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
