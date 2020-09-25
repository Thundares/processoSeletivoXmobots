import React from 'react';
import './App.css';
import './css/login.css';
import './css/sidebar.css';
import Card from './components/loginCard.jsx';
import Sidebar from './components/sidebar.jsx'

class App extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            page: 'index'
        }

        // binding of functions to handle forms
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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

    // functions that changes the page
    createUser() {
        this.setState({page: 'createUser'})
    }

    render() {
        if(this.state.page === 'index') {
            // return the index page
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
                                <a href="./public/createUser.html" onClick={this.createUser} >Create a account</a>
                            </div>
                        </form>
                    </Card>
                </div>
            );
        }// close if page === index
        else if(this.state.page === 'createUser') {
            // return the createUser page

        }
        else if(this.state.page === 'logged') {
            // return page after logged
            return (
                <Sidebar username={this.state.name}>

                </Sidebar>

            );
        }// close if page === logged
    }// close render
}// close class

export default App;
