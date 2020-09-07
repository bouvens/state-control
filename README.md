# React state-control
[![npm][npm-badge]][npm] [![npm][npm-dt-badge]][npm] [![GitHub issues][issues-badge]][issues]

A bunch of lightweight components for updating the model stored in React's stateful components for fast prototyping. Complete library weights 4.2 KB gzipped with dependencies. It fits strings, numbers (automatically detected) as `<Input />`, booleans as `<Check />`, and sets of values as `<Radio />`.

This package also provides a component for presets of values (`<PresetsBlock />`) and a helper to simplify your source code (`<Connector />`).

## [Demo](https://bouvens.github.io/state-control/)

You can see a live demo at [https://bouvens.github.io/state-control/](https://bouvens.github.io/state-control/)
The source code of this demo is available in [the repository](https://github.com/bouvens/state-control/blob/master/demo/src).

# Complete guide in 5 minutes

## Quickstart in 3 steps

1st. Install the package to your project:
```Shell
npm i state-control
```

Include required components and helpers to jsx:
```JSX
import { Check, Connector, Input, Radio, PresetsBlock, selectAll } from 'state-control'
```

2nd. You may also need an object of identifiers:
```JSX
const IDS = {
  firstStateParameter: 'firstStateParameter',
  secondStateParameter: 'secondStateParameter',
}
```

Use identifiers as names in state and add a `changeHandler(name, value)`:
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

3rd. All together now. Use identifiers as `id` property of a component matching type you want (Use `<Input />` for strings an numbers). ID connects it to the corresponding property of state:
```JSX
render () {
  return (
    <Input
      state={this.state}
      onChange={this.changeHandler}
      id={IDS.firstStateParameter}
      label="First state parameter"
    />
  )
}
```

That's it!

## <Connector \/>
You can use `Connector` component for passing common props to all of its children:
```JSX
<Connector
  state={this.state}
  onChange={this.changeHandler}
>
  <Input
    id={IDS.firstStateParameter}
    label="First state parameter"
  />
  <Input
    id={IDS.secondStateParameter}
    label="Second state parameter"
  />
</Connector>
```

## <PresetsBlock \/>
This component generates elements that look like a button for activation of presets:
```JSX
<PresetsBlock
  setters={SETTERS}
  setHandler={this.changeHandler}
/>
```

It uses an array of presets:
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

It also accepts an alternative shape of presets:
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

> It's a good idea to use one of presets as a default state:
> ```JSX
> class Demo extends Component {
>   state = SETTERS.Default
>
>   // For the alternative shape there will be
>   // state = SETTERS[0].params
>
>   ...
> }
> ```

## Properties

### Common for control components

#### `id`: PropTypes.string.isRequired
Name of property in state and identifier for an element.

#### `state`: PropTypes.object
State object that we want to change.

#### `label`: PropTypes.string
Label for an element. It may be a node in `<Radio />`.

#### `value`: PropTypes.oneOfType(string, number, bool)
A value to be used instead of state[id] if passed.

#### `readOnly`: PropTypes.bool
Sets read-only of control.

#### `className`: PropTypes.string
Classname passed to a wrapping div tag.

#### `style`: PropTypes.object
Overrides default styles or resets it on `style={{}}`.

#### `onClick`: PropTypes.func
Handler for onClick event.

#### `onFocus`: PropTypes.func
Handler for an onFocus event. The function will be called with an input component as an argument.

> Example for selecting all on focus:
> ```JSX
> selectAll = (control) => {
>   control.setSelectionRange(0, control.value.length)
> }
>
> // or just include and use predefined handler
> import { selectAll } from 'state-control'
> <Input
>   onFocus={selectAll}
>   ...
> />
> ```

### <Input \/>

#### `suffix`: PropTypes.string
Text for showing after input field.

#### `multiLine`: PropTypes.bool
Flag changes an `input` tag to a `textarea`.

#### `defaultNum`: PropTypes.number
Number replaces empty value if passed. Use it if you need to set default numeric values.

#### `thousandsSeparator`: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
Symbol or array of symbols for using as digit group separators for removing. I.e. `,` in `17,234.55`. All of them will be removed.

#### `decimalMark`: PropTypes.string
Pass here a symbol for using as a decimal mark. I.e. `.` in `17,234.55`. It will be replaced by `.` in state because of JS number format.

#### `alternateDecimalMark`: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
Symbol or array of symbols for replacing to decimal mark after removing all thousands separators symbols.

#### `numberColor`: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
String for background color or just flag for coloring fields where numbers had been parsed. It makes an implicit explicit.

#### `trimOnPaste`: PropTypes.bool
Flag turns on trimming spaces, tabs, and newline characters on paste. It also removes trailing zeros (after a decimal separator) on numbers pasting. True by default.

> All other props will be passed to an inner element, and specifically to `<input />`. So type may be passed for entering only integer numbers:
> ```
> <Input
>   type="number"
>   ...
> />
> ```

### <Check \/>
No special properties.

### <Radio \/>

#### `values`: PropTypes.array
An array of available values.

#### `suffix`: PropTypes.oneOfType(string, node)
Text for showing after radio buttons.

## How to run locally

Run in bash:
```Shell
git clone git@github.com:bouvens/state-control.git
cd state-control
yarn install
yarn run start
```

Then open [http://localhost:3000](http://localhost:3000)

For sure, you can use `npm` instead of `yarn`. More scripts may be found in [package.json](https://github.com/bouvens/state-control/blob/master/package.json).

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
