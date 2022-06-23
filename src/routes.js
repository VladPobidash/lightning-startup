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
