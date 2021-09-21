import { Box, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useQueryStringKey } from 'use-route-as-state'

const UseArrayQueryKey = () => {
    const [fooArray, setFooArray] = useQueryStringKey('data', ['javascript','php'])

    const onChange = (e) => setFooArray(e.target.value.split(' '))

    return <Box display='flex' flexDirection='column'>
        <TextField id='foo' value={fooArray && fooArray.join(' ')} label={`Insert values for 'foo' (separed by spaces)`} onChange={onChange} />
        {fooArray && fooArray.map((value, index) => <Typography variant='body2'>[{index}] {value}</Typography>)}
    </Box>
}

export default UseArrayQueryKey
