# React state-control &middot; [![npm][npm-badge]][npm] [![npm][npm-dt-badge]][npm] [![GitHub issues][issues-badge]][issues]

A bunch of lightweight components for simply changing state of stateful root component. It fits to strings, numbers (automatically detected) as `<Input />`, booleans as `<Check />` and sets of values as `<Radio />`.

This package also provides component for presets of values (`<SettersBlock />`) and helper to reduce your source code size (`<Connector />`). It can be even used with Redux (see below).

## [Demo](https://bouvens.github.io/state-control/)

You are able to see live demo at [https://bouvens.github.io/state-control/](https://bouvens.github.io/state-control/)
Source code of this demo is available in [the repository](https://github.com/bouvens/state-control/blob/master/demo/src/index.js).

## Quick start

Install package to your project:
```Shell
npm i state-control
```

Include required components to jsx:
```JSX
import { Check, Connector, Input, Radio, SettersBlock } from 'state-control'
```

Most likely you will also need an array of identifiers:
```JSX
const IDS = {
   firstStateParameter: 'firstStateParameter',
   secondStateParameter: 'secondStateParameter',
}
```

Use this identifiers as names in state and add a `changeHandler`:
```JSX
class Demo extends Component {
    state = {
        [IDS.firstStateParameter] = 1,
        [IDS.secondStateParameter] = 'second',
    }

    changeHandler = (name, value) => {
        // input value may be proceded here
        this.setState({ [name]: value })
    }

    ...
}
```

And also us the array in `id` of component to connect it to corresponding property of state:
```JSX
<Input
    state={this.state}
    onChange={this.changeHandler}
    id={IDS.firstStateParameter}
    label={'First state parameter'}
/>
```

That's it!

## <Connector \/>
You can use `Connector` component for passing common props to all children:
```JSX
<Connector
    state={this.state}
    onChange={this.changeHandler}
>
    <Input
        id={IDS.firstStateParameter}
        label={'First state parameter'}
    />
    <Input
        id={IDS.secondStateParameter}
        label={'Second state parameter'}
    />
</Connector>
```

## <SettersBlock \/>
This component generates elements for activation of presets:
```JSX
<SettersBlock
    setters={SETTERS}
    setHandler={this.changeHandler}
/>
```

It uses an array of presets:
```JSX
const SETTERS = [
    {
        text: 'Default values',
        params: {
            [IDS.firstStateParameter]: 1,
            [IDS.secondStateParameter]: 'second',
        },
    },
    {
        text: 'This text will be used as a label',
        params: {
            [IDS.firstStateParameter]: 'first',
            [IDS.secondStateParameter]: 2,
        },
    },
]
```

It's good idea to use preset as a default state:
```JSX
class Demo extends Component {
    state = SETTERS[0]

    ...
}
```

## Properties

### Common for control components

#### `id`: PropTypes.string.isRequired
Name of property of state and identifier for element.

#### `state`: PropTypes.object
State that we want to change.

#### `label`: PropTypes.string
Label for the element.

#### `value`: PropTypes.oneOfType(string, number, bool)
Value will be used instead of state[id] if passed.

#### `readOnly`: PropTypes.bool
Control read only.

#### `className`: PropTypes.string
Classname passed to wrapper div tag.

#### `onClick`: PropTypes.func
Handler for onClick event.

#### `onFocus`: PropTypes.func
Handler for onFocus event.


**Important:** Handler for event will be called with input component as argument. Example for selecting all on focus:
```JSX
handleFocus = (control) => control.setSelectionRange(0, control.value.length)
```

### <Input \/>

#### `multiLine`: PropTypes.bool
Flag can change input tag to textarea.

#### `defaultNum`: PropTypes.number
Number will replace empty value if passed. Use it if you need default numeric values.

#### `decimalMark`: PropTypes.string
Symbol to use as decimal mark.


### <Check \/>
No special properties.

### <Radio \/>

#### `values`: PropTypes.array
Array of available values.


## Using with Redux

This integration is not very well made, but can be used.

For the beginning create a mapping for identifiers and paths in store:
```JSX
const IDS = {
    parameter: 'firstReducer.parameter',
    anotherParameter: 'secondReducer.parameter',
}
```

There's two new helpers:
```JSX
import { extendConnection, mapStateToIds } from 'state-control'
```

Use first helper to add mapped identifiers to connected props:
```JSX
mapStateToProps = extendConnection((state) => ({
    thirdParam: state.firstReducer.anotherParameter,
}), IDS)
```

And second helper for pick out props:
```JSX
<Connector
    state={mapStateToIds(this.props, IDS)}
    onChange={this.changeHandler}
/>
```

In addition, of course, you need appropriate actions and reducers. Example of action:
```JSX
import _ from 'lodash'

export const setState = (name, value) => ({
    type: types.SET_STATE,
    data: { [name]: value },
})
```

And reducer:
```JSX
export default function (state, action) {
    switch (action.type) {
        case types.SET_STATE:
            return _.extend({}, state, action.data.firstReducer)
        default:
            return state
    }
}
```

## More examples of state-control
* [Zero Packer](https://github.com/bouvens/zero-packer)
* [Red Squares](https://github.com/bouvens/red-squares)

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square
[npm]: https://www.npmjs.org/package/state-control

[npm-dt-badge]: https://img.shields.io/npm/dt/state-control.png?style=flat-square

[issues-badge]: https://img.shields.io/github/issues/bouvens/state-control.svg?style=flat-square
[issues]: https://github.com/bouvens/state-control/issues
