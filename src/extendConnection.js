import _ from 'lodash'

const extendConnection = (props, IDS) =>
    (state) => _.extend(
        props(state),
        _.mapValues(IDS, (id) => _.get(state, id))
    )

export default extendConnection
