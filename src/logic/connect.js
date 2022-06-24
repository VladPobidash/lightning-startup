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
