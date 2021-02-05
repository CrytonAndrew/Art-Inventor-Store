import React from 'react'
import PropTypes from 'prop-types' // Specifys the type of each prop


// Destucturing
const Rating = ({value, text, color}) => {
    return (
        <div className="rating">
            <span>
                <i style={{color}} className={ 
                    value >= 1 
                    ? "fas fa-star" 
                    : value >= 0.5 
                    ? "fas fa-star-half-alt" 
                    : "far fa-star"
                    }
                    ></i>
            </span>
            <span>
                <i style={{color}} className={ 
                    value >= 2 
                    ? "fas fa-star" 
                    : value >= 1.5 
                    ? "fas fa-star-half-alt" 
                    : "far fa-star"
                    }
                    ></i>
            </span>
            <span>
                <i style={{color}} className={ 
                    value >= 3
                    ? "fas fa-star" 
                    : value >= 2.5 
                    ? "fas fa-star-half-alt" 
                    : "far fa-star"
                    }
                    ></i>
            </span>
            <span>
                <i style={{color}} className={ 
                    value >= 4
                    ? "fas fa-star" 
                    : value >= 3.5 
                    ? "fas fa-star-half-alt" 
                    : "far fa-star"
                    }
                    ></i>
            </span>
            <span>
                <i style={{color}} className={ 
                    value >= 5 
                    ? "fas fa-star" 
                    : value >= 4.5 
                    ? "fas fa-star-half-alt" 
                    : "far fa-star"
                    }
                    ></i>
            </span>
            {/* If there is text then show text equivalent to "{text ? text : " " }"*/}
            <span>{text && text}</span>
        </div>
    )
}

// Setting a default value for the star colors
Rating.defaultProps = {
    color: 'gold'
}

// This will type check our props if something goes wrong:
// E.g if we pass in a number for our text it will show us the error in console
Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}
export default Rating

