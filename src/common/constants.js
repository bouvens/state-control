import PropTypes from 'prop-types'

export const VALUE_TYPE = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
export const MARK_TYPE = PropTypes.oneOfType([PropTypes.string, PropTypes.array])

export const ALLOW_SET_SELECTION_RANGE = ['text', 'search', 'URL', 'tel', 'password']
