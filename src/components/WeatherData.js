import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';

class WeatherData extends React.Component {
  render() {
    return (
      <CardGroup>
        {this.props.weathers.map(data => {
          return (
            <div>
              <Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>{data.date}</ListGroup.Item>
                  <ListGroup.Item>{data.description}</ListGroup.Item>
                </ListGroup>
              </Card>
              <br />
            </div>
          );
        })
        }

      </CardGroup>
    );
  }
}

export default WeatherData;
