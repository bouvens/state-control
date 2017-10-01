import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { Input } from '../src'

describe('Component', () => {
    let node

    beforeEach(() => {
        node = document.createElement('div')
    })

    afterEach(() => {
        unmountComponentAtNode(node)
    })

    it('displays a welcome message', () => {
        render(<Input />, node, () => {
            expect(node.innerHTML).toContain('Welcome to React components')
        })
    })
})
