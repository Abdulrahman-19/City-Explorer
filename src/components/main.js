import React from 'react';
import axios from 'axios';
import MyForm from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import WeatherData from './WeatherData';

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Map from './map';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateSearch: '',
      data: '',
      imgSource: '',
      weatherInfo:[],
      avaliable : true,
      show: false
    };
  }
  getLocation = async (e) => {
    try{
      e.preventDefault();
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.updateSearch}&format=json`;
      const expressWeather = `${process.env.REACT_APP_SERVER}/weather`;
      const myApiWeather = await axios.get(expressWeather);
      const req = await axios.get(url);
      let lat = req.data[0].lat;
      let lon = req.data[0].lon;
      console.log(this.state.weatherInfo);
      this.setState({
        data: req.data[0],
        weatherInfo : myApiWeather.data,
        imgSource: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=&center=${lat},${lon}&zoom=10`,
        show: true
      });
    }
    catch{
      this.setState({
        avaliable : false,
      });
    }
  };
  returnTo = ()=> window.location.reload();
  updateSearchQuery = (e) => {
    this.setState({
      updateSearch: e.target.value
    });
    console.log(this.state.updateSearch);
  }
  render() {
    if (this.state.avaliable === false){
      return(
        <div>
          <main>
            <h3>Requst Not Found</h3>
            <h4>Wrong Value Input</h4>
            <Button onClick = {this.returnTo}>Go Back</Button>
          </main>
        </div>
      );
    }else{

      return (
        <>
          <MyForm getLocation={this.getLocation} updateSearchQuery = {this.updateSearchQuery} display_name={this.state.data.display_name} lat={this.state.data.lat} lon={this.state.data.lon}/>
          {this.state.show &&
          <Map getLocation={this.getLocation} lat={this.state.data.lat} lon={this.state.data.lon} />
          }
          <WeatherData weathers = {this.state.weatherInfo} />
        </>
      );
    }
  }
}

export default Main;
