import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { mount } from 'enzyme'
import { Check, Connector } from '../index'

const STATE = {
    value: 'test value',
}

describe('Connector', () => {
    let node

    beforeEach(() => {
        node = document.createElement('div')
    })

    afterEach(() => {
        unmountComponentAtNode(node)
    })

    it('passes props to children', () => {
        const wrapper = mount(
            <Connector state={STATE}>
                <Check id="Testing check" />
            </Connector>
        )
        expect(wrapper.find(Check).props().state).toEqual(STATE)
    })
})
