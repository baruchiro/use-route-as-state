import { createMemoryHistory } from "history"
import React from "react"
import { Router } from "react-router-dom"

export const getHistoryWrapper = () => {
    const history = createMemoryHistory()
    const wrapper: React.FC = ({ children }) => <Router history={history}>{children}</Router>
    return {
        history,
        wrapper
    }
}
