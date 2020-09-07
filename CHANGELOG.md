# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## 2.1.2 (September 7, 2020)
* Getting rid of warning about `React.createFactory()` deprecation and one dependency.
* Dependencies updates.

## 2.1.1 (September 2, 2020)
* `alternateDecimalMark` and `thousandsSeparator` properties now work properly with strings and arrays.
* The documentation updates.

## 2.1.0 (May 17, 2020)
* <SettersBlock /> has been renamed to <PresetsBlock />, old name is available as alias.
* Paste now does not replace the whole value.
* `selectAll` helper works with any input with `setSelectionRange` property.
* Read me updates.

## 2.0.6 (May 10, 2020)
* Fix for rewriting of input type in <Check />

## 2.0.5 (April 30, 2020)
* Fix for decimal separators which is absent in the default.
* Decimal separators are extended.
* Dependencies updates.
* Updates and fixes in the packaging process.

## 2.0.4 (January 25, 2020)
* The input of not numbers like dates was fixed.

## 2.0.2 (June 5, 2019)
* Dependencies updates.

## 2.0.1 (April 6, 2019)
* String paths with dots and array paths are acceptable again.

## 2.0.0 (March 31, 2019)
**Breaking:**
* Default styles made inline, thus if you want to reset it, pass empty `style` property.
* Small redux helpers (`extendConnection` and `mapStateToIds`) were removed. These can be added directly to a project from [history](https://github.com/bouvens/state-control/blob/73e8e304b5cb331871e2246d26800a511f7bfd51/src/helpers.js) if needed.

**Other:**
* Setters looks like buttons because of they weren't real links ever.
* Size was reduced by ~94% (from 78.32 KB to 4.42 KB) minified and gzipped.

## 1.10.1 (December 15, 2018)
* Just a readme updates

## 1.10.0 (December 1, 2018)
* Selection is saved now on clicks, focus, and keyboard events if state updating continuously
* Selection is saved instead of caret position
* Dependencies updates

## 1.9.0 (October 21, 2018)
* Updates for <React.StrictMode />
* Fix for zeros' trimming on pasting numbers like 3.6020
* Dependencies updates
* Code reformatting

## 1.8.0 (May 19, 2018)
* `trimOnPaste` property expanded with removing of insignificant zeros on the end of a number

## 1.7.2 (April 21, 2018)
* Replaces of thousand separators fixed

## 1.7.1 (April 21, 2018)
* Build fixed

## 1.7.0 (April 8, 2018)
* `trimOnPaste` property added

## 1.6.1 (April 1, 2018)
* Misspelling fixed

## 1.6.0 (April 1, 2018)
* It's possible now to import separate components like `import Input from 'state-control/lib/Input'`

## 1.5.1 (March 25, 2018)
* Caret moving to the end of the input field on automatic replaces and removes fixed
* Name added to `controlled()` HOC for easy debugging
* Dependencies is updated

## 1.5.0 (December 17, 2017)
* `suffix` property added
* More unit tests had been written

## 1.4.1 (December 9, 2017)
* Look of `<Input />` with background color improved
* `readOnly` prop in `<Check />` and `<Radio />` fixed

## 1.4.0 (December 9, 2017)
* Add `numberColor` property

## 1.3.2 (December 3, 2017)
* Bug fix

## 1.3.0 (November 9, 2017)
* Add `selectAll` handler

## 1.2.0 (November 4, 2017)
* Object setters allowed

## 1.1.1 (October 28, 2017)
* Text input fixed

## 1.1.0 (October 28, 2017)
* Alternate decimal marks supported now, that can be useful on values pasting from a clipboard.
* Also
    * `<Connector />` assepts one node now
    * Eslint style updated

## 1.0.1 (October 15, 2017)
* Not fully controlled state is acceptable now. Packages updated.

## 1.0.0 (October 5, 2017)
* First stable version. README updated.

## 0.9.0
Label prop added to `<Radio />`.

## 0.8.0
Removing of symbols `,`, `'`, `’` added for `.` as decimal mark and `.`, spaces for `,`. It helps on pasting in `<Input />` numbers like `5,000,777.15`.

## 0.7.2
`<Input />` fixed for float numbers like `3.02`.

## 0.7.1
Packages updated (including React 16.0.0).

## 0.7.0
Click and focus handlers updated. The code is linted. `.eslintrc.js` file added.

## 0.6.5
Event handlers fixed.

## 0.6.4
Warning about switching between controlled and uncontrolled component fixed.

## 0.6.3
Losing focus fixed.

## 0.6.2
Typo fixed.

## 0.6.1
Style of `<Input />` fixed.

## 0.6.0
Nasty global CSS removed, styled-components are in use.

## 0.5.2
Readme updated, changelog added.
