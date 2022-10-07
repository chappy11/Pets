import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { HeaderText, TextInput, Button } from "../../../../components";

export default function CreateCategory(props) {
  const { isOpen, setIsOpen, onChange, create } = props;

  return (
    <Modal show={isOpen}>
      <Modal.Header>
        <HeaderText>Create New Category</HeaderText>
      </Modal.Header>
      <Modal.Body>
        <TextInput
          label="Create Category"
          placeholder="Enter New Category"
          onChange={onChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={create}>Create</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
