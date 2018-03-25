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

export function saveCursorPosition ({ target }) {
    if (target.selectionStart) {
        return target.selectionStart
    } else if (document.selection) { // IE support
        target.focus()
        // To get cursor position, get empty selection range
        const selectionRange = document.selection.createRange()
        // Move selection start to 0 position
        selectionRange.moveStart('character', -target.value.length)
        // The cursor position is selection length
        return selectionRange.text.length
    }

    return 0
}

export function restoreCursorPosition (target, cursorPosition) {
    if (!target || _.isNil(cursorPosition)) {
        return
    }

    if ((target.type === 'text' || target.type === 'textarea') && target === document.activeElement) {
        if (target.setSelectionRange) {
            target.setSelectionRange(cursorPosition, cursorPosition)
        } else if (target.createTextRange) {
            const range = target.createTextRange()
            range.collapse(true)
            range.moveStart('character', cursorPosition)
            range.moveEnd('character', cursorPosition)
            range.select()
        }
    }
}

