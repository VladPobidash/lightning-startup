import { Lightning, Router } from '@lightningjs/sdk'
import BlueCenter from '../../ui/templates/BlueCenter'

export class StartScreen extends Lightning.Component {
  static _template() {
    return {
      StartScreen: {
        type: BlueCenter,
        ScreenInfo: {
          text: {
            text: 'Start screen',
            textColor: 0xeeffffff,
          },
        },
        Navigation: {
          Items: {},
          FocusIndicator: { text: { text: '>', fontSize: 24 } },
        },
      },
    }
  }

  _init() {
    this._blink = this.tag('StartScreen.Navigation.FocusIndicator').animation({
      duration: 1,
      repeat: -1,
      actions: [{ p: 'x', v: { 0: -40, 0.5: -20, 1: -40 } }],
    })

    this.tag('StartScreen.Navigation.Items').children = [
      { label: 'Counter', to: 'counter' },
      { label: 'Test', to: 'counter' },
    ].map((item, idx) => {
      return {
        type: NavItem,
        label: item.label,
        to: item.to,
        y: idx * 40,
      }
    })

    this._index = 0
    this._blink.start()
  }

  get navigationItems() {
    return this.tag('StartScreen.Navigation.Items').children
  }

  _setIndex(idx) {
    this.tag('StartScreen.Navigation.FocusIndicator').setSmooth('y', idx * 40)
    this._index = idx
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index))
  }

  _handleDown() {
    this._setIndex(Math.min(++this._index, this.navigationItems.length - 1))
  }

  _handleEnter() {
    Router.navigate(this.navigationItems[this._index].to)
  }

  _getFocused() {
    return this.tag('Navigation')
  }
}

class NavItem extends Lightning.Component {
  static _template() {
    return {
      text: { text: '', fontSize: 24 },
    }
  }

  set label(v) {
    this.text.text = v
  }

  set to(to) {
    this._to = to
  }

  get to() {
    return this._to
  }
}
