import React, { Component } from 'react';
import axios from 'axios';
import './css/index.css';
import apiKey from './config';
import Search from './components/Search';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      images: [],
      cats: [],
      dogs: [],
      computers: [],
      perPage: 24,
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('cats');
    this.performSearch('dogs');
    this.performSearch('computers');
  }

  performSearch = (query = 'sunrise') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${this.state.perPage}&format=json&nojsoncallback=1`)
    .then( (response) => {
      this.setState({ loading: false });
      if(query === 'cats'){
        this.setState({ cats: response.data.photos.photo });
      } else if (query === 'dogs'){
        this.setState({ dogs: response.data.photos.photo });
      } else if (query === 'computers'){
        this.setState({ computers: response.data.photos.photo});
      } else {
        this.setState({images: response.data.photos.photo});
      }
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Search onSearch={this.performSearch}/>
          <Navigation/>
          {
          (this.state.loading)
          ? <h1>Loading...</h1>
          : <Switch>
              <Route exact path='/' render={() => <Redirect to="/sunrise" /> }/>
              <Route path='/sunrise' render={() => <PhotoContainer data={this.state.images}/>} /> 
              <Route path='/cats' render={() => <PhotoContainer data={this.state.cats}/>} />
              <Route path='/dogs' render={() => <PhotoContainer data={this.state.dogs}/>} />
              <Route path='/computers' render={() => <PhotoContainer data={this.state.computers}/>} />
              <Route path='/search/:query' render={() => <PhotoContainer data={this.state.images}/>} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

