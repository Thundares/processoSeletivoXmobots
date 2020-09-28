import React from 'react'

// component that contains the login form from index 
export default props =>
    <div className="loginCard">
        <div className="loginCard-Title">
            {props.title}
        </div>
        <div className="loginCard-Content">
            <form onSubmit={props.app.submitHandler}>
                <label>Username:</label>
                <input type="text" id="username" onChange={props.app.changeHandler}/>

                <label>Password:</label>
                <input type="password" id="password"/>
                
                <div className="logDiv">
                    <input type="submit" className="logBtn" value="Log in" />
                    <button onClick={props.app.createUser} >Create a account</button>
                </div>
            </form>
        </div>
    </div>