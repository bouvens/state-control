import React from 'react'
import { shallow } from 'enzyme'
import { Check, Connector, Input } from '../../..'

const IDS = {
  withDefault: 'withDefault',
  number: 'number',
}

const STATE = {
  withDefault: true,
  number: 2,
  plus: 3.6,
  multiplyTo: 4,
}

describe('Connector', () => {
  const connector = (
    <Connector state={STATE}>
      <Check id={IDS.withDefault} />
      <Input id={IDS.number} />
      {false &&
      <Input id={IDS.plus} />}
    </Connector>
  )
  const wrapper = shallow(connector)

  it('passes new props to children', () => {
    expect(wrapper.find(Check).props().state).toEqual(STATE)
    expect(wrapper.find(Input).props().state).toEqual(STATE)
  })

  it('saves own props of children', () => {
    expect(wrapper.find(Check).props().id).toEqual(IDS.withDefault)
    expect(wrapper.find(Input).props().id).toEqual(IDS.number)
  })
})
