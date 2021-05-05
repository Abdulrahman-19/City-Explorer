import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class MyForm extends React.Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.getLocation}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control type="text" onChange={this.props.updateSearchQuery} placeholder="Enter City" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
          <br />
          <Form.Label>{this.props.display_name} , {this.props.lon} , {this.props.lat}</Form.Label>
        </Form>
      </div>
    );
  }
}

export default MyForm;
