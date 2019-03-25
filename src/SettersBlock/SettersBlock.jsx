import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Setter = ({ text, tabIndex, onClick }) => (
  <div style={{ marginBottom: '0.6em' }}>
    <a
      role="button"
      onClick={onClick}
      tabIndex={tabIndex}
      style={{
        paddingBottom: '1px',
        borderBottom: '1px dashed',
        cursor: 'pointer',
        color: 'blue',
      }}
    >
      {text}
    </a>
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
  onClick: _.noop,
}

const setParams = (setHandler, params) => () => {
  _.each(params, (value, name) => {
    setHandler(name, value)
  })
}

export const SettersBlock = ({ className, setters, setHandler, tabIndexOffset }) => {
  let index = 0
  const settersArray = _.isArray(setters)
    ? setters.map((setter) => [
      setter.text,
      setter.params,
    ])
    : _.toPairs(setters)

  return (
    <div className={className}>
      {settersArray.map((setter) => {
        index += 1

        return (
          <Setter
            onClick={setParams(setHandler, setter[1])}
            key={index}
            tabIndex={index + tabIndexOffset}
            text={setter[0]}
          />
        )
      })}
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
