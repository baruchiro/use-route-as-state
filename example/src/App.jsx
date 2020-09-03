/* eslint-disable import/no-webpack-loader-syntax */
import UseQueryParamCode from '!!raw-loader!./UseQueryParam'
import UseRouteParamCode from '!!raw-loader!./UseRouteParam'
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import UseQueryParam from './UseQueryParam'
import UseRouteParam from './UseRouteParam'

const Example = ({ title, description, code, children }) => {
  return <Card style={{margin: 5}}>
    <CardContent>
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
      {children}
      <div>Also use links</div>
    </CardContent>
    <CardMedia>
      <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
    </CardMedia>
  </Card>
  // return <Box display='flex' flexDirection='column'>
  //   <Typography variant='h4'>{title}</Typography>
  //   <Typography variant='subtitle1'>{description}</Typography>
  //   {children}
  //   <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
  // </Box>
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
      code={UseRouteParamCode}>
      <UseRouteParam />
    </Example>
  </Box>
}

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/example' component={Examples} />
        <Route path='/' render={() => <Link to={'/example'}>Show Example</Link>} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
