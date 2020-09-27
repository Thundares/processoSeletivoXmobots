import React from 'react';
import './App.css';
import './css/login.css';
import './css/sidebar.css';
import './css/create.css';
import Card from './components/loginCard.jsx';
import Sidebar from './components/sidebar.jsx';
import CreateForm from './components/createUser.jsx';
import Mapbox from './components/map.jsx';

class App extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            page: 'index',
            email: '',
            reEnterPass: '',
            createBtnDisabled: true,
            createSpanDisabled: true
        }

        // binding of functions to handle forms
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.createUser = this.createUser.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.createNameChangeHandler = this.createNameChangeHandler.bind(this);
        this.createEmailChangeHandler = this.createEmailChangeHandler.bind(this);
        this.createPassChangeHandler = this.createPassChangeHandler.bind(this);
        this.createReEnterChangeHandler = this.createReEnterChangeHandler.bind(this);
        this.createBtnOnClick = this.createBtnOnClick.bind(this);
    }

    // functions that handles forms
    changeHandler(event) {
        this.setState({name: event.target.value});
    }
    submitHandler(event) {
        if(this.state.name.length === 0) {
          alert('Please, use a valid username.');
        }
        else {
          this.setState({page: 'logged'});
        }
    }

    // functions that handle create form
    createNameChangeHandler(event) {
        this.setState({name: event.target.value});
        this.checkEverything();
    }
    createEmailChangeHandler(event) {
        this.setState({email: event.target.value});
        this.checkEverything();
    }
    createPassChangeHandler(event) {
        this.setState({password: event.target.value});
        event.target.value !== this.state.reEnterPass ? this.setState({createSpanDisabled: false}) : this.setState({createSpanDisabled: true});
        this.checkEverything();
    }
    createReEnterChangeHandler(event) {
        this.setState({reEnterPass: event.target.value});
        event.target.value !== this.state.password ? this.setState({createSpanDisabled: false}) : this.setState({createSpanDisabled: true}); 
        this.checkEverything();
    }
    createBtnOnClick(event) {
        console.log(this.state);
        if (this.state.password === this.state.reEnterPass) {
            this.backToIndex();
        }
        else {
            alert("The password does not match.");
        }
    }

    // check if everything is filled
    checkEverything() {
        if(this.state.name.length > 0 && 
          this.state.password.length > 0 &&
          this.state.email.length > 0 && 
          this.state.reEnterPass.length > 0) {
            this.setState({createBtnDisabled: false});
        }
        else {
          this.setState({createBtnDisabled: true});
        }
    }

    // functions that changes the page
    createUser(event) {
        this.setState({page: 'createUser'})
    }
    backToIndex(event) {
        this.setState({page: 'index'})
    }

    render() {
        if(this.state.page === 'index') {
            // return the INDEX page
            return (
                <div className="App">
                    <Card Title="Login">
                        <form onSubmit={this.submitHandler}>
                            <label>Username:</label>
                            <input type="text" id="username" onChange={this.changeHandler}/>
                            <label>Password:</label>
                            <input type="password" id="password"/>
                            <div className="logDiv">
                                <input type="submit" className="logBtn" value="Log in" />
                                <button onClick={this.createUser} >Create a account</button>
                            </div>
                        </form>
                    </Card>
                </div>
            );
        }// close if page === index
        else if(this.state.page === 'createUser') {
            // return the CREATEUSER page
            return (
                <CreateForm Title='Create your user'>
                    <form>
                        <label>Name</label>
                        <input type='text' onChange={this.createNameChangeHandler}/>
                        <label>E-mail</label>
                        <input type='e-mail' onChange={this.createEmailChangeHandler}/>
                        <label>Password</label>
                        <input type='password' onChange={this.createPassChangeHandler}/>
                        <label>Re-Enter password</label>
                        <input type='password' onChange={this.createReEnterChangeHandler}/>
                        <button disabled={this.state.createBtnDisabled} onClick={this.createBtnOnClick}>Register</button>
                        <button id='disabledBtn' onClick={this.backToIndex}>Back</button>
                        <span className={this.state.createSpanDisabled ? 'hidden' : ''}>The password does not match.</span>
                    </form>
                </CreateForm>
            )
        }
        else if(this.state.page === 'logged') {
            // return page after LOGGED
            return (
                <div>
                    <Sidebar username={this.state.name}>
                        <label>Submit the information</label>
                        <input type='file' />
                    </Sidebar>
                    <Mapbox>

                    </Mapbox>
                </div>
            );
        }// close if page === logged
    }// close render
}// close class

export default App;