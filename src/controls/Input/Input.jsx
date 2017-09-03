import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import controlled from '../../common/controlled'

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
        multiLine: PropTypes.bool,
    }

    static defaultProps = {
        className: '',
        label: '',
        refHandler: _.noop,
        onClick: _.noop,
        onFocus: _.noop,
        multiLine: false,
    }

    render () {
        const { multiLine, className, label, refHandler, onClick, onFocus, ...passedProps } = this.props
        const Inner = styled[multiLine ? 'textarea' : 'input']`
            margin-bottom: 0.7em;
            background-color: ${({ readOnly }) => readOnly ? '#eee' : 'transparent'};
            display: inline-block;
            height: ${() => (multiLine ? '5em' : 'auto')};
            vertical-align: ${() => (multiLine ? 'top' : 'inherit')};
        `

        return (
            <div className={className}>
                <Label htmlFor={this.props.id}>{label}</Label>
                <Inner
                    ref={refHandler(this)}
                    onClick={onClick(this)}
                    onFocus={onFocus(this)}
                    {...passedProps}
                />
            </div>
        )
    }
}

export default controlled(Input)
