import React from 'react'
import { mount } from 'enzyme'
import { Radio } from '../../../'

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

const DECIMAL_MARKS = ['.', ',', '·']

const STATE = {
    [IDS.decimalMark]: DECIMAL_MARKS[0],
}

describe('Radio', () => {
    const radio = (
        <Radio
            state={STATE}
            id={IDS.decimalMark}
            label={<div className="text-before">{DESCRIPTIONS.label}</div>}
            suffix={<span>{DESCRIPTIONS.suffix}</span>}
            values={DECIMAL_MARKS}
        />
    )
    const wrapper = mount(radio)

    it('render button', () => {
        expect(wrapper.find(`input[value="${DECIMAL_MARKS[0]}"]`).length).toEqual(1)
        expect(wrapper.find(`input[value="${DECIMAL_MARKS[1]}"]`).length).toEqual(1)
    })

    it('render text before', () => {
        expect(wrapper.find('.text-before').text()).toEqual(DESCRIPTIONS.label)
    })

    it('render suffix', () => {
        expect(wrapper.find('span').text()).toEqual(DESCRIPTIONS.suffix)
    })

    xit('call onchange on click', () => {
    })

    xit('may be disabled', () => {
    })
})
