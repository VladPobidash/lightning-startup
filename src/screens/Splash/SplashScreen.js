import { Lightning, Router, Utils } from '@lightningjs/sdk'
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

  _init() {
    this._pulse = this.tag('SplashScreen.Image').animation({
      duration: 2,
      repeat: 0,
      actions: [{ p: 'alpha', v: { 0: 0, 0.5: 1, 1: 0 } }],
    })

    this._pulse.on('finish', () => {
      setTimeout(() => Router.resume(), 2000)
    })

    this._pulse.start()
  }
}
