import { Box, TextField } from '@material-ui/core'
import React from 'react'
import { useQueryString } from 'use-route-as-state'
import SearchList from './SearchList'

const UseQueryParam = () => {
    const [params, updateParams] = useQueryString({ qParam: '' })

    const onChange = (e) => updateParams({ [e.target.id]: e.target.value })

    return <Box display='flex' flexDirection='column'>
        <TextField id='qParam' label={`Insert value for 'qParam'`}
            value={params.qParam} onChange={onChange} />
        <SearchList search={params.qParam} />
    </Box>
}

export default UseQueryParam
