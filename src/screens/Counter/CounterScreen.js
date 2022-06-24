import { Lightning } from '@lightningjs/sdk'
import connect from './CounterScreen.connect'
import { decrement, increment } from '../../logic/counter/counter.slice'
import { asyncIncrement } from '../../logic/counter/counter.thunk'
import { store } from '../../logic/store'
import BlueCenter from '../../ui/templates/BlueCenter'

export class CounterScreen extends Lightning.Component {
  static _template() {
    return {
      CounterScreen: {
        type: BlueCenter,
        Counter: {
          text: {
            text: '',
            fontSize: 32,
          },
        },
        Buttons: {
          w: 570,
          y: 50,
          IncrementButton: {
            type: Button,
            buttonText: 'Increment',
            passSignals: { onEnter: '_increment' },
          },
          DecrementButton: {
            x: 200,
            type: Button,
            buttonText: 'Decrement',
            passSignals: { onEnter: '_decrement' },
          },
          AsyncIncrementButton: {
            x: 400,
            type: Button,
            buttonText: 'Async Increment',
            passSignals: { onEnter: '_asyncIncrement' },
          },
        },
        signals: {
          _increment: true,
          _decrement: true,
          _asyncIncrement: true,
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

  _init() {
    this.focusIndex = 0
  }

  set counter(value) {
    this.tag('CounterScreen.Counter').text.text = value
  }

  _handleLeft() {
    const current = this.focusIndex
    this.focusIndex = current > 0 ? current - 1 : 0
  }

  _handleRight() {
    const current = this.focusIndex
    const maxIndex = this.tag('CounterScreen.Buttons').children.length - 1
    this.focusIndex = current < maxIndex ? current + 1 : 0
  }

  _getFocused() {
    return this.tag('CounterScreen.Buttons').children[this.focusIndex]
  }

  _increment() {
    store.dispatch(increment())
  }

  _decrement() {
    store.dispatch(decrement())
  }

  _asyncIncrement() {
    store.dispatch(asyncIncrement())
  }
}

class Button extends Lightning.Component {
  static _template() {
    return {
      color: 0xff1f1f1f,
      texture: Lightning.Tools.getRoundRect(170, 40, 4),
      Label: {
        x: w => w / 2,
        y: h => h / 2,
        mountX: 0.5,
        mountY: 0.45,
        color: 0xffffffff,
        text: { fontSize: 20 },
      },
    }
  }

  _init() {
    this.tag('Label').patch({ text: { text: this.buttonText } })
  }

  _focus() {
    this.color = 0xffffffff
    this.tag('Label').color = 0xff1f1f1f
  }

  _unfocus() {
    this.color = 0xff1f1f1f
    this.tag('Label').color = 0xffffffff
  }

  _handleEnter() {
    this.signal('onEnter')
  }
}
