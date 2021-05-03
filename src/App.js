
import React from 'react';
// import axios from 'axios';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';

export class App extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;


