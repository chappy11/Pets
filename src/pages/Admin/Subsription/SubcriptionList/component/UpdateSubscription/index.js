import React from "react";
import { Modal } from "react-bootstrap";
import {
  HeaderText,
  SizeBox,
  TextInput,
  Button,
} from "../../../../../../components";

export default function UpdateSubscription(props) {
  const { isOpen, setIsOpen, dataToBeUpdate, dataOnUpdate, handleUpdate } =
    props;

  return (
    <Modal show={isOpen}>
      <Modal.Header>
        <HeaderText>Update Subscription</HeaderText>
      </Modal.Header>
      <Modal.Body>
        <TextInput
          name="subname"
          placeholder={dataToBeUpdate?.subscriptionName}
          label="Subscription Name"
          onChange={dataOnUpdate}
        />
        <SizeBox height={10} />
        <TextInput
          name="subdesc"
          placeholder={dataToBeUpdate?.subDescription}
          onChange={dataOnUpdate}
        />
        <SizeBox height={10} />
        <TextInput
          name="price"
          type="number"
          placeholder={dataToBeUpdate?.subprice?.toString()}
          label="Price"
          onChange={dataOnUpdate}
        />
        <SizeBox height={10} />
        <TextInput
          name="noMonths"
          type="number"
          placeholder={`${dataToBeUpdate?.noMonths} months`}
          label="Number of Months"
          onChange={dataOnUpdate}
        />
        <SizeBox height={10} />
        <TextInput
          name="limit"
          type="number"
          placeholder={dataToBeUpdate?.price_limit}
          label="Price Item Limit"
          onChange={dataOnUpdate}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate}>Update</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
