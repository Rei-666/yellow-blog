import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalInterface } from '../interfaces';

const CustomModal = ({
  title, children, show, handleClose
}: ModalInterface) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;
