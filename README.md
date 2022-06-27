# First boot | Advanced Router setup with RTK for LightningJS application
> **Alert:** following stuff requires axios installation. Run `npm i axios`.

For close to real-life first app loading process we should add a lot of stuff. But it's all starts form adding the `boot` method in the `src/router.js`:

```javascript
{
  // ...
  boot: async () => {
    await store.dispatch(loadApp())
  },
  // ...
}
```

We dispatch a `loadApp` thunk. It's a part of a new store slice named `app` containing app logic related to the app boot process and general config.

```javascript
// src/logic/app/app.thunk.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import { myIP } from '../../client/ip'
import { layoutData } from '../../client/layout'
import { loadLayout } from '../layout/layout.slice'
import { setIP, signIn } from '../user/user.slice'
import { name } from './app.constants'

export const loadApp = createAsyncThunk(`${name}/load`, async (_, { dispatch }) => {
  // TODO: replace it by some real app loading actions, config fetching, etc.
  const { data } = await myIP()
  await dispatch(setIP(data.ip))

  const layout = await layoutData()

  // TODO: should be some authN API call
  await dispatch(signIn({ userId: 123 }))
  await dispatch(loadLayout({ layout: layout.data.results }))
})
```

> **Briefly,** it gets and sets the user's IP, runs auth and loads data for layout.

As you can see we use some functions from a new `client` directory.
It's a wrapper for client-server interactions and contains a module that should be executed once per the app's lifecycle.
So, `myIp` and `layoutData` just common axios GET requests, `setIP`, `signIn` and `loadLayout` - actions for a new slices.

> **Alert:** See code files for more details.

#### Axios retry
Also, don't forget to add axios retry for our app. Just add `import './client/setup'` in `src/index.js`.
It's a simple plugin that intercepts failed requests and retries them whenever possible.

> **Warning:** Don't forget to update the store by adding new slices before using them.

```javascript
import { configureStore } from '@reduxjs/toolkit'
import app from './app/app.slice'
import user from './user/user.slice'
import layout from './layout/layout.slice'
import counter from './counter/counter.slice'

export const store = configureStore({
  reducer: {
    app,
    user,
    layout,
    counter,
  },
})
```

Finally, we should use new logic in our components. Replace mocked loading in a `SplashScreen`. Also you can get layout data and user ip using `connect` and `stateToProp`.

```javascript
import connect from './SplashScreen.connect'

// template

_active() {
  this._unsubscribe = connect(this)
}

_inactive() {
  if (this._unsubscribe) {
    this._unsubscribe()
  }
}

set isReady(value) {
  if (value) {
    setTimeout(() => Router.resume(), 1000)
  }
}
```
```javascript
// SplashScreen.connect
import { connect, stateToProp } from '../../logic/connect'
import { isReady } from '../../logic/app/app.selectors'

export default connect((instance) => [stateToProp(isReady, instance, 'isReady')])
```

The end. I'm tired, are you?
