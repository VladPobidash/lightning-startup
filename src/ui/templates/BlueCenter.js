import { Lightning } from '@lightningjs/sdk'

export default class BlueCenter extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      colorUl: 0xff104b81,
      colorUr: 0xff0b203d,
      colorBr: 0xff0b1c36,
      colorBl: 0xff0b1c36,
      flex: {
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'column',
      },
    }
  }
}
