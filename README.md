# Router setup for LightningJS application
> The _Router_ plugin provides an easy-to-use API that helps you create a _URL-driven, routed_ Lightning App.
[Related SDK docs](https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/index)

Firstly, create our feature pages. We locale them in `src/pages` or, in our case, `src/screens` folder. Each screen has a separate folder because in the advanced use-cases we'll have helper files such as store connection, utils, constants, styles, etc.

#### Naming pattern
This naming patter we'll use for most our components.
- `Blank/BlankScreen.js` with PascalCase as a screen name
- `Blank/BlankScreen.connect.js` or `Blank/BlankScreen.utils.js` with file purpose after `.`
![[./screenshots/screens_structure.png]]

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
