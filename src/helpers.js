import { get } from './common/utils'

const ALLOW_SET_SELECTION_RANGE = ['text', 'search', 'URL', 'tel', 'password']

export const selectAll = (control) => {
  if (ALLOW_SET_SELECTION_RANGE.includes(control.type)) {
    control.setSelectionRange(0, control.value.length)
  }
}

export const extendConnection = (props, IDS) => (state) => ({
  ...props(state),
  ...Object.values(IDS).map((id) => get(state, id)),
})

export const mapStateToIds = (state, IDS) => Object.values(IDS).reverse().map((id) => state[id])
