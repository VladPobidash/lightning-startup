import { connect, stateToProp } from '../../logic/connect'
import { getCounterValue } from '../../logic/counter/counter.selector'

export default connect(instance => [stateToProp(getCounterValue, instance, 'counter')])
