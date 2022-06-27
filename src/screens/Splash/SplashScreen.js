import { Lightning, Router, Utils } from '@lightningjs/sdk'
import connect from './SplashScreen.connect'
import BlueCenter from '../../ui/templates/BlueCenter'

export class SplashScreen extends Lightning.Component {
  static _template() {
    return {
      SplashScreen: {
        type: BlueCenter,
        Image: {
          w: 512,
          h: 512,
          src: Utils.asset('rocket.png'),
        },
      },
    }
  }

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

  _init() {
    this._pulse = this.tag('SplashScreen.Image').animation({
      duration: 2,
      repeat: -1,
      actions: [{ p: 'alpha', v: { 0: 0, 0.5: 1, 1: 0 } }],
    })

    this._pulse.start()
  }
}
