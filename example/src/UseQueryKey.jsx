import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useQueryStringKey } from 'use-route-as-state'

const UseQueryKey = () => {
    const [foo, setFoo] = useQueryStringKey('foo', 'bar')

    const onChange = (e) => setFoo(e.target.value)

    return <Box display='flex' flexDirection='column'>
        <TextField id='foo' label={`Insert value for 'foo'`}
            value={foo} onChange={onChange} />
        <Typography variant='body2'>{foo}</Typography>
    </Box>
}

export default UseQueryKey
