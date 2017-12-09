import React from 'react'
import { mount, render, shallow } from 'enzyme'
import { Check, Connector, Input } from '../index'

const IDS = {
    isReadonly: 'isReadonly',
    withDefault: 'withDefault',
    number: 'number',
    string: 'string',
    divider: 'divider',
    decimalMark: 'decimalMark',
}

const DIVIDERS = [2, 4, 8, 10]

const DECIMAL_MARKS = ['.', ',', '·']

const STATE = {
    isReadonly: false,
    withDefault: true,
    number: 2,
    string: 'text',
    plus: 3.6,
    multiplyTo: 4,
    [IDS.divider]: DIVIDERS[0],
    [IDS.decimalMark]: DECIMAL_MARKS[0],
}

describe('Check', () => {
    const wrapper = render(
        <div>
            <Check
                id={IDS.isReadonly}
                state={STATE}
            />
            <Check
                id={IDS.withDefault}
                state={STATE}
            />
        </div>
    )

    it('shows falsy value', () => {
        expect(wrapper.find(`input[type="checkbox"][id="labeled-control-${IDS.isReadonly}"]`).prop('checked')).toBeFalsy()
    })

    it('shows truthy value', () => {
        expect(wrapper.find(`input[type="checkbox"][id="labeled-control-${IDS.withDefault}"]`).prop('checked')).toBeTruthy()
    })
})

describe('Connector', () => {
    const wrapper = shallow(
        <Connector state={STATE}>
            <Check id={IDS.withDefault} />
            <Input id={IDS.number} />
            {false &&
            <Input id={IDS.plus} />}
        </Connector>
    )

    it('passes new props to children', () => {
        expect(wrapper.find(Check).props().state).toEqual(STATE)
        expect(wrapper.find(Input).props().state).toEqual(STATE)
    })

    it('saves own props of children', () => {
        expect(wrapper.find(Check).props().id).toEqual(IDS.withDefault)
        expect(wrapper.find(Input).props().id).toEqual(IDS.number)
    })
})

describe('Input', () => {
    const oneLineWrapper = mount(
        <Input
            id={IDS.number}
            state={STATE}
        />
    )
    const multiLineWrapper = mount(
        <Input
            id={IDS.string}
            state={STATE}
            multiLine
        />
    )

    it('render input', () => {
        expect(oneLineWrapper.find(`input[id="labeled-control-${IDS.number}"]`).length).toEqual(1)
    })

    it('render textarea', () => {
        expect(multiLineWrapper.find(`textarea[id="labeled-control-${IDS.string}"]`).length).toEqual(1)
    })
})
