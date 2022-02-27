import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useOnClickOutside, useOnEscapeKeyDown } from '../hooks';

const Modal = ({ description, onClose }) => {
  const modalContentRef = useRef();
  const element = document.getElementById('__next');

  useOnClickOutside(modalContentRef, onClose);
  useOnEscapeKeyDown(onClose);

  return ReactDOM.createPortal(
    <div className="modal" data-testid="modal">
      <div className="modal-content" ref={modalContentRef}>
        <button type="button" onClick={onClose} className="close-modal-button">
          Close
        </button>
        <h2 className="modal-title">Description</h2>
        <p className="modal-description">
          <pre>{description}</pre>
        </p>
      </div>
    </div>,
    element
  );
};

export default Modal;
