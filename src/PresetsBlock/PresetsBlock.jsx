import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../common/utils'

const Preset = ({ text, tabIndex, onClick }) => (
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

Preset.propTypes = {
  text: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
}

Preset.defaultProps = {
  text: '',
  tabIndex: -1,
  onClick: noop,
}

const setParams = (setHandler, params) => () => {
  Object.entries(params).forEach(([name, value]) => {
    setHandler(name, value)
  })
}

export const PresetsBlock = ({ className, setters, setHandler, tabIndexOffset }) => {
  const settersArray = Array.isArray(setters)
    ? setters.map((setter) => [
      setter.text,
      setter.params,
    ])
    : Object.entries(setters)

  return (
    <div className={className}>
      {settersArray.map(([text, params], index) => (
        <Preset
          onClick={setParams(setHandler, params)}
          key={text}
          tabIndex={index + tabIndexOffset}
          text={text}
        />
      ))}
    </div>
  )
}

PresetsBlock.propTypes = {
  className: PropTypes.string,
  setters: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setHandler: PropTypes.func.isRequired,
  tabIndexOffset: PropTypes.number,
}

PresetsBlock.defaultProps = {
  className: '',
  tabIndexOffset: 1,
}
