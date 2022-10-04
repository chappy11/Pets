import { Modal, ModalHeader } from "react-bootstrap";
import {
  Button,
  HeaderText,
  SizeBox,
  TextInput,
} from "../../../../../../components";

export default function AddSubscription(props) {
  const { isShow, setIsShow, handleAddSubscription, onChange } = props;

  return (
    <Modal show={isShow}>
      <ModalHeader>
        <HeaderText>Add Subscription</HeaderText>
      </ModalHeader>
      <Modal.Body>
        <TextInput
          name="subname"
          placeholder="Subscription Name"
          label="Subscription Name"
          onChange={onChange}
        />
        <SizeBox height={10} />
        <TextInput
          type={"number"}
          name="noMonths"
          placeholder={"0"}
          label="Number of Months"
          onChange={onChange}
        />
        <SizeBox height={10} />
        <TextInput
          type={"number"}
          name="price"
          placeholder={"0"}
          label="Price"
          onChange={onChange}
        />
        <TextInput
          type={"number"}
          name="limit"
          placeholder={"0"}
          label="Price Limit"
          onChange={onChange}
        />
        <SizeBox height={10} />
        <TextInput
          name="subdesc"
          placeholder="Description"
          label="Subscription Description"
          onChange={onChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddSubscription}>Create</Button>
        <Button onClick={() => setIsShow(false)} color={"red"}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
