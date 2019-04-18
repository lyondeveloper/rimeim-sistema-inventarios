import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const SelectFiles = props => {
  const {
    label,
    onchange,
    id,
    input_size,
    multiple,
    accept,
    files,
    onDeleteFileClick
  } = props;
  var scroll_files = null;

  if (files.length > 0) {
    scroll_files = (
      <div className="horizontal-scroll-container bordered">
        {files.map(file => (
          <div
            key={uuid()}
            className="item"
            style={{
              background: `url('${file.src}') no-repeat center center / cover`
            }}
          >
            <div
              className="red close-button cursor-pointer"
              onClick={() => {
                if (onDeleteFileClick) {
                  onDeleteFileClick(file);
                }
              }}
            >
              <i className="material-icons">close</i>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`col ${input_size}`}>
      {scroll_files}
      <div className="file-field input-field overflow-x-hidden">
        <div className="btn">
          <span>{label}</span>
          <input
            id={id}
            name={id}
            type="file"
            accept={accept}
            onChange={onchange}
            multiple={multiple ? 'multiple' : ''}
          />
        </div>
        <div className="file-path-wrapper d-none">
          <input className="file-path validate" type="text" />
        </div>
      </div>
    </div>
  );
};

SelectFiles.propTypes = {
  label: PropTypes.string,
  onchange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  input_size: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  accept: PropTypes.string.isRequired,
  files: PropTypes.array,
  onDeleteFileClick: PropTypes.func
};

SelectFiles.defaultProps = {
  input_size: 's12',
  multiple: false,
  accept: 'image/jpeg, image/png'
};

export default SelectFiles;
