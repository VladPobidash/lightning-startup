# Lightning startup
Lightning is a (TV) app development framework that offers great **portability** and **performance**.

## About repo
Every branch has an uniq README file with implemented features description, code snippets, useful links, tricks & tips. Look below for the brief branch description.
- `blank-template` contains an empty application ready for development
- `router/`
	- `setup` basic router setup example (preparation for `rtk/setup`)
	- `with-rtk` advanced router setup with Redux ToolKit features
		(only after `rtk/setup` & `rtk/advanced-setup`)
- `rtk/`
	- `setup` RTK usage on trivial counter app example
	- `advanced-setup` close to real-life RTK setup

### Useful links
- [Official site](https://lightningjs.io/)
- [Official docs](https://lightningjs.io/docs)
	Includes:
	- [Getting Started Guide](https://lightningjs.io/docs/#/getting-started/index?id=getting-started-guide)
	- [Lightning Core Reference](https://lightningjs.io/docs/#/lightning-core-reference/index?id=lightning-core-reference)
	- [Lightning SDK Reference](https://lightningjs.io/docs/#/lightning-sdk-reference/index?id=lightning-sdk-reference)
	- [Lightning CLI Reference](https://lightningjs.io/docs/#/lightning-cli-reference/index?id=lightning-cli-reference)
	- [Lightning UI Reference](https://lightningjs.io/docs/#/lightning-ui-reference/index?id=lightning-ui-reference)
- [Additional core docs](https://rdkcentral.github.io/Lightning/docs/introduction/introduction)
- [Lightning-SDK docs](https://rdkcentral.github.io/Lightning-SDK) helps you build great Lightning-based TV apps.
	Includes such plugins as [Router](https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/index?id=router), [VideoPlayer](https://rdkcentral.github.io/Lightning-SDK/#/plugins/videoplayer?id=videoplayer), etc)
- [LightningJS Forum](https://forum.lightningjs.io/) discuss everything related to LightningJS


Firstly, create our feature pages. We locale them in `src/pages` or, in our case, `src/screens` folder. Each screen has a separate folder because in the advanced use-cases we'll have helper files such as store connection, utils, constants, styles, etc.

> Before you follow the steps below, make sure you have
[NodeJS](https://nodejs.org/en/download) and [Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

Secondly, create a file named `src/routes.js` which contains plain objects with route configuration. See [Router Configuration](https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration?id=router-configuration) for more details.
```javascript
// src/routes.js

import { CounterScreen } from './screens/Counter/CounterScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'
import { StartScreen } from './screens/Start/StartScreen'

export default {
  root: 'start',
  routes: [
    {
      path: '$',
      component: SplashScreen,
    },
    {
      path: 'start',
      component: StartScreen,
    },
    {
      path: 'counter',
      component: CounterScreen,
    },
  ],
}
```

> See relevant component files for more template details...

**Breafly**, in the `SplashScreen` component we use `Router.resume()` for navigation to `StartScreen` on page loaded. Currently, we use `setTimeout` as a mock app loading. We add more realistic logic in the `advanced` branch.
Also, in the `StartScreen` we add some navigation buttons, but it's not production-ready implementation, just for example and our understanding. We use `Router.navigate('toPath')` on `_handleEnter` method for navigate to current active `NavItem` address, which we set as a value for a `to` field on `_init` method.

**Finnaly**, to power our App with Router capabilities, we must add some configurations in the `App.js` component. It's really simple.
```javascript
import { Router } from '@lightningjs/sdk'
import routes from './routes'
```
Extends `Router.App` for the `App` class and add `Router.startRouter(routes, this)` in the `_setup` method. Done! Together the final step looks like:
```javascript
import { Utils, Router } from '@lightningjs/sdk'
import routes from './routes'

export default class App extends Router.App {
  _setup() {
    Router.startRouter(routes, this)
  }
}
```

That's it. We've set up basic Routing for our Lightning app.
