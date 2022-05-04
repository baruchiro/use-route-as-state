import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useRouteParams } from 'use-route-as-state'

const UseRouteParam = () => {
    const [params, updateParams] = useRouteParams()

    const onChange = (e) => updateParams(e.target.value && { [e.target.id]: e.target.value })

    return <Box display='flex' flexDirection='column'>
        <TextField id='rParam' label={`Insert value for 'rParam'`}
            value={params.rParam} onChange={onChange} />
        <Typography variant='body2'>{params.rParam}</Typography>
    </Box>
}

export default () => {
    const { pathname } = useLocation()

    return <Routes>
        <Route path={`${pathname}:rParam?`} element={UseRouteParam} />
    </Routes>
}
