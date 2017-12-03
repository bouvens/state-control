import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { Check, Connector } from '../src'
import { mount } from 'enzyme'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

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
