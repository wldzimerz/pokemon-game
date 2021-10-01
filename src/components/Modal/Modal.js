import { useEffect, useRef } from "react";
import classNames from "classnames";

import s from "./Modal.module.css";

const Modal = ({ isOpen, title, children, onCloseModal }) => {
  const modalEl = useRef();

  useEffect(() => {
    document.querySelector("body").style.overflow = isOpen ? "hidden" : null;
  }, [isOpen]);

  const handleCloseModal = () => {
    onCloseModal && onCloseModal(true);
  };

  const handleClickRoot = (e) => {
    if (!modalEl.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  return (
    <div className={classNames(s.root, { [s.open]: isOpen })} onClick={handleClickRoot}>
      <div ref={modalEl} className={s.modal}>
        <div className={s.head}>
          {title}
          <span className={s.btnClose} onClick={handleCloseModal}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
