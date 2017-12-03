import React from 'react'
import { mount } from 'enzyme'
import { Check, Connector, Input } from '../index'

const IDS = {
    isReadonly: 'isReadonly',
    withDefault: 'withDefault',
    number: 'number',
    divider: 'divider',
    decimalMark: 'decimalMark',
}

const DIVIDERS = [2, 4, 8, 10]

const DECIMAL_MARKS = ['.', ',', '·']

const STATE = {
    isReadonly: false,
    withDefault: true,
    number: 2,
    plus: 3.6,
    multiplyTo: 4,
    [IDS.divider]: DIVIDERS[0],
    [IDS.decimalMark]: DECIMAL_MARKS[0],
}

describe('Connector', () => {
    const wrapper = mount(
        <Connector state={STATE}>
            <Check id={IDS.withDefault} />
            <Input id={IDS.number} />
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

describe('Check', () => {
    const wrapper = mount(
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
