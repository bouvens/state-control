import React from 'react'
import PropTypes from 'prop-types'
import { NUMBER_COLOR_TYPE, VALUE_TYPE } from '../common/constants'
import { noop, restoreSelection, saveSelection } from '../common/utils'
import controlled from '../common/controlled'

const defaultNumberColor = '#cfffcf'

class Input extends React.Component {
  componentDidUpdate () {
    restoreSelection(this.target, this.selection)
  }

  getInnerStyles = () => ({
    display: 'inline-block',
    height: this.props.multiLine ? '5em' : 'auto',
    verticalAlign: this.props.multiLine ? 'top' : 'inherit',
    padding: '0.1em 0.2em',
    border: '1px solid darkgrey',
    backgroundColor: (() => {
      const { readOnly, numberColor } = this.props

      if (readOnly) {
        return '#eee'
      }
      if (numberColor) {
        return numberColor.length ? numberColor : defaultNumberColor
      }
      return 'white'
    })(),
  })

  getSnapshotBeforeUpdate () {
    this.selection = saveSelection(this.target)
    return this.selection
  }

  handleRef = (cb) => (element) => {
    this.target = element
    cb(element)
  }

  eventHandler = (processor) => (event) => {
    processor(this)(event)
    this.selection = saveSelection(this.target)
  }

  render () {
    const { className, label, refHandler, onFocus, multiLine, numberColor,
      ...passedProps } = this.props
    const Inner = multiLine ? 'textarea' : 'input'

    return (
      <div className={className} style={{ marginBottom: '0.7em' }}>
        <label
          htmlFor={this.props.id}
          style={{
            display: 'inline-block',
            paddingRight: '0.3em',
          }}
        >
          {label}
        </label>
        <Inner
          ref={this.handleRef(refHandler(this))}
          onFocus={this.eventHandler(onFocus)}
          style={this.getInnerStyles()}
          {...passedProps}
        />
        <span style={{ paddingLeft: '0.3em' }}>{this.props.suffix}</span>
      </div>
    )
  }
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  suffix: PropTypes.string,
  refHandler: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: VALUE_TYPE,
  multiLine: PropTypes.bool,
  readOnly: PropTypes.bool,
  numberColor: NUMBER_COLOR_TYPE,
}

Input.defaultProps = {
  className: '',
  label: '',
  suffix: '',
  refHandler: noop,
  onClick: noop,
  onFocus: noop,
  onChange: noop,
  value: '',
  multiLine: false,
  readOnly: false,
  numberColor: false,
}

export default controlled(Input)
