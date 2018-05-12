import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('/api/get/5af0fba75c5ba22ba456a9ad')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
          var oldURL = document.referrer;
          alert(oldURL);
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
        <div>{this.state.dataSource.name}</div>
        <div>Calorie Goal for Today: {this.state.dataSource.calorieGoal}</div>
      </div>
    );
  }
}

export default App;
