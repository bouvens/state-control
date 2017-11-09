import _ from 'lodash'
import { ALLOW_SET_SELECTION_RANGE } from './constants'

export const selectAll = (control) => {
    if (_.includes(ALLOW_SET_SELECTION_RANGE, control.type)) {
        control.setSelectionRange(0, control.value.length)
    }
}

export const extendConnection = (props, IDS) =>
    (state) => _.extend(
        props(state),
        _.mapValues(IDS, (id) => _.get(state, id))
    )

export const mapStateToIds = (state, IDS) => _.mapValues(_.invert(IDS), (id) => state[id])
