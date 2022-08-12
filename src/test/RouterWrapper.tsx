import { createMemoryHistory } from "history";
import React from "react";
// https://reactrouter.com/docs/en/v6/api#unstable_historyrouter
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

export const getHistoryWrapper = (path?: string) => {
    const history =  createMemoryHistory()
    
    const wrapper: React.FC = ({ children }) =>
        <HistoryRouter history={history}>
            <Routes>
                <Route path={'*'} element={children} />
                    {/* {children}
                </Route> */}
            </Routes>
        </HistoryRouter>

    return {
        history,
        wrapper
    }
}
