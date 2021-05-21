import React from "react"
import { MemoryRouter } from "react-router-dom"

const wrapper: React.FC = ({ children }) =>
    <MemoryRouter>{children}</MemoryRouter>

export default wrapper