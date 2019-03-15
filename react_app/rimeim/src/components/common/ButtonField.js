import React from 'react'
import PropTypes from 'prop-types'

const ButtonField = (props) => {
    const { type, className, text, onClick, disabled, icon } = props
    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
            {icon && (<i className="material-icons left">{icon}</i>)}
            {text}
        </button>
    )
}

ButtonField.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool.isRequired,
    icon: PropTypes.string
}

ButtonField.defaultProps = {
    type: "button",
    disabled: false,
    icon: null
}

export default ButtonField