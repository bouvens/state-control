import React from 'react'
import { mount, render } from 'enzyme'
import { Check, Input } from '../index'

const IDS = {
    isReadonly: 'isReadonly',
    withDefault: 'withDefault',
    number: 'number',
    string: 'string',
    divider: 'divider',
    decimalMark: 'decimalMark',
}

const DESCRIPTIONS = {
    label: 'N',
    suffix: '+',
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
    const checks = (
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
    const wrapper = render(checks)

    it('shows falsy value', () => {
        expect(wrapper.find(`input[type="checkbox"][id="labeled-control-${IDS.isReadonly}"]`).prop('checked')).toBeFalsy()
    })

    it('shows truthy value', () => {
        expect(wrapper.find(`input[type="checkbox"][id="labeled-control-${IDS.withDefault}"]`).prop('checked')).toBeTruthy()
    })
})

describe('Input', () => {
    const oneLine = (
        <Input
            id={IDS.number}
            state={STATE}
            label={DESCRIPTIONS.label}
            suffix={DESCRIPTIONS.suffix}
        />
    )
    const oneLineWrapper = mount(oneLine)
    const multiLine = (
        <Input
            id={IDS.string}
            state={STATE}
            multiLine
        />
    )
    const multiLineWrapper = mount(multiLine)

    it('render input', () => {
        expect(oneLineWrapper.find(`input[id="labeled-control-${IDS.number}"]`).length).toEqual(1)
    })

    it('render textarea', () => {
        expect(multiLineWrapper.find(`textarea[id="labeled-control-${IDS.string}"]`).length).toEqual(1)
    })

    it('render label', () => {
        expect(oneLineWrapper.find('label').text()).toEqual(DESCRIPTIONS.label)
    })

    it('render suffix', () => {
        expect(oneLineWrapper.find('span').text()).toEqual(DESCRIPTIONS.suffix)
    })
})