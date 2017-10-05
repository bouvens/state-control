import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import controlled from '../../common/controlled'

const Wrapper = styled.div`
    margin-bottom: 0.8em;
`

const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

class Radio extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        value: valueType,
        values: PropTypes.arrayOf(valueType),
        refHandler: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        id: '',
        label: '',
        value: '',
        values: [],
        refHandler: _.noop,
        onClick: _.noop,
        onFocus: _.noop,
    }

    render () {
        const { className, id, label, values, value, refHandler, onClick, onFocus, ...passedProps } = this.props
        return (<Wrapper className={className} id={id}>
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
                            {...passedProps}
                        />
                        <label htmlFor={variantId}>{currentValue.label || currentValue}</label>
                    </div>
                )
            })}
        </Wrapper>)
    }
}

export default controlled(Radio)
