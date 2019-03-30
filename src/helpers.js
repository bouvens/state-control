import { get } from './common/utils'

const ALLOW_SET_SELECTION_RANGE = ['text', 'search', 'URL', 'tel', 'password']

export const selectAll = (control) => {
  if (ALLOW_SET_SELECTION_RANGE.includes(control.type)) {
    control.setSelectionRange(0, control.value.length)
  }
}
