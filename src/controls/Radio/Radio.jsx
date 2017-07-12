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
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        refHandler: PropTypes.func,
    }

    static defaultProps = {
        id: '',
        value: '',
        values: [],
        readOnly: false,
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        refHandler: noOperation,
    }

    render () {
        return (<div className={classNames('state-control-radio-group', this.props.className)} id={this.props.id}>
            {this.props.values.map((currentValue) => {
                const variantId = currentValue.id || currentValue

                return (
                    <div key={variantId}>
                        <input
                            id={variantId}
                            name={this.props.id}
                            type="radio"
                            ref={this.props.refHandler(this)}
                            value={variantId}
                            checked={this.props.value === variantId}
                            readOnly={this.props.readOnly}
                            onChange={this.props.onChange}
                            onClick={this.props.onClick(this)}
                            onFocus={this.props.onFocus(this)}
                        />
                        <label htmlFor={variantId}>{currentValue.label || currentValue}</label>
                    </div>
                )
            })}
        </div>)
    }
}

export default controlled(Radio)
