import React from 'react'
import PropTypes from 'prop-types'
import { NUMBER_COLOR_TYPE } from '../common/constants'
import controlled from '../common/controlled'
import { noop } from '../common/utils'

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
    numberColor: NUMBER_COLOR_TYPE,
  }

  static defaultProps = {
    className: '',
    id: '',
    label: '',
    suffix: '',
    value: '',
    values: [],
    refHandler: noop,
    onClick: noop,
    onFocus: noop,
    readOnly: false,
    numberColor: false,
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
      numberColor,
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
