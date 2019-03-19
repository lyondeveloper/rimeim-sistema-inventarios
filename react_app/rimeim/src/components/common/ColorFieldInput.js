import React from 'react'
import PropTypes from 'prop-types'

const ColorFieldInput = (props) => {
    const { size, label, id, onchange, value } = props
    return (
        <div className={`col ${size}`}>
            {label}:
            <div className="input-field inline">
                <input id={id} name={id} type="color" className="validate" onChange={onchange} value={value} />
            </div>
        </div>
    )
}

ColorFieldInput.propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}

ColorFieldInput.defaultProps = {
    size: "s12"
}

export default ColorFieldInput
