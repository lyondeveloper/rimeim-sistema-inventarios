import React from 'react'
import PropTypes from 'prop-types'

const TextAreaInputField = (props) => {
    const { input_size, id, label, active_label, error, onchange, required, disabled } = props
    return (
        <div className={`col ${input_size}`}>
            <div className="input-field">
                <textarea className="materialize-textarea"
                    name={id} id={id}
                    required={required}
                    disabled={disabled}
                    onChange={onchange}></textarea>
                <label htmlFor={id} className={`${active_label && ('active')}`} >{label}</label>

                {error && (
                    <span className="helper-text text-danger">{error}</span>
                )}
            </div>
        </div>
    )
}

TextAreaInputField.propTypes = {
    input_size: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    active_label: PropTypes.bool.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
}

TextAreaInputField.defaultProps = {
    input_size: "s12",
    label: null,
    active_label: false,
    required: false,
    disabled: false,
    error: null
}

export default TextAreaInputField