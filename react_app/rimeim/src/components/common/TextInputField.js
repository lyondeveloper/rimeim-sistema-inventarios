import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = props => {
    const {
        input_size,
        icon,
        type,
        id,
        label,
        active_label,
        onchange,
        value,
        error,
        required,
        disabled,
        placeholder
    } = props;
    return (
        <div className={`input-field col ${input_size}`}>
            {icon && <i className={`material-icons prefix`}>{icon}</i>}

            {active_label || placeholder ? (
                <input
                    type={type}
                    id={id}
                    name={id}
                    className='validate'
                    onChange={onchange}
                    value={value}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder ? placeholder : ''}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    className='validate'
                    onChange={onchange}
                    value={value}
                    required={required}
                    disabled={disabled}
                />
            )}

            <label htmlFor={id} className={`${active_label && 'active'}`}>
                {label}
            </label>

            {error && <span className='helper-text text-danger'>{error}</span>}
        </div>
    );
};

TextInputField.propTypes = {
    input_size: PropTypes.string,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    active_label: PropTypes.bool.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.string
};

TextInputField.defaultProps = {
    input_size: 's12',
    type: 'text',
    icon: null,
    error: null,
    placeholder: null,
    required: false,
    disabled: false,
    active_label: false
};

export default TextInputField;
