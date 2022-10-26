import React, { useState } from "react";
import { Row, Col, Form, Image, Table } from "react-bootstrap";
import useActiveItem from "../../hooks/useActiveItem";
import { BASE_URL } from "../../services/ApiClient";
import { Navigation, SizeBox, Container, Button, Text } from "../../components";
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
    if (isHalf === "") {
      swal("Warning", "Please Choose Payment", "warning");
      return;
    }

    setIsOpen(true);
  }

  const processCheckout = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const payload = {
      user_id: user?.user_id,
      total_amount: getTotal(),
      isHalf: parseInt(isHalf),
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
        <h5>Confirm Order</h5>
        <SizeBox height={30} />
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
        <h5>Total: {formatCurrency(parseFloat(displayTotal()))}</h5>
        <Button onClick={handleCheckout}>Confirm Order Now</Button>
      </Container>
    </>
  );
}
