# alt-resolver

> A [connect to stores](https://github.com/altjs/react) that works with [react-resolver](https://github.com/ericclemmons/react-resolver)

Example

```js
import { resolver } from 'alt-resolver'
import React from 'react'
import UserStore from '../stores/UserStore'

class MyComponent extends React.Component {
  render() {
    return <div>Hello, {this.props.userName}!</div>
  }
}

resolver(MyComponent, {
  listenTo() {
    return [UserStore]
  },

  resolve() {
    return {
      user: Promise.resolve({ name: 'Jane' }),
    }
  },

  getProps(props) {
    return {
      userName: props.name,
    }
  },
})
```
