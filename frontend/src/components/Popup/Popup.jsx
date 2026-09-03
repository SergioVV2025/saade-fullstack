import { useEffect } from "react";
import Cerrar from "../../assets/images/close.svg";

function Popup({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  function handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen ? "popup_is-opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <img src={Cerrar} alt="" />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Popup;
