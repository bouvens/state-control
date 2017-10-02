/* eslint-disable react/require-default-props */
// defaultProps don't work properly on proxy components
// but proxy component is convenient in this case
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])

const defaults = {
    onChange: _.noop,
    onClick: _.noop,
    onFocus: _.noop,
    decimalMark: '.',
}

const controlled = (Child) => class extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        state: PropTypes.objectOf(valueType),
        path: PropTypes.string,
        value: valueType,
        values: PropTypes.arrayOf(valueType),
        defaultNum: PropTypes.number,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        decimalMark: PropTypes.string,
    }

    getId = () => `labeled-control-${this.props.id}`

    getPath = () => this.props.path || this.props.id

    getValue = () => {
        if (!_.isUndefined(this.props.value)) {
            return this.props.value
        }

        return _.get(this.props.state, this.getPath())
    }

    prepareNum = (num) => num
        .replace(' ', '')
        .replace(this.props.decimalMark || defaults.decimalMark, '.')

    changeHandler = (event) => {
        let valueForReturn = event.target.value
        const { checked } = event.target
        const previousType = typeof this.getValue()

        if (previousType === 'boolean') {
            (this.props.onChange || defaults.onChange)(this.getPath(), checked)

            return
        }

        const valueForCheck = this.prepareNum(valueForReturn)

        if ((!isNaN(valueForCheck) && valueForCheck.length)
            || (previousType === 'number' && !valueForCheck.length && this.props.defaultNum)) {
            if (!/(\.|\.[0-9]*0)$/.test(valueForCheck)) {
                const parseFunc = /\./.test(valueForCheck) ? parseFloat : parseInt

                valueForReturn = parseFunc(valueForCheck, 10) || this.props.defaultNum || 0
            }
        }

        (this.props.onChange || defaults.onChange)(this.getPath(), valueForReturn)
    }

    clickHandler = (that) => () => (this.props.onClick || defaults.onClick)(that.control)

    focusHandler = (that) => () => (this.props.onFocus || defaults.onFocus)(that.control)

    formatNum = (num = this.getValue()) => num.toString().replace('.', this.props.decimalMark || defaults.decimalMark)

    showValue = () => {
        const value = this.getValue()

        switch (typeof value) {
            case 'number':
                return this.props.values ? value : this.formatNum()
            case 'boolean':
            case 'string':
                return value
            default:
                return _.isUndefined(value) ? value : value.toString()
        }
    }

    refHandler = (that) => (control) => {
        // The parameter reassign is needed for simplifying controlled components
        // eslint-disable-next-line no-param-reassign
        that.control = control
    }

    render () {
        const passedProps = _.omit(this.props, [
            'id',
            'state',
            'path',
            'value',
            'defaultNum',
            'onChange',
            'onClick',
            'onFocus',
            'decimalMark',
        ])

        return (
            <Child
                {...passedProps}
                id={this.getId()}
                value={this.showValue()}
                onChange={this.changeHandler}
                onClick={this.clickHandler}
                onFocus={this.focusHandler}
                refHandler={this.refHandler}
            />
        )
    }
}

export default controlled
