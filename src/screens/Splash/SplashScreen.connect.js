import { connect, stateToProp } from '../../logic/connect'
import { isReady } from '../../logic/app/app.selectors'

export default connect(instance => [stateToProp(isReady, instance, 'isReady')])
