import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import controlled from '../../common/controlled'
import { noOperation } from '../../common/utils'
import './Input.css'

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
        refHandler: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
        multiLine: false,
    }

    render () {
        const { multiLine, className, label, refHandler, onClick, onFocus, ...passedProps } = this.props
        const Inner = multiLine ? 'textarea' : 'input'

        return (
            <div className={classNames('state-control-input', className)}>
                <label htmlFor={this.props.id}>{label}</label>
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
