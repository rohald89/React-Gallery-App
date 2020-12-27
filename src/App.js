import React, { Component } from 'react';
import axios from 'axios';
import './css/index.css';
import apiKey from './config';
import Search from './components/Search';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      images: [],
      perPage: 24,
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'sunrise') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${this.state.perPage}&format=json&nojsoncallback=1`)
    .then( (response) => {
      this.setState({
        images: response.data.photos.photo,
        loading: false
      });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render () {
    return (
      <>
        <Search onSearch={this.performSearch}/>
        <Navigation />
        {
        (this.state.loading)
        ? <h1>Loading...</h1>
        : <PhotoContainer data={this.state.images} /> 
        }
      </>
    );
  }
}

