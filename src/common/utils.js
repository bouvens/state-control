export const noop = () => void 0

function getPath (obj, path) {
  if (obj[path] != null) {
    return [path]
  }
  if (Array.isArray(path)) {
    return path
  }
  return path.split('.')
}

export function get (obj, path) {
  let objectByPath = obj
  const pathArray = getPath(obj, path)
  const { length } = pathArray

  for (let i = 0; objectByPath !== null && i < length; i += 1) {
    objectByPath = objectByPath[pathArray[i]]
  }

  return objectByPath
}

export function trim (str, chars) {
  return str
    .replace(new RegExp(`^[${chars}]+`, 'g'), '')
    .replace(new RegExp(`[${chars}]+$`, 'g'), '')
}

export function saveSelection (target) {
  if (target.selectionStart !== void 0) {
    return {
      start: target.selectionStart,
      end: target.selectionEnd,
    }
  }

  if (document.selection) { // IE support
    target.focus()
    // To get cursor position, get empty selection range
    const selectionRange = document.selection.createRange()
    // Move selection start to 0 position
    selectionRange.moveStart('character', -target.value.length)
    // The cursor position is selection length
    const start = selectionRange.text.length

    return { start, end: start }
  }

  return { start: 0, end: 0 }
}

export function restoreSelection (target, { start, end }) {
  if (!target || start === void 0
    || (target === document.activeElement && target.selectionStart === start && target.selectionEnd === end)) {
    return
  }

  if ((target.type === 'text' || target.type === 'textarea') && target === document.activeElement) {
    if (target.setSelectionRange) {
      target.setSelectionRange(start, end)
    } else if (target.createTextRange) {
      const range = target.createTextRange()
      range.collapse(true)
      range.moveStart('character', start)
      range.moveEnd('character', end)
      range.select()
    }
  }
}
