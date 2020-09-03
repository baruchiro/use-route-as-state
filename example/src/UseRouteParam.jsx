import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { useParamsAsState } from 'use-route-as-state'


const UseRouteParam = () => {
    const [params, updateParams] = useParamsAsState()
    const { pathname } = useLocation()

    const onChange = (e) => updateParams({ [e.target.id]: e.target.value || undefined })

    return <Box display='flex' flexDirection='column'>
        <TextField id='bar' value={params.bar} label={`Insert value for 'bar'`} onChange={onChange} />
        <Typography variant='body2'>{params.bar}</Typography>
    </Box>
}

export default () => {
    const { path } = useRouteMatch()

    return <Switch>
        <Route path={`${path}/:bar?`} component={UseRouteParam} />
    </Switch>
}
