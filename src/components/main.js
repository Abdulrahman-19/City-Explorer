import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateSearch: '',
      data: '',
      imgSource: '',
      avaliable : true
    };
  }
  getLocation = async (e) => {
    try{
      e.preventDefault();
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.updateSearch}&format=json`;
      const req = await axios.get(url);
      let lat = req.data[0].lat;
      let lon = req.data[0].lon;
      console.log(req.data);
      this.setState({
        data: req.data[0],
        imgSource: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=&center=${lat},${lon}&zoom=10`,
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
          <Form onSubmit={this.getLocation}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>City Name</Form.Label>
              <Form.Control type="text" onChange={this.updateSearchQuery} placeholder="Enter City" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Explore!
            </Button>
            <br/>
            <Form.Label>{this.state.data.display_name} , {this.state.data.lon} , {this.state.data.lat}</Form.Label>
          </Form>
          <Image src={this.state.imgSource} fluid />
        </>
      );
    }
  }
}

export default Main;
