
import React from 'react';
import axios from 'axios';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      updateSearch : '',
      data : '',
      imgSource : ''
    };
  }
  getLocation = async (e)=>{
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=pk.b06e6a53ecfb212db970ffb1617832a6&q=${this.state.updateSearch}&format=json` ;
    const req = await axios.get(url);
    let lat = req.data[0].lat;
    let lon = req.data[0].lon;
    console.log(req.data);
    this.setState({
      data : req.data[0],
      imgSource: `https://maps.locationiq.com/v3/staticmap?key=pk.b06e6a53ecfb212db970ffb1617832a6&q=&center=${lat},${lon}&zoom=10`
    });
  };
  updateSearchQuery = (e) => {
    this.setState({
      updateSearch : e.target.value
    });
    console.log(this.state.updateSearch);
  }
  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <form onSubmit= {this.getLocation}>
          <input type = 'text' onChange = {this.updateSearchQuery} placeholder = 'City Name'></input>
          <input type = 'submit' value = 'get city'/>
        </form>
        <p>{this.state.data.display_name}</p>
        <img src={this.state.imgSource} alt = ''/>
      </div>
    );
  }
}

export default App;


