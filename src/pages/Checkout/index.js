import React, { useState, useMemo } from "react";
import { Form, Image, Table, Row, Col } from "react-bootstrap";
import useActiveItem from "../../hooks/useActiveItem";
import { BASE_URL } from "../../services/ApiClient";
import {
  Navigation,
  SizeBox,
  Container,
  Button,
  Text,
  HeaderText,
} from "../../components";
import swal from "sweetalert";
import { Orders } from "../../services/Orders";
import { getItem, KEY } from "../../utils/storage";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { formatCurrency } from "../../utils/Money";
import PaymentMethod from "./components/PaymentMethod";

export default function Checkout() {
  const { item } = useActiveItem();
  const [isHalf, setIsHalf] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const onChange = (e) => {
    setIsHalf(e.target.value);
  };

  const onChangePayment = (e) => {
    setPaymentMethod(e.target.value);
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
    if (paymentMethod === "") {
      swal("Warning", "Please Choose Payment Method", "warning");
      return;
    }

    if (isHalf === "" && paymentMethod == "1") {
      swal("Warning", "Please Choose Payment", "warning");
      return;
    }

    if (paymentMethod == "0") {
      processCheckout();
      return;
    }

    setIsOpen(true);
  }

  const processCheckout = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const payload = {
      user_id: user?.user_id,
      total_amount: getTotal(),
      isHalf: paymentMethod == "1" ? parseInt(isHalf) : 0,
      payment_method: paymentMethod,
    };
    const res = await Orders.checkout(payload);
    if (res.data.status == 1) {
      setIsOpen(false);
      swal("Success", "Order Created", "success");
      window.location.href = "/order";
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const displayPay = useMemo(() => {
    if (paymentMethod === "1") {
      return (
        <>
          <Text>Pay</Text>
          <Form.Check
            type="radio"
            label="Downpayment (50%)"
            name="isHalf"
            value="1"
            onChange={onChange}
          />
          <Form.Check
            type="radio"
            label="Full Payment"
            name="isHalf"
            value="0"
            onChange={onChange}
          />
        </>
      );
    }

    if (paymentMethod == "0") {
      return (
        <Text color={"red"}>
          Note: Delivery Fee is not included in the total amount
        </Text>
      );
    }
  }, [paymentMethod]);
  console.log(paymentMethod);
  return (
    <>
      <Navigation />
      <SizeBox height={20} />
      <PaymentMethod
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        checkout={processCheckout}
        total={parseFloat(getTotal())}
      />
      <Container>
        <HeaderText>Checkout</HeaderText>
        <SizeBox height={30} />
        <Row>
          <Col>
            <Text>Payment Method</Text>
            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="1"
              onChange={onChangePayment}
            />
            <Form.Check
              type="radio"
              label="Cash On Delivery (COD)"
              name="paymentMethod"
              value="0"
              onChange={onChangePayment}
            />
            <SizeBox height={20} />
            {displayPay}
            <SizeBox height={30} />
            <h5>Total: {formatCurrency(parseFloat(displayTotal()))}</h5>
            <SizeBox height={20} />
            <Button onClick={handleCheckout}>Confirm Order Now</Button>
          </Col>
          <Col>
            <Table>
              <tbody>
                {item.map((val) => (
                  <>
                    <tr key={val.product_id}>
                      <td>
                        <Image
                          src={BASE_URL + val.productImage}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td>
                        <Text>{val.productName}</Text>
                      </td>
                      <td>
                        <p>{val.totalAmount}</p>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
