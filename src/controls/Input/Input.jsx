import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import { NUMBER_COLOR_TYPE, VALUE_TYPE } from '../../common/constants'
import controlled from '../../common/controlled'

const Wrapper = styled.div`
    margin-bottom: 0.7em;
`

const Label = styled.label`
    display: inline-block;
    padding-right: 0.3em;
`

const defaultNumberColor = '#cfffcf'

class Input extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        refHandler: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        value: VALUE_TYPE,
        multiLine: PropTypes.bool,
        readOnly: PropTypes.bool,
        numberColor: NUMBER_COLOR_TYPE,
    }

    static defaultProps = {
        className: '',
        label: '',
        refHandler: _.noop,
        onClick: _.noop,
        onFocus: _.noop,
        value: '',
        multiLine: false,
        readOnly: false,
        numberColor: false,
    }

    Inner = styled[this.props.multiLine ? 'textarea' : 'input']`
        display: inline-block;
        height: ${() => (this.props.multiLine ? '5em' : 'auto')};
        vertical-align: ${() => (this.props.multiLine ? 'top' : 'inherit')};
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

    render () {
        const { className, label, refHandler, onClick, onFocus, value, ...passedProps } = this.props
        const { Inner } = this

        return (
            <Wrapper className={className}>
                <Label htmlFor={this.props.id}>{label}</Label>
                <Inner
                    innerRef={refHandler(this)}
                    onClick={onClick(this)}
                    onFocus={onFocus(this)}
                    value={value}
                    {...passedProps}
                />
            </Wrapper>
        )
    }
}

export default controlled(Input)
