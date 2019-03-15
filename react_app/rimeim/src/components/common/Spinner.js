import React from 'react'
import PropTypes from 'prop-types'

const Spinner = (props) => {
    const { fullWidth, extraClass } = props

    const content = (
        <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
        </div>
    )

    if (fullWidth) {
        return (
            <div className={`minw-100 center ${extraClass}`}>
                <div className="preloader-wrapper active">
                    {content}
                </div>
            </div>
        )
    }

    return (
        <div className="preloader-wrapper active">
            {content}
        </div>
    )
}

Spinner.propTypes = {
    fullWidth: PropTypes.bool.isRequired,
    extraClass: PropTypes.string
}

Spinner.defaultProps = {
    fullWidth: false,
    extraClass: ""
}

export default Spinner
