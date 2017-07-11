import React, { Component } from 'react'
import { render } from 'react-dom'

import { SettersBlock, Connector, Input } from '../../src'

class Demo extends Component {
    render () {
        return <div>
            <h1>state-control Demo</h1>
            there must be demo
        </div>
    }
}

render(<Demo />, document.querySelector('#demo'))
