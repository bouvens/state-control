// defaultProps come from an HOC
/* eslint-disable react/require-default-props */

import React from 'react'
import PropTypes from 'prop-types'
import { MARK_TYPE, NUMBER_COLOR_TYPE, VALUE_TYPE } from './constants'
import { defaultProps, get, noop, trim } from './utils'

const DEFAULT_PROPS = {
  onChange: noop,
  onClick: noop,
  onFocus: noop,
  decimalMark: '.',
  numberColor: false,
  alternateDecimalMark: ',',
  trimOnPaste: true,
}

const DEFAULT_SEPARATORS = {
  '.': [',', '\'', '’', ' '],
  ',': [' ', '.'],
  '·': [','],
  '\'': ['.'],
}

const makeRegexpForReplace = (symbols) => new RegExp(`[${
  (Array.isArray(symbols) ? symbols.join('') : symbols)
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(' ', '\\s')
}]`, 'g')

const withControl = (Child) => {
  class Controlled extends React.Component {
    static propTypes = {
      id: PropTypes.string.isRequired,
      // state may contain not controlled parameters too
      state: PropTypes.objectOf(PropTypes.any),
      path: PropTypes.string,
      value: VALUE_TYPE,
      values: PropTypes.arrayOf(VALUE_TYPE),
      defaultNum: PropTypes.number,
      onChange: PropTypes.func,
      onClick: PropTypes.func,
      onFocus: PropTypes.func,
      decimalMark: PropTypes.string,
      numberColor: NUMBER_COLOR_TYPE,
      thousandsSeparator: MARK_TYPE,
      alternateDecimalMark: MARK_TYPE,
      trimOnPaste: PropTypes.bool,
    }

    afterUpdate = null

    componentDidUpdate() {
      if (this.afterUpdate) {
        this.afterUpdate()
        this.afterUpdate = null
      }
    }

    getId = () => `labeled-control-${this.props.id}`

    getPath = () => this.props.path || this.props.id

    getValue = () => (
      this.props.value !== void 0
        ? this.props.value
        : get(this.props.state, this.getPath())
    )

    getThousandsSeparator = () => this.props.thousandsSeparator
      || DEFAULT_SEPARATORS[this.props.decimalMark]

    getColorIfNumber = () => (typeof this.getValue() === 'number' ? this.props.numberColor : void 0)

    prepareNum = (num) => num
      .replace(
        this.getThousandsSeparator() ? makeRegexpForReplace(this.getThousandsSeparator()) : null,
        '',
      )
      .replace(makeRegexpForReplace(this.props.alternateDecimalMark), '.')
      .replace(this.props.decimalMark, '.')

    wasNumber = (valueForCheck, previousType) => (
      !Number.isNaN(Number(valueForCheck)) && valueForCheck.length
    ) || (
      previousType === 'number'
      && !valueForCheck.length
      && this.props.defaultNum
    )

    processNewValue = ({ value, checked, type }, isRemoveZeros) => {
      const previousType = typeof this.getValue()
      let valueForReturn = value

      if (previousType === 'boolean' || type === 'checkbox') {
        this.props.onChange(this.getPath(), checked)

        return
      }

      let valueForCheck = this.prepareNum(valueForReturn)
      if (isRemoveZeros) {
        const match = new RegExp('^(\\d+\\.(?:0*(?:\\d?[1-9])+)?)0*$').exec(valueForCheck)
        if (match && match[1]) {
          [, valueForCheck] = match
          if (/\.$/.test(valueForCheck)) {
            valueForCheck = valueForCheck.slice(0, -1)
          }
        }
      }

      if (this.wasNumber(valueForCheck, previousType)
        && !/(\.|\s|\.[0-9]*0)$/.test(valueForCheck)) {
        const parseFunc = /\./.test(valueForCheck) ? parseFloat : parseInt
        valueForReturn = parseFunc(valueForCheck, 10) || this.props.defaultNum || 0
      }

      this.props.onChange(this.getPath(), valueForReturn)
    }

    changeHandler = ({ target }) => {
      const { value, checked, type } = target
      this.processNewValue({ value, checked, type })
    }

    pasteHandler = (event) => {
      event.preventDefault()

      const { target, clipboardData } = event
      const { selectionStart, selectionEnd, checked, type } = target
      let value = clipboardData.getData('Text')
      if (this.props.trimOnPaste) {
        value = trim(value, ' \\t\\n')
      }

      let selectionPosition = selectionStart

      if (value.toString) {
        selectionPosition += value.toString().length
      }

      const currentValue = this.getValue()
      if (currentValue && currentValue.toString) {
        const selectionLength = selectionEnd - selectionStart
        const newValue = currentValue.toString().split('')
        newValue.splice(selectionStart, selectionLength, value)
        value = newValue.join('')
      }

      this.afterUpdate = () => {
        target.setSelectionRange(selectionPosition, selectionPosition)
      }

      this.processNewValue({ value, checked, type }, this.props.trimOnPaste)
    }

    clickHandler = (that) => () => this.props.onClick(that.control)

    focusHandler = (that) => () => this.props.onFocus(that.control)

    formatNum = (num = this.getValue()) => num.toString().replace('.', this.props.decimalMark)

    showValue = () => {
      const value = this.getValue()

      switch (typeof value) {
        case 'number':
          return this.props.values ? value : this.formatNum()
        case 'boolean':
        case 'string':
          return value
        default:
          return value === void 0 ? value : value.toString()
      }
    }

    refHandler = (that) => (control) => {
      // The parameter reassign is needed for simplifying controlled components
      // eslint-disable-next-line no-param-reassign
      that.control = control
    }

    render() {
      const {
        id, state, path, value, defaultNum, onChange, onClick, onFocus, decimalMark, numberColor,
        thousandsSeparator, alternateDecimalMark, trimOnPaste, ...passedProps
      } = this.props

      return (
        <Child
          {...passedProps}
          id={this.getId()}
          value={this.showValue()}
          onChange={this.changeHandler}
          onPaste={this.pasteHandler}
          onClick={this.clickHandler}
          onFocus={this.focusHandler}
          refHandler={this.refHandler}
          numberColor={this.getColorIfNumber()}
        />
      )
    }
  }

  return Controlled
}

export default (component) => defaultProps(DEFAULT_PROPS)(withControl(component))
