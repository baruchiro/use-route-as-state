import { createMemoryHistory } from "history"
import React from "react"
import { Route, Router, Switch } from "react-router-dom"

export const getHistoryWrapper = (path?: string) => {
    const history = createMemoryHistory()
    
    const wrapper: React.FC<{ path?: string }> = ({ children }) =>
        <Router history={history}>
            <Switch>
                <Route path={path}>
                    {children}
                </Route>
            </Switch>
        </Router>
    return {
        history,
        wrapper
    }
}
