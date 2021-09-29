import { Box, Chip, Select, OutlinedInput, MenuItem } from '@material-ui/core'
import React from 'react'
import { useQueryStringKey } from 'use-route-as-state'

const UseArrayQueryKey = () => {
    const [dataArray, setDataArray] = useQueryStringKey('data', ['javascript','php'])
    const names = ['cobol', 'elixir', 'java', 'javascript', 'php', 'python']

    return (
        <Box display='flex' flexDirection='column'>
            <Select
                multiple
                value={dataArray}
                onChange={(e) => setDataArray(e.target.value)}
                input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={{ 
                    anchorOrigin: { vertical: 'top', horizontal: 'left' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'left' },
                    getContentAnchorEl: null,
                }}>
            {names.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
            </Select>
        </Box>
    )
}

export default UseArrayQueryKey
