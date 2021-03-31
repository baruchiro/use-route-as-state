import { Box, TextField, Typography } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const CreateLinkWithState = () => {
    const [rParam, setRouteParam] = useState()
    const [qParam, setQueryParam] = useState()

    const rp = useMemo(() => encodeURIComponent(rParam || ''), [rParam])
    const qs = useMemo(() => qParam !== undefined && qParam !== null ? `?qParam=${encodeURIComponent(qParam)}` : '', [qParam])
    const to = useMemo(() => `/${rp}${qs}`, [rp, qs])

    return <Box display='flex' flexDirection='column'>
        <TextField label='Insert value for the Route Param'
            value={rParam}
            onChange={({ target }) => setRouteParam(target.value)} />
        <TextField label='Insert value for the Query Param'
            value={qParam}
            onChange={({ target }) => setQueryParam(target.value)} />
        <Typography variant='body2'>Use link to <Link to={to}>{to}</Link></Typography>
    </Box>
}

export default CreateLinkWithState