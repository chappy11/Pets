import { PayPalButtons } from "@paypal/react-paypal-js";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { HeaderText } from "../../../../components";
export default function PaymentMethod(props) {
  const { isOpen, setIsOpen, checkout } = props;
  return (
    <Modal show={isOpen}>
      <Modal.Header>
        <HeaderText>Pay With:</HeaderText>
      </Modal.Header>
      <Modal.Body>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: props.total,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              checkout();
            });
          }}
          onError={(err) => {
            console.log("ERROR", JSON.parse(err));
            swal("Error", "Something went wrong", "error");
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
