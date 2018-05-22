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
    this.state ={ isLoading: true}
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
      </div>
    );
  }
}

export default App;
