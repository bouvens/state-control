/* eslint-disable react/require-default-props */
// defaultProps doesn't working properly on proxy components
// but proxy component is convinient in this case
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])

const defaults = {
    onChange: _.noop,
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
        .replace(',', '.')

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
            valueForReturn = valueForCheck
            if (valueForReturn.toString()[valueForReturn.toString().length - 1] !== '.') {
                const parseFunc = valueForReturn.indexOf('.') === -1 ? parseInt : parseFloat

                valueForReturn = parseFunc(valueForReturn, 10) || this.props.defaultNum || 0
            } else {
                valueForReturn = this.formatNum(valueForReturn)
            }
        }

        (this.props.onChange || defaults.onChange)(this.getPath(), valueForReturn)
    }

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
        that.control = control
    }

    render () {
        const passedProps = _.omit(this.props, ['id', 'state', 'path', 'value', 'defaultNum', 'onChange', 'decimalMark'])

        return (
            <Child
                {...passedProps}
                id={this.getId()}
                value={this.showValue()}
                onChange={this.changeHandler}
                refHandler={this.refHandler}
            />
        )
    }
}

export default controlled
