import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { servicePhotos } from '../photo-api';

export default class App extends Component {
  state = {
    page: 1,
    query: null,
    isLoading: false,
    error: '',
    photoData: null,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query &&
      this.state.query.trim().length !== 0
    ) {
      this.handlePhotos();
    }
  }

  handlePhotos = async () => {
    const photosData = await servicePhotos(this.state.query, this.state.page);
    this.setState({
      photoData: photosData.data,
    });
  };
  handleSubmit = data => {
    this.setState({ query: data });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {this.state.photoData && (
          <ImageGallery photos={this.state.photoData}></ImageGallery>
        )}
        {true && <Button />}
      </>
    );
  }
}
