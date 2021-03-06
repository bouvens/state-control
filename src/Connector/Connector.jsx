import React from 'react'
import PropTypes from 'prop-types'

export const Connector = (props) => {
  const { children, ...passedProps } = props

  return (
    <div className="controlled-connector">
      {React.Children.map(children,
        (child) => (
          child && typeof child.type === 'function'
            ? (
              <child.type
                {...child.props}
                {...passedProps}
              />
            )
            : child
        ))}
    </div>
  )
}

Connector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
