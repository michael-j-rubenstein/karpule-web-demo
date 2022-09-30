import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose}></Backdrop>
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
