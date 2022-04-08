import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useRouteParams } from 'use-route-as-state'

const UseRouteParam = () => {
    const [params, updateParams] = useRouteParams({ rParam: '' })

    const onChange = (e) => updateParams(e.target.value && { [e.target.id]: e.target.value })

    return <Box display='flex' flexDirection='column'>
        <TextField id='rParam' label={`Insert value for 'rParam'`}
            value={params.rParam} onChange={onChange} />
        <Typography variant='body2'>{params.rParam}</Typography>
    </Box>
}

export default () => {
    const { path } = useRouteMatch()

    return <Switch>
        <Route path={`${path}:rParam?`} component={UseRouteParam} />
    </Switch>
}
