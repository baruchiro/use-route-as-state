import React, { useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { useQueryAsState, useParamsAsState } from 'use-route-as-state'

const RoutedComp = () => {

  const [{ user }, updateParams] = useParamsAsState()
  const [{ detailes }, updateQuery] = useQueryAsState()

  const [localUser, setLocalUser] = useState(user)
  const [localDetails, setLocalDetails] = useState(detailes)

  return <div>
    Set any user string and press OK: <input value={user} onChange={(event) => setLocalUser(event.target.value)} />
    <button onClick={() => updateParams({ user: localUser })} >OK</button>
  </div>
}

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/:user?`}>
          <RoutedComp />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App
