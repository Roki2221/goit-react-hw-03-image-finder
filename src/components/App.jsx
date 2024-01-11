import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { servicePhotos } from '../photo-api';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    page: 1,
    query: null,
    isLoading: false,
    loadingMore: false,
    error: '',
    photoData: [],
    maxPage: null,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query &&
      this.state.query.trim().length !== 0
    ) {
      this.setState({ page: 1 });
      this.servicePhotos();
    }
    if (
      prevState.page !== this.state.page &&
      prevState.query === this.state.query
    ) {
      this.loadMorePhotos();
    }
  }

  servicePhotos = async () => {
    this.setState({ isLoading: true, error: '' });
    const photosData = await servicePhotos(this.state.query, this.state.page);
    const countPages = Math.ceil(photosData.data.totalHits / 12);
    if (photosData.data.hits.length < 1) {
      this.setState({
        error: 'Sorry, nothing found.',
      });
    }
    this.setState({
      photoData: photosData.data.hits,
      isLoading: false,
      maxPage: countPages,
    });
  };

  loadMorePhotos = async () => {
    this.setState({ loadingMore: true });
    const photosData = await servicePhotos(this.state.query, this.state.page);

    this.setState(prev => ({
      photoData: [...prev.photoData, ...photosData.data.hits],

      loadingMore: false,
    }));
  };

  handleSubmit = data => {
    this.setState({ query: data });
  };

  handleLoad = () => {
    this.setState(prev => ({
      page: (prev.page += 1),
    }));
  };
  render() {
    const { isLoading, photoData, maxPage, error, page, loadingMore } =
      this.state;
    console.log(photoData.length);
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {error && <h2 style={{ marginTop: '60px' }}>{error}</h2>}
        {photoData.length > 0 && !isLoading && (
          <ImageGallery photos={photoData}></ImageGallery>
        )}
        {(isLoading || loadingMore) && <Loader />}
        {maxPage > 1 && maxPage !== page && !isLoading && (
          <Button loadingMore={this.handleLoad} />
        )}
      </>
    );
  }
}
