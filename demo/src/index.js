import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import { Check, Connector, Input, Radio, SettersBlock } from '../../src'
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
        this.getCalculated()}\n${
        this.state.withDefault ? 'Inputs with default numbers' : 'Inputs without default numbers'}`

    formatNumber = (number) => number.toString().replace('.', this.state.decimalMark)

    handleSave = (name, value) => {
        this.setState({ [name]: value })
    }

    handleFocus = (control) => {
        control.setSelectionRange(0, control.value.length)
    }

    render () {
        return (
            <div className="example">
                <h1>StateControl Demo</h1>
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
                >
                    <Check
                        id="isReadonly"
                        label="Readonly inputs"
                    />
                    <Check
                        id="withDefault"
                        label="Inputs with default numbers = 1"
                    />
                    {_.reduce(LABELS_FOR_ITERATIONS, (result, label, id) => result.concat(<Input
                        key={id}
                        id={id}
                        label={label}
                        readOnly={this.state.isReadonly}
                        onFocus={this.handleFocus}
                    />), [])}
                    <Radio
                        id={IDS.divider}
                        label={LABELS.divider}
                        values={DIVIDERS}
                    />
                    <Radio
                        id={IDS.decimalMark}
                        label={LABELS.decimalMark}
                        values={DECIMAL_MARKS}
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
                <h2>Source code and documentation</h2>
                <ul>
                    <li><a href="https://github.com/bouvens/state-control">GitHub</a></li>
                    <li><a href="https://www.npmjs.com/package/state-control">npm</a></li>
                </ul>

                <a href="https://github.com/bouvens/state-control">
                    <img
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            border: 0,
                        }}
                        src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
                        alt="Fork me on GitHub"
                        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
                    />
                </a>
            </div>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
