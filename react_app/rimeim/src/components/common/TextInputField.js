import React from 'react'
import PropTypes from 'prop-types'

const TextInputField = (props) => {

    const { input_size, icon, type, id, label, onchange, value, error, required } = props
    return (
        <div className={`input-field col ${input_size}`}>
            {icon && (
                <i className={`material-icons prefix`}>{icon}</i>
            )}

            {required ? (
                <input type={type} id={id} name={id} className="validate" onChange={onchange} value={value} required />
            ) : (
                    <input type={type} id={id} name={id} className="validate" onChange={onchange} value={value} />
                )}

            <label htmlFor={id}>{label}</label>
            {error && (
                <span className="helper-text text-danger">{error}</span>
            )}
        </div>
    )
}

TextInputField.propTypes = {
    input_size: PropTypes.string,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired
}

TextInputField.defaultProps = {
    input_size: "s12",
    type: "text",
    icon: null,
    error: null,
    required: false
}

export default TextInputField