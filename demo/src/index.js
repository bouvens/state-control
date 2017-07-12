import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import { Check, Connector, Input, SettersBlock } from '../../src'

const IDS = {
    number: 'Number',
    plus: '+',
    multiplyTo: '×',
}

const PRESETS = []

class Demo extends Component {
    constructor () {
        super()
        this.setState = this.setState.bind(this)
    }

    state = {
        withDefault: true,
        number: 2,
        plus: 3,
        multiplyTo: 4,
    }

    handleSave = (name, value) => {
        this.setState({ [name]: value })
    }

    getCalculated = () => this.state.number + this.state.plus * this.state.multiplyTo

    render () {
        return (
            <div>
                <h1>{'state-control Demo'}</h1>
                <SettersBlock
                    setters={PRESETS}
                    setHandler={this.setState}
                />
                <Connector
                    state={this.state}
                    onChange={this.handleSave}
                    defaultNum={this.state.withDefault ? 1 : null}
                >
                    <Check
                        id="withDefault"
                        label="With default number"
                    />
                    {_.reduce(IDS, (result, label, id) => result.concat(
                        <Input
                            key={id}
                            id={id}
                            label={label}
                        />
                    ), [])}
                </Connector>
                <p>
                    {`${this.state.number} ${IDS.plus} ${this.state.plus} ${IDS.multiplyTo} ${this.state.multiplyTo}
                     = ${this.getCalculated()}`}
                </p>
                <p>
                    {this.state.withDefault
                        ? 'With default numbers'
                        : 'Without default numbers'
                    }
                </p>
            </div>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
