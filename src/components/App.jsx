import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { servicePhotos } from '../photo-api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    page: 1,
    query: null,
    isLoading: false,
    loadingMore: false,
    error: '',
    photosData: [],
    maxPage: null,
    isShowModal: false,
    openedImageSrc: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query &&
      this.state.query.trim().length !== 0
    ) {
      this.setState({ page: 1, photosData: [] }, () => {
        this.servicePhotos();
      });
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      console.log(prevState.query, this.state.query);
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
      photosData: photosData.data.hits,
      isLoading: false,
      maxPage: countPages,
    });
  };

  loadMorePhotos = async () => {
    this.setState({ loadingMore: true });
    const photosData = await servicePhotos(this.state.query, this.state.page);

    this.setState(prev => ({
      photosData: [...prev.photosData, ...photosData.data.hits],
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

  modalOpen = photoSrc => {
    const selectedPhoto = this.state.photosData.find(
      photo => photo.webformatURL === photoSrc
    );
    this.setState({
      openedImageSrc: selectedPhoto.largeImageURL,
      isShowModal: true,
    });
  };
  modalClose = () => {
    this.setState({
      isShowModal: false,
    });
  };

  render() {
    const {
      isLoading,
      photosData,
      maxPage,
      error,
      page,
      loadingMore,
      isShowModal,
      openedImageSrc,
      query,
    } = this.state;
    console.log(
      'query',
      query,
      'isLoading',
      isLoading,
      'photosData',
      photosData,
      'maxPage',
      maxPage,
      'error',
      error,
      'page',
      page,
      'loadingMore',
      loadingMore,
      'isShowModal',
      isShowModal,
      'openedImageSrc',
      openedImageSrc
    );
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {error && <h2 style={{ marginTop: '60px' }}>{error}</h2>}
        {photosData.length > 0 && !isLoading && (
          <ImageGallery
            photos={photosData}
            modalOpen={this.modalOpen}
          ></ImageGallery>
        )}
        {(isLoading || loadingMore) && <Loader />}
        {maxPage > 1 && maxPage !== page && !isLoading && (
          <Button loadingMore={this.handleLoad} />
        )}
        {isShowModal && (
          <Modal close={this.modalClose} openedImage={openedImageSrc}></Modal>
        )}
      </>
    );
  }
}
