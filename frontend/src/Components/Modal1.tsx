import { useState } from "react";
import "./modal.css"
function Modal1(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open the modal */}
      <button onClick={toggleModal}>Open Modal</button>

      {/* Modal */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Modal Title</h2>
              <button onClick={toggleModal}>x</button>
            </div>
            <div className="modal-body">
              <p>Modal content goes here.</p>
            </div>
            <div className="modal-footer">
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal1;
