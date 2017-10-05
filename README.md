# React state control &middot; [![npm][npm-badge]][npm] [![npm][npm-dt-badge]][npm] [![GitHub issues][issues-badge]][issues]

A bunch of lightweight components for simply changing state of stateful root component. It fits to strings, numbers (automatically detected) as `<Input />`, booleans as `<Check />` and sets of values as `<Radio />`.

This package also provides component for presets of values (`<SettersBlock />`) and helper to reduce your source code size (`<Connector />`). It can be even used with Redux (see below).

## [Demo](https://bouvens.github.io/state-control/)

You can see live demo at [https://bouvens.github.io/state-control/](https://bouvens.github.io/state-control/)
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

<dl>
    <dt>id</dt>
    <dd>Is a name of property of state and identifier for element.</dd>
    <dt>state</dt>
    <dd>Is a state that we want to change.</dd>
    <dt>value</dt>
    <dd>Will be used instead of state[id] if passed.</dd>
    <dt>readOnly</dt>
    <dd>Is control read only.</dd>
    <dt>className</dt>
    <dd>Is passed to wrapper div tag.</dd>
    <dt>onClick</dt>
    <dd>Is a handler for onClick event.</dd>
    <dt>onFocus</dt>
    <dd>Is a handler for onFocus event.</dd>
</dl>

#### Important
Handler for event will be called with input component as argument. Example for selecting all on focus:
```JSX
handleOnFocus = (control) => control.setSelectionRange(0, control.value.length)
```

### <Input \/>
<dl>
    <dt>label</dt>
    <dd>Is a label for the element.</dd>
    <dt>multiLine</dt>
    <dd>Can change input tag to textarea.</dd>
    <dt>defaultNum</dt>
    <dd>Will replace empty value if passed. Use it if you need default numeric values.</dd>
    <dt>decimalMark</dt>
    <dd>Is a symbol to use as decimal mark.</dd>
</dl>

### <Check \/>
<dl>
    <dt>label</dt>
    <dd>Is a label for the element.</dd>
</dl>

### <Radio \/>
<dl>
    <dt>label</dt>
    <dd>Is a label for the element.</dd>
    <dt>values</dt>
    <dd>Is an array of available values.</dd>
</dl>

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

## More examples of state control
* [Zero Packer](https://github.com/bouvens/zero-packer)
* [Red Squares](https://github.com/bouvens/red-squares)

## Changelog

#### 0.9.0
Label prop added to `<Radio />`.

#### 0.8.0
Removing of symbols `,`, `'`, `’` added for `.` as decimal mark and `.`, spaces for ','. It helps on pasting in `<Input />` numbers like `5,000,777.15`.

#### 0.7.2
`<Input />` fixed for float numbers like `3.02`.

#### 0.7.1
Packages updated (including React 16.0.0).

#### 0.7.0
Click and focus handlers updated. Code linted. `.eslintrc.js` file added.

#### 0.6.5
Event handlers fixed.

#### 0.6.4
Warning about switching between controlled and uncontrolled component fixed.

#### 0.6.3
Loosing focus fixed.

#### 0.6.2
Typo fixed.

#### 0.6.1
Style of `<Input />` fixed.

#### 0.6.0
Nasty global CSS removed, styled-components are in use.

#### 0.5.2
Readme updated, changelog added.

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square
[npm]: https://www.npmjs.org/package/state-control

[npm-dt-badge]: https://img.shields.io/npm/dt/state-control.png?style=flat-square

[issues-badge]: https://img.shields.io/github/issues/bouvens/state-control.svg?style=flat-square
[issues]: https://github.com/bouvens/state-control/issues
