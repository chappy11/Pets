import React from "react";
import { Navigation } from "../../components";
import * as S from "./style";
import HeaderText from "../../components/HeaderText";
import { SizeBox } from "../../components";
import { Accordion, Col, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { Orders } from "../../services/Orders";
import { getItem, KEY } from "../../utils/storage";
import { useEffect, useMemo } from "react";
import { BASE_URL } from "../../services/ApiClient";
import { formatCurrency } from "../../utils/Money";
import { Subtitle, ListItem, Container, Button } from "../../components";
import Empty from "../../components/Empty";

export default function MyOrder() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const res = await Orders.getuserorder(user.user_id);

    if (res.data.status == 1) {
      setData(res.data.data);
    }
  };

  const displayEmpty = useMemo(() => {
    return data.length < 1 && <Empty type="order" />;
  }, [data]);

  return (
    <>
      <Navigation />
      <SizeBox height={10} />
      <Container>
        <SizeBox height={30} />
        <HeaderText>My Order</HeaderText>
        <Accordion>
          {data.map((val, i) => (
            <>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{val.reference}</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <HeaderText>
                      {formatCurrency(parseFloat(val.totalAmount))}
                    </HeaderText>
                    {val.products.map((item, i) => (
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
                        <SizeBox height={10} />
                      </>
                    ))}
                    <SizeBox height={15} />
                    <Button
                      variant="dark"
                      onClick={() =>
                        (window.location.href = `/vieworder/${val.order_id}/${val.reference}`)
                      }
                    >
                      View Order Status
                    </Button>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
              <SizeBox height={10} />
            </>
          ))}
        </Accordion>
        <SizeBox height={30} />
        {displayEmpty}
      </Container>
    </>
  );
}
