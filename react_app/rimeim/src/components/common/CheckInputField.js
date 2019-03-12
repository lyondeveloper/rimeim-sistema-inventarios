import React from 'react'
import PropTypes from 'prop-types'

const CheckInputField = (props) => {
    const { label, size, checked, id, onchange } = props
    return (
        <div className={`col ${size}`}>
            <label>
                <input type="checkbox"
                    className="filled-in"
                    checked={checked ? "checked" : ""}
                    id={id}
                    name={id}
                    onChange={onchange} />
                <span>{label}</span>
            </label>
        </div>
    )
}

CheckInputField.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired
}

CheckInputField.defaultProps = {
    size: "s12",
    checked: false
}

export default CheckInputField