import React from 'react'
import PropTypes from 'prop-types'

function onChangeInputFileImage(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById(id).setAttribute('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}

const SelectSingleImage = (props) => {
    const { size, img_id, id, label, onchange } = props
    return (
        <div className={`col ${size}`}>
            <div>
                <img id={img_id} src="" alt="" className="responsive-img materialboxed" />
            </div>
            <div className="file-field input-field overflow-x-hidden">
                <div className="btn">
                    <span>{label}</span>
                    <input type="file"
                        id={id}
                        name={id}
                        onChange={() => {
                            const input = document.getElementById(id)
                            onchange(input);
                            onChangeInputFileImage(input, img_id);
                        }} />
                </div>
                <div className="file-path-wrapper d-none">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
        </div>
    )
}

SelectSingleImage.propTypes = {
    onchange: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    img_id: PropTypes.string.isRequired
}

SelectSingleImage.defaultProps = {
    size: "s12"
}

export default SelectSingleImage
