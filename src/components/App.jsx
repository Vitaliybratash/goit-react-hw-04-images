import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { getData } from '../Services/api';
import { Button } from './Button';
import { useState, useEffect } from 'react';
export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (search) {
      toggleLoader();
      getData(search)
        .then(data => {
          if (data.totalHits > 12) {
            toggleBtn();
          }
          setImages(data.hits);
        })
        .finally(toggleLoader);
    }
  }, [search]);
  useEffect(() => {
    if (page !== 1) {
      getData(search, page).then(data => {
        if (data.hits.length < 12) {
          toggleBtn();
        }
        setImages(prevState => [...prevState, ...data.hits]);
      });
    }
  }, [page, search]);
  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  const submitHandler = input => {
    reset();
    setSearch(input);
  };

  const toggleLoader = () => setLoading(prevLoading => !prevLoading);

  const toggleBtn = () => setShowButton(prevShowButton => !prevShowButton);

  const toggleModal = imgUrl => {
    setShowModal(prevshowModal => !prevshowModal);
    setImgUrl(imgUrl);
  };

  const reset = () => {
    setPage(1);
    setShowButton(false);
  };
  return (
    <>
      <Searchbar submitHandler={submitHandler} />
      {loading && <Loader />}
      {!loading && <ImageGallery images={images} toggleModal={toggleModal} />}
      {showButton && <Button loadMoreHandler={loadMoreHandler} />}
      {showModal && <Modal onClose={toggleModal} imgUrl={imgUrl} />}
    </>
  );
};
