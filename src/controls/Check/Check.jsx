import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import controlled from '../../common/controlled'
import { noOperation } from '../../common/utils'
import './Check.css'

class Check extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        refHandler: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        label: '',
        refHandler: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
    }

    render () {
        const { className, value, refHandler, onClick, onFocus, label, ...passedProps } = this.props
        return (
            <div className={classNames('state-control-checkbox', className)}>
                <input
                    type="checkbox"
                    checked={value}
                    ref={refHandler(this)}
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
