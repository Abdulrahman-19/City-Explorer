import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

class Map extends React.Component {
  render() {
    return (
      <div>
        <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=&center=${this.props.lat},${this.props.lon}&zoom=10`} fluid />
      </div>
    );
  }
}

export default Map;
