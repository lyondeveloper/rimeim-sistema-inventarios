import React from 'react';
import PropTypes from 'prop-types';

const SelectInputField = props => {
  const {
    input_size,
    id,
    label,
    required,
    onchange,
    disabled,
    value,
    options,
    error
  } = props;
  return (
    <div className={`input-field col ${input_size}`}>
      <select
        id={id}
        name={id}
        required={required}
        disabled={disabled}
        onChange={onchange}
        value={value}
      >
        <option value="0">Seleccionar</option>
        {options.map(option => (
          <option value={`${option.value}`} key={`opt${option.value}`}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      {error && <span className="helper-text text-danger">{error}</span>}
    </div>
  );
};

SelectInputField.propTypes = {
  input_size: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string
};

SelectInputField.defaultProps = {
  input_size: 's12',
  label: null,
  required: false,
  disabled: false
};

export default SelectInputField;
