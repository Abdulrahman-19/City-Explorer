import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
class Movie extends React.Component {

  render() {
    console.log(this.props.movieInfo);
    return (
      <CardColumns>
        {this.props.movieInfo.map(data => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.release_date}</Card.Text>
                <Card.Text>
                  {data.overview}
                </Card.Text>
              </Card.Body>
            </Card>

          );

        })
        }
      </CardColumns>

    );
  }
}

export default Movie;
