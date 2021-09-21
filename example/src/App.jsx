import CreateLinkWithStateCode from '!!raw-loader!./CreateLinkWithState'
import UseQueryKeyCode from '!!raw-loader!./UseQueryKey'
import UseArrayQueryKeyCode from '!!raw-loader!./UseArrayQueryKey'
import UseQueryParamCode from '!!raw-loader!./UseQueryParam'
import UseRouteParamCode from '!!raw-loader!./UseRouteParam'
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import CreateLinkWithState from './CreateLinkWithState'
import UseArrayQueryKey from './UseArrayQueryKey'
import UseQueryKey from './UseQueryKey'
import UseQueryParam from './UseQueryParam'
import UseRouteParam from './UseRouteParam'

const Example = ({ title, caption, description, code, children }) => {
  return <Card style={{ margin: 5 }}>
    <CardContent>
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
      {caption && <Typography color='error' variant='caption'>{caption}</Typography>}
      {children}
    </CardContent>
    <CardMedia>
      {code && <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>}
    </CardMedia>
  </Card>
}

const Examples = () => {

  return <Box display='flex' justifyContent='space-evenly' flexWrap="wrap">
    <Example title='Use Query Params'
      description='You will see how the state changes simultaneously in both the label below and the address bar'
      code={UseQueryParamCode}>
      <UseQueryParam />
    </Example>
    <Example title='Use Route Params'
      description='You will see how the state changes simultaneously in both the label below and the address bar'
      caption={<>This is just for example. I don't recommend using a TextField for updating Route Params.<br />
        You may want to use DropDown or something.</>}
      code={UseRouteParamCode}>
      <UseRouteParam />
    </Example>
    <Example title='Try Links'
      description='Create URL here to see how it affect other components'
      code={CreateLinkWithStateCode}>
      <CreateLinkWithState />
    </Example>
    <Example title='Use Specific Query Key'
      description='Get a reactive reference to specific Query item'
      code={UseQueryKeyCode}>
      <UseQueryKey />
    </Example>
    <Example title='Use Specific Array Query Key'
      description='Get a reactive reference to specific Query item'
      code={UseArrayQueryKeyCode}>
      <UseArrayQueryKey />
    </Example>
  </Box>
}

const App = () => {

  return (
    <BrowserRouter basename='/use-route-as-state/'>
      <Switch>
        <Route path='/' component={Examples} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
