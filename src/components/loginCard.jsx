import React from 'react'

export default props =>
    <div className="loginCard">
        <div className="loginCard-Title">
            {props.Title}
        </div>
        <div className="loginCard-Content">
            {props.children}
        </div>
    </div>