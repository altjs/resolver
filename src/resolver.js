import React from 'react'
import { Resolver } from 'react-resolver'
import ConnectBase from 'alt-react/ConnectBase'

const toResolverProps = (resolver) => {
  return Object.keys(resolver).reduce((props, prop) => {
    props[prop] = () => resolver[prop]
    return props
  }, {})
}

export { Resolver }

export default (Component, spec) => {
  return class extends ConnectBase {
    static displayName = `Resolver${Component.displayName || Component.name}Container`

    constructor(props, context) {
      super(props, context)

      this.setConnections(props, context, spec)

      this.state = this.resolveState()
    }

    resolveState(nextProps) {
      const resolve = this.config.resolve
        ? toResolverProps(this.call(this.config.resolve), nextProps)
        : {}
      return { resolve }
    }

    componentWillReceiveProps(nextProps) {
      if (this.config.willReceiveProps) this.call(this.config.willReceiveProps)
      this.setState(this.resolveState(nextProps))
    }

    render() {
      return (
        <Resolver props={this.props} resolve={this.state.resolve}>
          {resolved => {
            const props = this.getNextProps({
              ...resolved,
              ...this.props,
            })
            return (
              <Component
                flux={this.flux}
                {...this.props}
                {...props}
              />
            )
          }}
        </Resolver>
      )
    }
  }
}
