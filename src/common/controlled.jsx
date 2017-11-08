/* eslint-disable react/require-default-props */
// defaultProps doesn't work properly on proxy components
// but proxy component is convenient in this case
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { VALUE_TYPE, MARK_TYPE } from './constants'

const DEFAULTS = {
    onChange: _.noop,
    onClick: _.noop,
    onFocus: _.noop,
    decimalMark: '.',
    thousandsSeparator: {
        '.': [',', '\'', '’'],
        ',': ' ',
    },
    alternateDecimalMark: ',',
}

// Helper function for using in _.reduce()
function replaceAll (from, to) {
    return (cleaned, char) => (
        typeof from === 'string'
            ? cleaned.concat(from === char ? to : char)
            : cleaned.concat(_.indexOf(from, char) === -1 ? char : to)
    )
}

const controlled = (Child) => class extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        // state may contain not controlled parameters too
        state: PropTypes.objectOf(PropTypes.any),
        path: PropTypes.string,
        value: VALUE_TYPE,
        values: PropTypes.arrayOf(VALUE_TYPE),
        defaultNum: PropTypes.number,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        decimalMark: PropTypes.string,
        thousandsSeparator: MARK_TYPE,
        alternateDecimalMark: MARK_TYPE,
    }

    getId = () => `labeled-control-${this.props.id}`

    getPath = () => this.props.path || this.props.id

    getValue = () => (
        !_.isUndefined(this.props.value)
            ? this.props.value
            : _.get(this.props.state, this.getPath())
    )

    getDecimalMark = () => this.props.decimalMark || DEFAULTS.decimalMark

    getThousandsSeparator = () => this.props.thousandsSeparator || DEFAULTS.thousandsSeparator[this.getDecimalMark()]

    getAlternateDecimalMarks = () => this.props.alternateDecimalMark || DEFAULTS.alternateDecimalMark

    prepareNum = (num) => _(num)
        .reduce(replaceAll(this.getThousandsSeparator(), ''), _(''))
        .reduce(replaceAll(this.getAlternateDecimalMarks(), '.'), _(''))
        .join('')
        .replace(this.getDecimalMark(), '.')

    changeHandler = (event) => {
        let valueForReturn = event.target.value
        const { checked } = event.target
        const previousType = typeof this.getValue()

        if (previousType === 'boolean' || event.target.type === 'checkbox') {
            (this.props.onChange || DEFAULTS.onChange)(this.getPath(), checked)

            return
        }

        const valueForCheck = this.prepareNum(valueForReturn)

        if ((!_.isNaN(Number(valueForCheck)) && valueForCheck.length)
            || (previousType === 'number' && !valueForCheck.length && this.props.defaultNum)) {
            if (!/(\.|\s|\.[0-9]*0)$/.test(valueForCheck)) {
                const parseFunc = /\./.test(valueForCheck) ? parseFloat : parseInt

                valueForReturn = parseFunc(valueForCheck, 10) || this.props.defaultNum || 0
            }
        }

        (this.props.onChange || DEFAULTS.onChange)(this.getPath(), valueForReturn)
    }

    clickHandler = (that) => () => (this.props.onClick || DEFAULTS.onClick)(that.control)

    focusHandler = (that) => () => (this.props.onFocus || DEFAULTS.onFocus)(that.control)

    formatNum = (num = this.getValue()) => num.toString().replace('.', this.getDecimalMark())

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
