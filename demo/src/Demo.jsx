import React, { Component, StrictMode } from 'react'

import { Check, Connector, Input, Radio, selectAll, SettersBlock } from '../../src'
import './style.css'

const LABELS_FOR_ITERATIONS = {
  number: {
    label: 'N',
    suffix: '+',
  },
  plus: {
    label: '+',
    suffix: '×',
  },
  multiplyTo: {
    label: '×',
    suffix: '÷',
  },
}

const IDS = {
  divider: 'divider',
  decimalMark: 'decimalMark',
}

const LABELS = {
  [IDS.divider]: '÷',
  [IDS.decimalMark]: 'Decimal mark for inputs and the result:',
}

const DEFAULT_NUMBER = 1

const DIVIDERS = [2, 4, 8, 10]

const DECIMAL_MARKS = ['.', ',', '·']

const PRESETS = {
  Default: {
    isReadonly: false,
    withDefault: true,
    numberColor: false,
    number: 2,
    selectAllOnFocus: false,
    plus: 3.6,
    multiplyTo: 4,
    [IDS.divider]: DIVIDERS[0],
    [IDS.decimalMark]: DECIMAL_MARKS[0],
  },
  '1, 2, 3, 4': {
    number: 1,
    plus: 2,
    multiplyTo: 3,
    [IDS.divider]: DIVIDERS[1],
  },
  'Other numbers': {
    number: 100,
    plus: 25,
    multiplyTo: 2,
    [IDS.divider]: DIVIDERS[3],
  },
}

export default class Demo extends Component {
  state = PRESETS.Default

  getCalculated = () => this.formatNumber((this.state.number
    + (this.state.plus * this.state.multiplyTo)) / this.state.divider)

  getResult = () => `(${this.formatNumber(this.state.number)} ${LABELS_FOR_ITERATIONS.plus.label} ${
    this.formatNumber(this.state.plus)} ${LABELS_FOR_ITERATIONS.multiplyTo.label} ${
    this.formatNumber(this.state.multiplyTo)}) ${LABELS.divider} ${this.formatNumber(this.state.divider)} = ${
    this.getCalculated()}\n${this.state.withDefault ? 'With default numbers' : 'Without default numbers'}`

  formatNumber = (number) => number.toString().replace('.', this.state.decimalMark)

  handleSave = (name, value) => {
    this.setState({ [name]: value })
  }

  render () {
    const { withDefault, decimalMark, numberColor, isReadonly, selectAllOnFocus } = this.state

    return (
      <StrictMode>
        <h2>Some presets</h2>
        <SettersBlock
          setters={PRESETS}
          setHandler={this.handleSave}
          tabIndexOffset={3}
        />
        <h2>State control</h2>
        <Connector
          state={this.state}
          onChange={this.handleSave}
          defaultNum={withDefault ? DEFAULT_NUMBER : null}
          decimalMark={decimalMark}
          numberColor={numberColor}
        >
          <Check
            id="isReadonly"
            label="Readonly controls"
          />
          <Check
            id="withDefault"
            label={`Inputs with default numbers = ${DEFAULT_NUMBER}`}
            readOnly={isReadonly}
          />
          <Check
            id="numberColor"
            label="Colorize inputs with parsed numbers"
            readOnly={isReadonly}
          />
          <Check
            id="selectAllOnFocus"
            label="Select all on focus"
            readOnly={isReadonly}
          />
          <br />
          {Object.entries(LABELS_FOR_ITERATIONS).map(([id, strings]) => (
            <Input
              key={id}
              id={id}
              label={strings.label}
              suffix={strings.suffix}
              readOnly={isReadonly}
              onFocus={selectAllOnFocus ? selectAll : void 0}
              className="inputs"
            />
          ))}
          <Radio
            id={IDS.divider}
            label={LABELS.divider}
            values={DIVIDERS}
            readOnly={isReadonly}
          />
          <Radio
            id={IDS.decimalMark}
            label={LABELS.decimalMark}
            suffix="Decimal mark is used for inputs and formatting in the result."
            values={DECIMAL_MARKS}
            readOnly={isReadonly}
          />
        </Connector>
        <h2>Result</h2>
        <Input
          className="multiline"
          id="isReadonly"
          multiLine
          value={this.getResult()}
          readOnly
        />
      </StrictMode>
    )
  }
}
