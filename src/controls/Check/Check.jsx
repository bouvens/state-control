import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import controlled from '../../common/controlled'

const Input = styled.input`
    margin-bottom: 0.8em;
    margin-left: 1px;
`

class Check extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.bool,
        refHandler: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        label: '',
        value: false,
        refHandler: _.noop,
        onClick: _.noop,
        onFocus: _.noop,
    }

    render () {
        const { className, value, refHandler, onClick, onFocus, label, ...passedProps } = this.props
        return (
            <div className={className}>
                <Input
                    type="checkbox"
                    checked={value}
                    innerRef={refHandler(this)}
                    onClick={onClick(this)}
                    onFocus={onFocus(this)}
                    {...passedProps}
                />
                <label htmlFor={this.props.id}>{label}</label>
            </div>
        )
    }
}

export default controlled(Check)
