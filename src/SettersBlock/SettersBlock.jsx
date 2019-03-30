import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../common/utils'

const Setter = ({ text, tabIndex, onClick }) => (
  <div style={{ marginBottom: '0.6em' }}>
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {text}
    </button>
  </div>
)

Setter.propTypes = {
  text: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
}

Setter.defaultProps = {
  text: '',
  tabIndex: -1,
  onClick: noop,
}

const setParams = (setHandler, params) => () => {
  Object.entries(params).forEach(([name, value]) => {
    setHandler(name, value)
  })
}

export const SettersBlock = ({ className, setters, setHandler, tabIndexOffset }) => {
  const settersArray = Array.isArray(setters)
    ? setters.map((setter) => [
      setter.text,
      setter.params,
    ])
    : Object.entries(setters)

  return (
    <div className={className}>
      {settersArray.map(([text, params], index) => (
        <Setter
          onClick={setParams(setHandler, params)}
          key={text}
          tabIndex={index + tabIndexOffset}
          text={text}
        />
      ))}
    </div>
  )
}

SettersBlock.propTypes = {
  className: PropTypes.string,
  setters: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setHandler: PropTypes.func.isRequired,
  tabIndexOffset: PropTypes.number,
}

SettersBlock.defaultProps = {
  className: '',
  tabIndexOffset: 1,
}
