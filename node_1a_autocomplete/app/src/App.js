import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

    state = {
        inputUsername: '',
        userList: []
    }

    updateHandle = (e) => {
        var _that = this;
        this.setState({
            inputUsername: e.target.value
        })
        axios.get('http://127.0.0.1:8000/users', {
            params: {
                username: e.target.value
            }
        })
        .then(function (response) {
            _that.setState({
                userList: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    render() {
        return (
            <div>
                <input
                    type='text'
                    placeholder='username'
                    onChange={this.updateHandle}
                    name='inputUsername'
                    value={this.state.inputUsername}
                />
                <ul>
                    {this.state.userList.map((userElement) => {
                        return (
                            <li key={userElement.id}>
                                {userElement.username}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default App;
