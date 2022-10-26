import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import useGetSubscription from "../../../hooks/useGetSubscription";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import * as S from "./style";
import { Subscription as Sub } from "../../../services/Subscription";
import {
  HeaderText,
  ListItem,
  SizeBox,
  Text,
  Title,
} from "../../../components";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { Shop } from "../../../services/Shop";
import usePrompts from "../../../hooks/usePrompts";
import { displayStringMonth } from "../../../utils/String";
import { formatCurrency } from "../../../utils/Money";
import PaymentMethod from "./components/PaymentMethod";

export default function Subscription() {
  const { subscriptions } = useGetSubscription();
  const { alertWarning } = usePrompts();
  const { user } = useGetUserFromStorage();
  const { alertSuccess, alertError } = usePrompts();
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [paylaod, setPayload] = useState({
    sub_id: "",
    price_limit: "",
    price: "",
  });
  async function subscribe() {
    const { sub_id, price_limit } = paylaod;
    setIsLoading(true);
    const payload = {
      shop_id: user.shop_id,
      subscription_id: sub_id,
    };

    const resp = await Shop.subscribe(payload);
    const newUser = { ...resp.data.data, price_limit: price_limit };
    if (resp.data.status == 1) {
      await localStorage.setItem("Account", JSON.stringify(newUser));
      alertSuccess(resp.data.message);
      setSelect(sub_id);
      //   window.location.href = "/mysubscription";
      setIsLoading(false);
      setIsOpen(false);
      return;
    }
    setIsLoading(false);
  }

  function handleClick(sub_id, price_limit, price) {
    if (user?.subscription_id === sub_id) {
      alertWarning(
        "This is your current subscription please choose another one to upgrade"
      );
      return;
    }

    setIsOpen(true);
    setPayload({
      sub_id: sub_id,
      price_limit: price_limit,
      price: price,
    });
  }

  const displaySubscriptList = useMemo(() => {
    return subscriptions?.map((val, i) => (
      <Col md={4}>
        <S.Card
          onClick={() =>
            handleClick(val.subscription_id, val.price_limit, val.subprice)
          }
        >
          <SizeBox height={15} />
          <S.HeadersText
            color={
              val.subscription_id === (select ? select : user?.subscription_id)
                ? defaultThemes.secondary
                : "gray"
            }
          >
            {val.subscriptionName}
          </S.HeadersText>
          <S.Price>{formatCurrency(+val.subprice)}</S.Price>
          <SizeBox height={20} />
          <Text alignText="center">{val.subDescription}</Text>
          <SizeBox height={10} />
          <ListItem
            label="Number of months"
            value={displayStringMonth(val.noMonths)}
            alignment={"flex-end"}
          />
          <SizeBox height={15} />
          <ListItem
            label="Price Limit"
            value={formatCurrency(+val.price_limit)}
            alignment={"flex-end"}
          />
          <SizeBox height={40} />
          {val.subscription_id === user?.subscription_id ? (
            <Text alignText="center" color={defaultThemes.secondary}>
              This is your current Subscription
            </Text>
          ) : (
            <Text alignText="center">Upgrade your subscription</Text>
          )}
        </S.Card>
      </Col>
    ));
  }, [subscriptions, isLoading, setIsLoading, user]);

  return (
    <Sidebar>
      <Title color={defaultThemes.secondary}>Subscription</Title>
      <PaymentMethod
        setIsOpen={setIsOpen}
        subscribe={subscribe}
        isOpen={isOpen}
        total={paylaod.price}
      />
      <SizeBox height={25} />
      <Container>
        <Row>{displaySubscriptList}</Row>
      </Container>
    </Sidebar>
  );
}
