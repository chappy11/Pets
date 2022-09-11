import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Stack,
  Image,
  Button,
} from "react-bootstrap";
import useActiveItem from "../../hooks/useActiveItem";
import { BASE_URL } from "../../services/ApiClient";
import { Navigation, SizeBox } from "../../components";
import swal from "sweetalert";
import { Orders } from "../../services/Orders";
import { getItem, KEY } from "../../utils/storage";
import Paypal from "./components/Paypal";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { formatCurrency } from "../../utils/Money";

export default function Checkout() {
  const { item } = useActiveItem();
  const [isHalf, setIsHalf] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const onChange = (e) => {
    setIsHalf(e.target.value);
  };

  const displayTotal = () => {
    let total = 0;

    item.forEach((val) => {
      total += parseFloat(val.totalAmount);
    });
    if (isHalf === "" || isHalf === "0") {
      return total;
    } else {
      return parseFloat(total) / 2;
    }
  };

  const getTotal = () => {
    let total = 0;

    item.forEach((val) => {
      total += parseFloat(val.totalAmount);
    });

    return total;
  };
  async function handleCheckout() {
    const user = await getItem(KEY.ACCOUNT);
    if (isHalf === "") {
      swal("Warning", "Please Choose Payment", "warning");
    } else {
      const payload = {
        user_id: user?.user_id,
        total_amount: getTotal(),
        isHalf: parseInt(isHalf),
      };
      const res = await Orders.checkout(payload);
      if (res.data.status == 1) {
        swal("Success", "Please Choose Payment", "success");
      } else {
        swal("Error", "Something went wrong", "error");
      }
    }
  }

  return (
    <>
      <Navigation />
      <SizeBox height={20} />

      <Container>
        <h5>Confirm Order</h5>
        <SizeBox height={30} />
        {item.map((val) => (
          <>
            <Row key={val.product_id}>
              <Col>
                <Image
                  src={BASE_URL + val.productImage}
                  width={100}
                  height={100}
                />
              </Col>
              <Col>
                <h5 key={val?.shop_id}>{val.productName}</h5>
              </Col>
              <Col>
                <p>{val.totalAmount}</p>
              </Col>
            </Row>
            <SizeBox height={20} />
          </>
        ))}

        <p>Pay</p>
        <Form.Check
          type="radio"
          label="Pay 50%"
          name="isHalf"
          value="1"
          onChange={onChange}
        />
        <Form.Check
          type="radio"
          label="Pay amount"
          name="isHalf"
          value="0"
          onChange={onChange}
        />
        <SizeBox height={30} />
        <h5>Total: {Number(displayTotal()).toFixed(2)}</h5>
        <Button onClick={handleCheckout}>Chekcout</Button>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: 500,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              swal("Success", "Successully paid", "success");
            });
          }}
          onError={(err) => {
            console.log("ERROR", JSON.parse(err));
            swal("Error", "Something went wrong", "error");
          }}
        />
      </Container>
    </>
  );
}
