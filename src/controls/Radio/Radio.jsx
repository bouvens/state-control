import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import controlled from '../../common/controlled'
import { noOperation } from '../../common/utils'
import './Radio.css'

class Radio extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        values: PropTypes.array,
        refHandler: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
    }

    static defaultProps = {
        id: '',
        value: '',
        values: [],
        refHandler: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
    }

    render () {
        const { className, id, values, value, refHandler, onClick, onFocus, ...passedProps } = this.props
        return (<div className={classNames('state-control-radio-group', className)} id={id}>
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
        </div>)
    }
}

export default controlled(Radio)
