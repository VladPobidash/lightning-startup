import { store } from './logic/store'
import { loadApp } from './logic/app/app.thunks'

import { CounterScreen } from './screens/Counter/CounterScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'
import { StartScreen } from './screens/Start/StartScreen'

export default {
  root: 'start',
  boot: async () => {
    await store.dispatch(loadApp())
  },
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
