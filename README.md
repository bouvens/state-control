# React state-control &middot; [![npm][npm-badge]][npm] [![npm][npm-dt-badge]][npm] [![GitHub issues][issues-badge]][issues]

A bunch of lightweight components for updating model stored in React’s stateful components for fast prototyping. It fits to strings, numbers (automatically detected) as `<Input />`, booleans as `<Check />` and sets of values as `<Radio />`.

This package also provides component for presets of values (`<SettersBlock />`) and helper to reduce your source code size (`<Connector />`). It can be even used with Redux (see below).

## [Demo](https://bouvens.github.io/state-control/)

You are able to see live demo at [https://bouvens.github.io/state-control/](https://bouvens.github.io/state-control/)
Source code of this demo is available in [the repository](https://github.com/bouvens/state-control/blob/master/demo/src/index.js).

## Quick start

Install package to your project:
```Shell
npm i state-control
```

Include required components and helpers to jsx:
```JSX
import { Check, Connector, Input, Radio, SettersBlock, selectAll } from 'state-control'
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

It uses an object of presets:
```JSX
const SETTERS = [
    Default: {
        [IDS.firstStateParameter]: 1,
        [IDS.secondStateParameter]: 'second',
    },
    'This text will be used as a label': {
        [IDS.firstStateParameter]: 'first',
        [IDS.secondStateParameter]: 2,
    },
]
```

It also accepts array of presets:
```JSX
const SETTERS = [
    {
        text: 'Default',
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

> It's good idea to use preset as a default state:
> ```JSX
> class Demo extends Component {
>     state = SETTERS.Default
>
>     // For array setters there will be
>     // state = SETTERS[0].params
>
>     ...
> }
> ```

## Properties

### Common for control components

#### `id`: PropTypes.string.isRequired
Name of property of state and identifier for element.

#### `state`: PropTypes.object
State that we want to change.

#### `label`: PropTypes.string
Label for the element. It able to have a node type in `<Radio />`.

#### `value`: PropTypes.oneOfType(string, number, bool)
Value will be used instead of state[id] if passed.

#### `readOnly`: PropTypes.bool
Control read only.

#### `className`: PropTypes.string
Classname passed to wrapper div tag.

#### `onClick`: PropTypes.func
Handler for onClick event.

#### `onFocus`: PropTypes.func
Handler for onFocus event. Handler will be called with input component as argument.

> Example for selecting all on focus:
> ```JSX
> handleFocus = (control) => control.setSelectionRange(0, control.value.length)
>
> // or just include and use prepared handler
> import { selectAll } from 'state-control'
> <Input
>     onFocus={selectAll}
>     ...
> />
> ```

### <Input \/>

#### `suffix`: PropTypes.string
Text for showing after input field.

#### `multiLine`: PropTypes.bool
Flag can change input tag to textarea.

#### `defaultNum`: PropTypes.number
Number will replace empty value if passed. Use it if you need default numeric values.

#### `decimalMark`: PropTypes.string
Symbol for using as decimal mark.

#### `thousandsSeparator`: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
Symbol or array of symbols for using as thousands separator for removing.

#### `alternateDecimalMark`: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
Symbol or array of symbols for replacing to decimal mark after removing all thousand separator symbols.

#### `numberColor`: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
String for background color or just flag for coloring fields where numbers had been parsed. It makes the implicit explicit.

> All props will be passed to an inner element, and specifically to `<input />`. So type may be passed for entering only integer numbers:
> ```
> <Input
>     type="number"
>     ...
> />
> ```

### <Check \/>
No special properties.

### <Radio \/>

#### `values`: PropTypes.array
Array of available values.

#### `suffix`: PropTypes.oneOfType(string, node)
Text for showing after radio buttons.

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
* [Griffeath’s machine](https://github.com/bouvens/griffeath-machine)
* [RGB Filter](https://github.com/bouvens/rgb-filter)

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square
[npm]: https://www.npmjs.org/package/state-control

[npm-dt-badge]: https://img.shields.io/npm/dt/state-control.png?style=flat-square

[issues-badge]: https://img.shields.io/github/issues/bouvens/state-control.svg?style=flat-square
[issues]: https://github.com/bouvens/state-control/issues
