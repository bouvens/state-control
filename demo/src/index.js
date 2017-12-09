import React, { Component } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'react-dom'
import _ from 'lodash'

import { Check, Connector, Input, Radio, SettersBlock } from '../../src'
import { selectAll } from '../../src/common/utils'
import './style.css'

const LABELS_FOR_ITERATIONS = {
    number: 'N',
    plus: '+',
    multiplyTo: '×',
}

const IDS = {
    divider: 'divider',
    decimalMark: 'decimalMark',
}

const LABELS = {
    [IDS.divider]: '÷',
    [IDS.decimalMark]: 'Decimal mark for inputs and the result',
}

const DIVIDERS = [2, 4, 8, 10]

const DECIMAL_MARKS = ['.', ',', '·']

const PRESETS = {
    Default: {
        isReadonly: false,
        withDefault: true,
        numberColor: false,
        number: 2,
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

class Demo extends Component {
    state = PRESETS.Default

    getCalculated = () => this.formatNumber((this.state.number +
        (this.state.plus * this.state.multiplyTo)) / this.state.divider)

    getResult = () => `(${this.formatNumber(this.state.number)} ${LABELS_FOR_ITERATIONS.plus} ${
        this.formatNumber(this.state.plus)} ${LABELS_FOR_ITERATIONS.multiplyTo} ${
        this.formatNumber(this.state.multiplyTo)}) ${LABELS.divider} ${this.formatNumber(this.state.divider)} = ${
        this.getCalculated()}\n${this.state.withDefault ? 'With default numbers' : 'Without default numbers'}`

    formatNumber = (number) => number.toString().replace('.', this.state.decimalMark)

    handleSave = (name, value) => {
        this.setState({ [name]: value })
    }

    render () {
        return (
            <div className="example">
                <h2>Some presets</h2>
                <SettersBlock
                    setters={PRESETS}
                    setHandler={this.handleSave}
                />
                <h2>State control</h2>
                <Connector
                    state={this.state}
                    onChange={this.handleSave}
                    defaultNum={this.state.withDefault ? 1 : null}
                    decimalMark={this.state.decimalMark}
                    numberColor={this.state.numberColor}
                >
                    <Check
                        id="isReadonly"
                        label="Readonly controls"
                    />
                    <Check
                        id="withDefault"
                        label="Inputs with default numbers = 1"
                        readOnly={this.state.isReadonly}
                    />
                    <Check
                        id="numberColor"
                        label="Colorize inputs with parsed numbers"
                        readOnly={this.state.isReadonly}
                    />
                    <br />
                    {_.reduce(LABELS_FOR_ITERATIONS, (result, label, id) => result.concat(<Input
                        key={id}
                        id={id}
                        label={label}
                        readOnly={this.state.isReadonly}
                        onFocus={selectAll}
                        className="inputs"
                    />), [])}
                    <Radio
                        id={IDS.divider}
                        label={LABELS.divider}
                        values={DIVIDERS}
                        readOnly={this.state.isReadonly}
                    />
                    <Radio
                        id={IDS.decimalMark}
                        label={LABELS.decimalMark}
                        values={DECIMAL_MARKS}
                        readOnly={this.state.isReadonly}
                    />
                </Connector>
                <h2>Result</h2>
                <Input
                    id="isReadonly"
                    multiLine
                    value={this.getResult()}
                    readOnly
                    style={{ width: '300px' }}
                />
            </div>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
