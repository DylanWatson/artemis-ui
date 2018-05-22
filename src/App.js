import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


let responseFromFitbit;
let responseFromArtermis;

const wordStyle = {
  fontSize: 80,
  textAlign: 'center',
}

const calorieStyle = {
  fontSize: 256,
  textAlign: 'center',
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading: true, value: 0}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    return fetch('/api/get/5b03817f58504167ccb0eead')
      .then((response) => response.json())
      .then((responseJson) => {
        responseFromArtermis = responseJson
      })
      .then(() => {
        this.setState({
          isLoading: false,
          dataSource: responseFromArtermis,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  handleChange(event) {
   this.setState({value: event.target.value});
 }

 handleSubmit(event) {
   fetch('/api/addBurntCalories/5b03817f58504167ccb0eead',
 {
    method: 'POST',
    body: JSON.stringify({"burnedCalories": parseInt(this.state.value)}),
    headers: {
      'content-type': 'application/json'
    }
 })
 .catch((error) => {
   console.error(error);
 });
    event.preventDefault();
  }

  render(){

    if(this.state.isLoading){
      return(
        <div>Loading...</div>
      )
    }

    return(
      <div>
        <div style={wordStyle}>
        You still need to burn
          <div style={calorieStyle}>{this.state.dataSource.calorieGoal - this.state.dataSource.burnedCalories}</div>
          calories before you can use this site!
          </div>
          <form onSubmit={this.handleSubmit}>
        <label>
          Input Burned Calories:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default App;
