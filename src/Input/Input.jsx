import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import { NUMBER_COLOR_TYPE, VALUE_TYPE } from '../common/constants'
import { restoreSelection, saveSelection } from '../common/utils'
import controlled from '../common/controlled'

const Wrapper = styled.div`
    margin-bottom: 0.7em;
`

const Label = styled.label`
    display: inline-block;
    padding-right: 0.3em;
`
const Suffix = styled.span`
    padding-left: 0.3em;
`

const defaultNumberColor = '#cfffcf'

class Input extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    className: '',
    label: '',
    suffix: '',
    refHandler: _.noop,
    onClick: _.noop,
    onFocus: _.noop,
    onChange: _.noop,
    value: '',
    multiLine: false,
    readOnly: false,
    numberColor: false,
  }

  Inner = styled[this.props.multiLine ? 'textarea' : 'input']`
        display: inline-block;
        height: ${() => (this.props.multiLine ? '5em' : 'auto')};
        vertical-align: ${() => (this.props.multiLine ? 'top' : 'inherit')};
        padding: 0.1em 0.2em;
        border: 1px solid darkgrey;
        background-color: ${() => {
    const { readOnly, numberColor } = this.props

    if (readOnly) {
      return '#eee'
    }
    if (numberColor) {
      return numberColor.length ? numberColor : defaultNumberColor
    }

    return 'white'
  }};
    `

  componentDidUpdate () {
    restoreSelection(this.target, this.selection)
  }

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
    const { className, label, refHandler, onFocus, ...passedProps } = this.props
    const { Inner } = this

    return (
      <Wrapper className={className}>
        <Label htmlFor={this.props.id}>{label}</Label>
        <Inner
          ref={this.handleRef(refHandler(this))}
          onFocus={this.eventHandler(onFocus)}
          {...passedProps}
        />
        <Suffix>{this.props.suffix}</Suffix>
      </Wrapper>
    )
  }
}

export default controlled(Input)
