import React from "react";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${styles.modal} ${props.className}`}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose}></Backdrop>
      <ModalOverlay className={props.className}>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
