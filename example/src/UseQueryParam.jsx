import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useQueryAsState } from 'use-route-as-state'
import SearchList from './SearchList'

const UseQueryParam = () => {
    const [params, updateParams] = useQueryAsState()

    const onChange = (e) => updateParams({ [e.target.id]: e.target.value })

    return <Box display='flex' flexDirection='column'>
        <TextField id='qParam' label={`Insert value for 'qParam'`}
            value={params.qParam} onChange={onChange} />
        <Typography variant='body2'><SearchList search={params.qParam} /></Typography>
    </Box>
}

export default UseQueryParam
