import React from 'react'
import PropTypes from 'prop-types'

// children: wrapping the component around whatever the text 
// version: primary or secondary which will pertain to a specific class
// type: submit button, regular button, etc..
// isDisabled: if true button will be disabled
function Button({children, version, type, isDisabled}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
        {children}
    </button>
  )
}

// the defaults
Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
}

export default Button