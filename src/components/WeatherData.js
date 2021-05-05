import React from 'react';

class WeatherData extends React.Component {
  render() {
    return (
      this.props.weathers.map(data => {
        return (
          <div>
            <p>{data.date}</p>
            <p>{data.description}</p>
          </div>
        );

      })
    );
  }
}

export default WeatherData;
