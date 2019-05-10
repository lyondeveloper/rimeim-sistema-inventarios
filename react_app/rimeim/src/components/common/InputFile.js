import React from "react";
import PropTypes from "prop-types";

const InputFile = props => {
  const { id, input_size, label, onchange, required, disabled, accept } = props;
  return (
    <div className={`col ${input_size}`}>
      <div className="file-field input-field">
        <div className="btn">
          <span>{label}</span>
          <input
            type="file"
            id={id}
            onChange={onchange}
            required={required ? "required" : ""}
            disabled={disabled ? "disabled" : ""}
            accept={accept}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
    </div>
  );
};

InputFile.propTypes = {
  input_size: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  accept: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};

InputFile.defaultProps = {
  input_size: "s12",
  accept: "",
  required: false,
  disabled: false
};

export default InputFile;
