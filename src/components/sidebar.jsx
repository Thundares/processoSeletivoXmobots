import React from 'react';

// component that contains the sidebar from logged page
export default props =>
    <div className='sidebar'>
        <div className='logged-text'>
            <label>Logged as {props.username}</label>
        </div>
    </div>