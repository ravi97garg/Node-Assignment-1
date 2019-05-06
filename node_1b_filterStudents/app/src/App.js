import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(){
        super();
        this.state = {
            subject: 'Math',
            students: []
        }
        this.getData();

    }

    updateHandle = (e) => {
        this.setState({
            subject: e.target.value
        }, this.getData)
    }

    getData = () => {
        let _that = this;
        axios.get('http://127.0.0.1:8000/student?subject='+this.state.subject)
            .then((response)=>{
                _that.setState({
                    students: response.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

  render() {
    return (
      <div className="App">
          <select onChange={this.updateHandle}>
              <option value='Math' defaultValue={true}>Math</option>
              <option value='Bio'>Biology</option>
          </select>
          <table>
              <tbody>
                  <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Subject</th>
                  </tr>
                  {this.state.students.map((student) => {
                      return (
                          <tr key={student.user_id}>
                              <td>{student.firstname}</td>
                              <td>{student.lastname}</td>
                              <td>{student.subject}</td>
                          </tr>
                      )
                  })}
              </tbody>
          </table>
      </div>
    );
  }
}

export default App;
