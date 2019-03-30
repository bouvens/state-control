import React from 'react'
import PropTypes from 'prop-types'
import { NUMBER_COLOR_TYPE } from '../common/constants'
import controlled from '../common/controlled'
import { noop } from '../common/utils'

class Check extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool,
    refHandler: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    numberColor: NUMBER_COLOR_TYPE,
  }

  static defaultProps = {
    className: '',
    label: '',
    value: false,
    refHandler: noop,
    onClick: noop,
    onFocus: noop,
    readOnly: false,
    numberColor: false,
  }

  render () {
    const { className, value, refHandler, onClick, onFocus, label, readOnly, numberColor, ...passedProps } = this.props
    return (
      <div className={className}>
        <input
          type="checkbox"
          checked={value}
          ref={refHandler(this)}
          onClick={onClick(this)}
          onFocus={onFocus(this)}
          disabled={readOnly}
          style={{
            marginBottom: '0.8em',
            marginLeft: '1px',
          }}
          {...passedProps}
        />
        <label htmlFor={this.props.id}>{label}</label>
      </div>
    )
  }
}

export default controlled(Check)
