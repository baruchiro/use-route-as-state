import React from 'react'

const options = ['Emma', 'Noah', 'Olivia', 'Liam', 'Ava', 'William']
const subOptions = (search = '') => options.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase()))

export default ({ search }) => {
    const s = search || ''

    return <ul>
        {subOptions(s).map((n) => <li key={n}>{n}</li>)}
    </ul>
}
