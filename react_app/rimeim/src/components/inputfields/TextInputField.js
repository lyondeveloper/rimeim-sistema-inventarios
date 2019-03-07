import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextInputField extends Component {

    render() {
        const { input_size, icon, type, id, label, onchange, value } = this.props
        return (
            <div className={`input-field col ${input_size}`}>
                {icon && (
                    <i className={`material-icons prefix`}>{icon}</i>
                )}
                <input type={type} id={id} name={id} className="validate" onChange={onchange} value={value} />
                <label htmlFor={id}>{label}</label>
            </div>
        )
    }
}

TextInputField.propTypes = {
    input_size: PropTypes.string,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired
}

TextInputField.defaultProps = {
    input_size: "s12",
    type: "text",
    icon: null
}

export default TextInputField