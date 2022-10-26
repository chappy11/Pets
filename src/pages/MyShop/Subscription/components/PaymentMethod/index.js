import { PayPalButtons } from "@paypal/react-paypal-js";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { SizeBox, Text } from "../../../../../components";
import * as S from "./style";

const PAYPAL = require("../../../../../asset/paypal.png");

export default function PaymentMethod(props) {
  const { isOpen, setIsOpen, subscribe } = props;
  return (
    <Modal show={isOpen}>
      <Modal.Header>PayWith</Modal.Header>

      <SizeBox height={20} />
      <Modal.Body>
        <S.ImageContainer>
          <S.Image src={PAYPAL} />
        </S.ImageContainer>
        <Text>Pay your subscrption with</Text>
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
              subscribe();
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
