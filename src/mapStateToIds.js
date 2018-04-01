import _ from 'lodash'

const mapStateToIds = (state, IDS) => _.mapValues(_.invert(IDS), (id) => state[id])

export default mapStateToIds
