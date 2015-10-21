import connectResolver, { Resolver } from '../'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import assert from 'assert'

class Test extends React.Component {
  render() {
    return <div>{this.props.world}</div>
  }
}

const ConnectedTest = connectResolver(Test, {
  resolve() {
    return {
      world: Promise.resolve('hello world')
    }
  }
})

Resolver.resolve(() => <ConnectedTest />).then(({ data, Resolved }) => {
  assert(data['.0.0'].world === 'hello world')
  assert(/hello world/.test(ReactDomServer.renderToStaticMarkup(<Resolved />)))
})
