/*
import React from 'react'
import { render } from 'enzyme'
import Check from '../Check'

const IDS = {
  isReadonly: 'isReadonly',
  withDefault: 'withDefault',
  number: 'number',
  string: 'string',
  divider: 'divider',
  decimalMark: 'decimalMark',
}

const DIVIDERS = [2, 4, 8, 10]

const DECIMAL_MARKS = ['.', ',', '·']

const STATE = {
  isReadonly: false,
  withDefault: true,
  number: 2,
  string: 'text',
  plus: 3.6,
  multiplyTo: 4,
  [IDS.divider]: DIVIDERS[0],
  [IDS.decimalMark]: DECIMAL_MARKS[0],
}

describe('Check', () => {
  const checks = (
    <div>
      <Check
        id={IDS.isReadonly}
        state={STATE}
      />
      <Check
        id={IDS.withDefault}
        state={STATE}
      />
    </div>
  )
  const wrapper = render(checks)

  it('is exported correctly', () => {
    expect(Check).toBeDefined()
  })

  it('show falsy value', () => {
    expect(wrapper.find(`input[type="checkbox"][id="labeled-control-${IDS.isReadonly}"]`)
    .prop('checked')).toBeFalsy()
  })

  it('show truthy value', () => {
    expect(wrapper.find(`input[type="checkbox"][id="labeled-control-${IDS.withDefault}"]`)
    .prop('checked')).toBeTruthy()
  })
})
*/
