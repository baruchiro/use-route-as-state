import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useQueryAsState } from 'use-route-as-state'

const UseQueryParam = () => {
    const [params, updateParams] = useQueryAsState()

    const onChange = (e) => updateParams({ [e.target.id]: e.target.value })

    return <Box display='flex' flexDirection='column'>
        <TextField id='foo' value={params.foo} label={`Insert value for 'foo'`} onChange={onChange} />
        <Typography variant='body2'>{params.foo}</Typography>
    </Box>
}

export default UseQueryParam
