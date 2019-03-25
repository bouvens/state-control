import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import controlled from '../common/controlled'

const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

class Radio extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: valueType,
    values: PropTypes.arrayOf(valueType),
    refHandler: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    id: '',
    label: '',
    suffix: '',
    value: '',
    values: [],
    refHandler: _.noop,
    onClick: _.noop,
    onFocus: _.noop,
    readOnly: false,
  }

  render () {
    const {
      className,
      id,
      label,
      suffix,
      values,
      value,
      refHandler,
      onClick,
      onFocus,
      readOnly,
      ...passedProps
    } = this.props

    return (
      <div className={className} id={id} style={{ marginBottom: '0.8em' }}>
        {label}
        {values.map((currentValue) => {
          const variantId = `${id}-${currentValue}`

          return (
            <div key={variantId}>
              <input
                id={variantId}
                name={id}
                type="radio"
                checked={value === currentValue}
                value={currentValue}
                ref={refHandler(this)}
                onClick={onClick(this)}
                onFocus={onFocus(this)}
                disabled={readOnly}
                style={{ margin: '3px 3px 2px 5px' }}
                {...passedProps}
              />
              <label htmlFor={variantId}>{currentValue.label || currentValue}</label>
            </div>
          )
        })}
        {suffix}
      </div>
    )
  }
}

export default controlled(Radio)
