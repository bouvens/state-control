import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import './Setter.css'

const Setter = ({ text, tabIndex, onClick }) => (
    <div className="state-control-setter">
        <a
            role="button"
            onClick={onClick}
            tabIndex={tabIndex}
        >
            {text}
        </a>
    </div>
)

Setter.propTypes = {
    text: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
}

Setter.defaultProps = {
    text: '',
    tabIndex: -1,
    onClick: _.noop,
}

const setParams = (setHandler, params) => () => {
    _.each(params, (value, name) => {
        setHandler(name, value)
    })
}

export const SettersBlock = ({ className, setters, setHandler, tabIndexOffset }) => {
    let index = 0

    return (<div className={classNames('setters-block', className)}>
        {setters.map((setter) => {
            index += 1

            return (<Setter
                onClick={setParams(setHandler, setter.params)}
                key={index}
                tabIndex={index + tabIndexOffset}
                text={setter.text}
            />)
        })}
    </div>)
}

SettersBlock.propTypes = {
    className: PropTypes.string,
    setters: PropTypes.array.isRequired,
    setHandler: PropTypes.func.isRequired,
    tabIndexOffset: PropTypes.number,
}

SettersBlock.defaultProps = {
    className: '',
    tabIndexOffset: 1,
}
