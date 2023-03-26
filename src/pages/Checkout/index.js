import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Form, Image, Table, Row, Col } from "react-bootstrap";
import useActiveItem from "../../hooks/useActiveItem";
import { BASE_URL } from "../../services/ApiClient";
import * as S from "./style";
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
import { formatCurrency, getDiscount } from "../../utils/Money";
import PaymentMethod from "./components/PaymentMethod";
import usePrompts from "../../hooks/usePrompts";
import useGetUserVouchers from "../../hooks/useGetUserVouchers";

export default function Checkout() {
  const { item, arr } = useActiveItem();
  const { sendRequest, data: myvouchers } = useGetUserVouchers();
  const { alertWithCallBack, alertError } = usePrompts();
  const [selectVoucher, setSelectVoucher] = useState(null);
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

  const getUserVoucher = async () => {
    const user = await getItem(KEY.ACCOUNT);

    const load = {
      user_id: user.user_id,
      shops: arr,
    };

    sendRequest(load);
  };

  useEffect(() => {
    getUserVoucher();
  }, [arr]);

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

  const displayDiscount = () => {
    let discount = 0;
    const total = getTotal();

    if (selectVoucher) {
      discount = getDiscount(total, selectVoucher.percent);
    }

    return discount;
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
      hasVoucher: selectVoucher ? 1 : 0,
      uservoucher_id: selectVoucher ? selectVoucher.uservoucher_id : 0,
    };
    const res = await Orders.checkout(payload);
    if (res.data.status == 1) {
      setIsOpen(false);
      alertWithCallBack({
        title: "Success",
        type: "success",
        message: "Successfully Ordered",
        onConfirm: () => (window.location.href = "/order"),
      });
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

  const displayVoucher = useMemo(() => {
    return myvouchers.map((x, i) => (
      <S.VoucherCard
        onClick={() => setSelectVoucher(x)}
        isSelected={selectVoucher?.uservoucher_id === x?.uservoucher_id}
      >
        <div>
          <p>Vouchers</p>
          <p>{x.percent}% Discount</p>
        </div>
      </S.VoucherCard>
    ));
  }, [myvouchers, selectVoucher]);

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
            <table className=" table table-borderless">
              <tbody>
                <tr>
                  <td>
                    <S.MyLabel>Principal Amount</S.MyLabel>
                  </td>
                  <td>{formatCurrency(parseFloat(displayTotal()))}</td>
                </tr>
                <tr>
                  <td>
                    <S.MyLabel>Total Discount</S.MyLabel>
                  </td>
                  <td>{formatCurrency(parseFloat(displayDiscount()))}</td>
                </tr>
                <tr>
                  <td>
                    <S.MyLabel>Total Amount</S.MyLabel>
                  </td>{" "}
                  <td>
                    <S.Total>
                      {" "}
                      {formatCurrency(
                        parseFloat(displayTotal()) - displayDiscount()
                      )}
                    </S.Total>
                  </td>
                </tr>
              </tbody>
            </table>

            <SizeBox height={20} />
            <Button onClick={handleCheckout}>Confirm Order Now</Button>
            <SizeBox height={10} />
            <h5>Voucher Available</h5>
            {displayVoucher}
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
