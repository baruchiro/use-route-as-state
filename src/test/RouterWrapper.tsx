import React from "react"
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom"
import {createMemoryHistory} from "history";

export const getHistoryWrapper = (path?: string) => {
  const customHistory = createMemoryHistory()

  const wrapper: React.FC<{ path?: string }> = ({children}) =>
    <HistoryRouter history={customHistory}>
      <Routes>
        <Route path={path} element={children}/>
        <Route path={'/'} element={children}/>
      </Routes>
    </HistoryRouter>

  return {
    history: customHistory,
    wrapper
  }
}
