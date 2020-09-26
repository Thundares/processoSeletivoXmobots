import React from 'react'

// component that contains the createUser form 
export default props =>
    <div className="create">
        <div className="create-title">
            {props.Title}
        </div>
        <div className="create-content">
            {props.children}
        </div>
    </div>