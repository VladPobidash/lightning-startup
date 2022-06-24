# Advanced RTK setup for LightningJS application

To close to real-life RTK usage we should create reusable connect logic. Let's create a `src/logic/connect.js` file and use the next code snippet:

```javascript
import { store } from './store'

const { getState, subscribe } = store

const defaultCondition = ({ currentProp, previousProp }) => currentProp !== previousProp

export const handleStoreUpdate = (controllers, getState) => () => {
  const state = getState()
  const keys = Object.keys(controllers)

  for (let i = 0; i < keys.length; i += 1) {
    const controller = controllers[keys[i]]
    const { condition, selector, callback, _previousProp } = controller
    const predicate = condition || defaultCondition

    const currentProp = selector(state)

    const shouldUpdate = predicate({ previousProp: _previousProp, currentProp })

    if (shouldUpdate) {
      controller._previousProp = currentProp
      callback(currentProp)
    }
  }
}

export const connect = controllers => instance => {
  const controllersToSubscribe = controllers(instance)

  // Allow components to receive Redux state on connect
  const state = getState()

  const orderControllers = Array.isArray(controllersToSubscribe)
    ? controllersToSubscribe
    : Object.values(controllersToSubscribe)

  orderControllers.forEach(({ selector, callback }) => {
    if (callback && selector) {
      callback(selector(state))
    }
  })

  const unsubscribe = subscribe(handleStoreUpdate(controllersToSubscribe, getState))

  return () => {
    const keys = Object.keys(controllers)
    for (let i = 0; i < keys.length; i += 1) {
      const controller = controllers[keys[i]]
      controller._previousProp = undefined
    }
    unsubscribe()
  }
}

export const stateToProp = (selector, instance, name) => ({
  selector,
  callback: value => {
    instance[name] = value
  },
})
```

We've created useful functions for our components. Now, we can update our `CounterScreen` using this stuff.

Firstly, we should create a `screens/Counter/CounterScreen.connect.js` file with next code snippet:

```javascript
import { connect, stateToProp } from '../../logic/connect'
import { getCounterValue } from '../../logic/counter/counter.selector'

export default connect(instance => [stateToProp(getCounterValue, instance, 'counter')])
```

The `connect` function automatically subscribes to the store update and calls our callbacks if a component should update.
It gets a callback as a parameter that gets the component `instance` (`this` object) and returns an array of subscribers handlers.

The `stateToProp` for a component instance (second param, `this` object in a connected component) sets a value by `name`(third param, `'counter'`) and automatically gets updated value from store with selector (first param, '`getCounterValue`').

Finaly, let's update our `CounterScreen`.
1. Remove all store logic from the `_init` hook.
2. Add related setter (name must be equal to the third param of `stateToProp` func).
Here we can do all the necessary stuff when state updated.
```javascript
set counter(value) {
  this.tag('CounterScreen.Counter').text.text = value
}
```
3. Connect a component to the store
```javascript
_active() {
  this._unsubscribe = connect(this)
}

_inactive() {
  if (this._unsubscribe) {
    this._unsubscribe()
  }
}
```

Good job! Nothing difficult, just follow this pattern.
