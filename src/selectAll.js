import _ from 'lodash'

const ALLOW_SET_SELECTION_RANGE = ['text', 'search', 'URL', 'tel', 'password']

const selectAll = (control) => {
  if (_.includes(ALLOW_SET_SELECTION_RANGE, control.type)) {
    control.setSelectionRange(0, control.value.length)
  }
}

export default selectAll
