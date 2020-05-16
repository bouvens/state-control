export const selectAll = (control) => {
  if (control.setSelectionRange) {
    control.setSelectionRange(0, control.value.length)
  }
}
