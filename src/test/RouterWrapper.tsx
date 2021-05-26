import { createMemoryHistory } from "history"
import React from "react"
import { Route, Router } from "react-router-dom"

export const getHistoryWrapper = (path?: string) => {
    const history = createMemoryHistory()
    
    const wrapper: React.FC<{ path?: string }> = ({ children }) =>
        <Router history={history}>
            <Route path={path}>
                {children}
            </Route>
        </Router>
    return {
        history,
        wrapper
    }
}
