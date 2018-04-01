import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import controlled from '../common/controlled'

const Wrapper = styled.div`
    margin-bottom: 0.8em;
`

const Input = styled.input`
    margin: 3px 3px 2px 5px;
`

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
            <Wrapper className={className} id={id}>
                {label}
                {values.map((currentValue) => {
                    const variantId = `${id}-${currentValue}`

                    return (
                        <div key={variantId}>
                            <Input
                                id={variantId}
                                name={id}
                                type="radio"
                                checked={value === currentValue}
                                value={currentValue}
                                ref={refHandler(this)}
                                onClick={onClick(this)}
                                onFocus={onFocus(this)}
                                disabled={readOnly}
                                {...passedProps}
                            />
                            {/* eslint-disable jsx-a11y/label-has-for */}
                            <label htmlFor={variantId}>{currentValue.label || currentValue}</label>
                        </div>
                    )
                })}
                {suffix}
            </Wrapper>
        )
    }
}

export default controlled(Radio)
