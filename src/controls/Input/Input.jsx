import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import { VALUE_TYPE } from '../../common/constants'
import controlled from '../../common/controlled'

const Wrapper = styled.div`
    margin-bottom: 0.7em;
`

const Label = styled.label`
    display: inline-block;
    padding-right: 0.3em;
`

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
    }

    static defaultProps = {
        className: '',
        label: '',
        refHandler: _.noop,
        onClick: _.noop,
        onFocus: _.noop,
        value: '',
        multiLine: false,
    }

    Inner = styled[this.props.multiLine ? 'textarea' : 'input']`
        background-color: ${({ readOnly }) => (readOnly ? '#eee' : 'white')};
        display: inline-block;
        height: ${() => (this.props.multiLine ? '5em' : 'auto')};
        vertical-align: ${() => (this.props.multiLine ? 'top' : 'inherit')};
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
