import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import controlled from '../common/controlled'

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
  }

  static defaultProps = {
    className: '',
    label: '',
    value: false,
    refHandler: _.noop,
    onClick: _.noop,
    onFocus: _.noop,
    readOnly: false,
  }

  render () {
    const { className, value, refHandler, onClick, onFocus, label, readOnly, ...passedProps } = this.props
    return (
      <div className={className}>
        <input
          type="checkbox"
          checked={value}
          ref={refHandler(this)}
          onClick={onClick(this)}
          onFocus={onFocus(this)}
          disabled={readOnly}
          {...passedProps}
          style={{
            marginBottom: '0.8em',
            marginLeft: '1px',
          }}
        />
        <label htmlFor={this.props.id}>{label}</label>
      </div>
    )
  }
}

export default controlled(Check)
