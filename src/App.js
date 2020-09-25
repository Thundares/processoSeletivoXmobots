import React from 'react';
import './App.css';
import './css/login.css';
import Card from './components/loginCard.jsx';

class App extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            name: 'unnamed',
            password: 'nopass',
            page: 'index'
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(event) {
        this.setState({name: event.target.value});
    }

    submitHandler(event) {
        alert(this.state.name)
    }

    render() {
        if(this.state.page === 'index') {
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
                                <a href="./public/createUser.html">Create a account</a>
                            </div>
                        </form>
                    </Card>
                </div>
            );
        }// close if page == index
    }// close render
}// close class

export default App;
