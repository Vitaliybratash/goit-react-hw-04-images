import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export const  Modal=({imgUrl,onClose})=> {
  useEffect(()=>{
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }}
    window.addEventListener('keydown', handleKeyDown);
    return ()=>  window.removeEventListener('keydown', handleKeyDown);
  },[onClose])
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  
    return createPortal(
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">
          <img src={imgUrl} alt="Images" />
        </div>
      </div>,
      modalRoot
    );
  }
Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
onClose: PropTypes.func.isRequired,
};
