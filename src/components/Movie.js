import React from 'react';

class Movie extends React.Component {

  render() {
    console.log(this.props.movieInfo);
    return (
      this.props.movieInfo.map(data => {
        return (
          <div>
            <h3>{data.title}</h3>
            <p>{data.release_date}</p>
            <p>{data.overview}</p>
          </div>
        );

      })
    );
  }
}

export default Movie;
