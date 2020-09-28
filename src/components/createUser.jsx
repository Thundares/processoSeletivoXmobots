import React from 'react'

// component that contains the createUser form 
export default props =>
    <div className="create">
        <div className="create-title">
            {props.title}
        </div>
        <div className="create-content">
        <form>
            <label>Name</label>
            <input type='text' onChange={props.app.createNameChangeHandler}/>

            <label>E-mail</label>
            <input type='e-mail' onChange={props.app.createEmailChangeHandler}/>

            <label>Password</label>
            <input type='password' onChange={props.app.createPassChangeHandler}/>

            <label>Re-Enter password</label>
            <input type='password' onChange={props.app.createReEnterChangeHandler}/>

            <button disabled={props.app.state.createBtnDisabled} onClick={props.app.createBtnOnClick}>Register</button>
            
            <button id='disabledBtn' onClick={props.app.backToIndex}>Back</button>
            
            <span className={props.app.state.createSpanDisabled ? 'hidden' : ''}>The password does not match.</span>
        </form>
        </div>
    </div>