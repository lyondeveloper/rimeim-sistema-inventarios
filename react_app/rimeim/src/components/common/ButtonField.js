import React from 'react'
import PropTypes from 'prop-types'

const ButtonField = (props) => {
    const { type, className, text, onClick } = props
    return (
        <button className={className} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

ButtonField.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

ButtonField.defaultProps = {
    type: "button"
}

export default ButtonField