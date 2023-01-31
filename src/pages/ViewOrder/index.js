import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Row, Col, Button, Image } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import {
  Navigation,
  SizeBox,
  Container,
  Text,
  Button as CustomButton,
} from "../../components";
import HeaderText from "../../components/HeaderText";
import Subtitle from "../../components/Subtitle";
import ListItem from "../../components/ListItem";
import { Orders } from "../../services/Orders";
import { formatCurrency } from "../../utils/Money";
import { BASE_URL } from "../../services/ApiClient";
import * as S from "./style";

import OrderStatus from "./component/OrderStatus";
import usePrompts from "../../hooks/usePrompts";
import { defaultThemes } from "../../constants/DefaultThemes";
import { formatDisplayDate } from "../../utils/date";

export default function ViewOrder() {
  const [data, setData] = useState([]);
  const params = useParams();

  const { alertSuccess, alertError } = usePrompts();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await Orders.getorderbyShop(params.id);
    console.log("RESPONSE", res.data.data);
    if (res.data.status == 1) {
      setData(res.data.data);
    }
  };

  const cancelOrder = async (shop_id) => {
    try {
      const payload = {
        shop_id: shop_id,
        order_id: params.id,
        remarks: "",
        cancelBy: "customer",
      };

      const resp = await Orders.cancelOrder(payload);

      if (resp.data.status == "1") {
        alertSuccess(resp.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateStatus = async (payload) => {
    try {
      const resp = await Orders.updateStatus(payload);

      if (resp.data.status == "1") {
        getData();
        alertSuccess(resp.data.message);
        return;
      }

      alertError(resp.data.message);
    } catch (e) {
      alertError();
    }
  };

  function handleReceivedItems() {
    const payload = {
      id: params.id,
      status: "5",
    };

    updateStatus(payload);
  }

  function handleCancel(shop_id) {
    cancelOrder(shop_id);
  }

  return (
    <>
      <Navigation />
      <SizeBox height={10} />
      <Container>
        <SizeBox height={30} />
        <HeaderText color={defaultThemes.secondary}>
          {params.reference}
        </HeaderText>
        <Accordion>
          {data.map((val, i) => (
            <>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>
                  <Subtitle>{val.shop_name}</Subtitle>
                </Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <S.InfoContainer>
                      <S.Container alignment="flex-start">
                        <Text>
                          {val.paid != val.totalAmount && val.status !== "5"
                            ? `You have current balance of ${formatCurrency(
                                val.totalAmount - val.paid
                              )}`
                            : ""}
                        </Text>
                        <Text>Order Status:</Text>
                        <OrderStatus status={val.status} />
                        <p>{formatDisplayDate(val.shopOrderUpdateAt)}</p>
                      </S.Container>
                      <S.Container alignment="flex-end">
                        {val.status === "0" &&
                          data[0].payment_method === "0" && (
                            <div>
                              <CustomButton
                                color="red"
                                onClick={() => handleCancel(val.shop_id)}
                              >
                                Cancel Order
                              </CustomButton>
                            </div>
                          )}
                      </S.Container>
                    </S.InfoContainer>
                    {val.items.map((item, i) => (
                      <>
                        <Row>
                          <Col>
                            <Image
                              src={BASE_URL + item.productImage}
                              sizes={"150px"}
                              style={{ width: 150, height: 150 }}
                            />
                          </Col>
                          <Col>
                            <SizeBox height={50} />
                            <Subtitle>
                              <Link to={`/viewproduct/${item.product_id}`}>
                                {" "}
                                {item.productName}
                              </Link>
                            </Subtitle>
                            <SizeBox height={10} />
                            <ListItem
                              label="Number of Items: "
                              value={item.orderItemNo + " " + item.unit}
                            />
                            <ListItem
                              label="Total Amount: "
                              value={formatCurrency(
                                parseFloat(item.orderItemAmount)
                              )}
                            />
                          </Col>
                        </Row>
                        <SizeBox height={10} />
                      </>
                    ))}
                    <SizeBox height={15} />
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
              <SizeBox height={10} />
            </>
          ))}
        </Accordion>
      </Container>
    </>
  );
}
