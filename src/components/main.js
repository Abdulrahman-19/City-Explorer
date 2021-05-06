import React from 'react';
import axios from 'axios';
import MyForm from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import WeatherData from './WeatherData';
import Movie from './Movie';

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
      // imgSource: '',
      weatherInfo:[],
      movieInfo:[],
      avaliable : true,
      show: false
    };
  }
  getLocation = async (e) => {
    try{
      e.preventDefault();
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.updateSearch}&format=json`;
      const req = await axios.get(url);
      // let lat = req.data[0].lat;
      // let lon = req.data[0].lon;
      console.log(this.state.weatherInfo);
      this.setState({
        data: req.data[0],
        // imgSource: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=&center=${lat},${lon}&zoom=10`,
      });
      this.getMovieData();
      this.getWeatherData();
    }
    catch{
      this.setState({
        avaliable : false,
      });
    }
  };
  getWeatherData = async ()=>{
    const expressWeather = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.data.lat}&lon=${this.state.data.lon}`;
    const myApiWeather = await axios.get(expressWeather);
    this.setState({
      weatherInfo : myApiWeather.data,
      show: true
    });
  }
  getMovieData = async () => {
    const expressMovie = `${process.env.REACT_APP_SERVER}/movie?query=${this.state.updateSearch}`;
    const myApiMovie = await axios.get(expressMovie);
    this.setState({
      movieInfo : myApiMovie.data,
      show : true
    });
  }
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
          <Map getLocation={this.getLocation} getLanLat={this.getWeatherData} lat={this.state.data.lat} lon={this.state.data.lon} />
          }
          <WeatherData getLanLat={this.getWeatherData} weathers = {this.state.weatherInfo} />
          <Movie getMovie = {this.getMovieData} movieInfo = {this.state.movieInfo}/>
        </>
      );
    }
  }
}

export default Main;
