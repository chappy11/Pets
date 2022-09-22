import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Container, Row, Col, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Navigation, SizeBox } from "../../components";
import HeaderText from "../../components/HeaderText";
import Subtitle from "../../components/Subtitle";
import ListItem from "../../components/ListItem";
import { Orders } from "../../services/Orders";
import { formatCurrency } from "../../utils/Money";
import { BASE_URL } from "../../services/ApiClient";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import OrderStatus from "./component/OrderStatus";

export default function ViewOrder() {
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await Orders.getorderbyShop(params.id);

    if (res.data.status == 1) {
      setData(res.data.data);
    }
  };
  return (
    <>
      <Navigation />
      <Container>
        <SizeBox height={30} />
        <HeaderText>{params.reference}</HeaderText>
        <Accordion>
          {data.map((val, i) => (
            <>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{val.shop_name}</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <OrderStatus status={val.status} />
                    {val.status === "3" && <Button>Received Order</Button>}
                    {/* <HeaderText>
                      {formatCurrency(parseFloat(val.totalAmount))}
                    </HeaderText> */}
                    {val.items.map((item, i) => (
                      <Row>
                        <Col>
                          <Image
                            src={BASE_URL + item.productImage}
                            sizes={"150px"}
                            style={{ width: 150, height: 150 }}
                          />
                        </Col>
                        <Col>
                          <Subtitle>{item.productName}</Subtitle>
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