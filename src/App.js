import React, { Component } from 'react';
import axios from 'axios';
import './css/index.css';
import apiKey from './config';
import Search from './components/Search';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      images: [],
      autumn: [],
      winter: [],
      spring: [],
      summer: [],
      query: '',
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch('autumn');
    this.performSearch('winter');
    this.performSearch('spring');
    this.performSearch('summer');
    this.performSearch();
  }

  performSearch = (query = 'northern%20lights') => {
    this.setState({loading: true})
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
    .then( (response) => {
      this.setState({ query , loading: false });
      if(query === 'winter'){
        this.setState({ winter: response.data.photos.photo });
      } else if (query === 'autumn'){
        this.setState({ autumn: response.data.photos.photo });
      } else if (query === 'spring'){
        this.setState({ spring: response.data.photos.photo });
      } else if (query === 'summer'){
        this.setState({ summer: response.data.photos.photo});
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
              <Route exact path='/' render={() => <Redirect to="/northernlights" /> }/>
              <Route path='/northernlights' render={() => <PhotoContainer data={this.state.images}/>} /> 
              <Route path='/autumn' render={() => <PhotoContainer data={this.state.autumn}/>} />
              <Route path='/winter' render={() => <PhotoContainer data={this.state.winter}/>} />
              <Route path='/spring' render={() => <PhotoContainer data={this.state.spring}/>} />
              <Route path='/summer' render={() => <PhotoContainer data={this.state.summer}/>} />
              <Route path='/search/:query' render={(props) => <PhotoContainer data={this.state.images} search={this.performSearch} query={this.state.query} {...props}/>} />
              <Route component={NotFound} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

