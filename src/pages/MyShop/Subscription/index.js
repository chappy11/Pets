import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import useGetSubscription from "../../../hooks/useGetSubscription";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import * as S from "./style";
import { Subscription as Sub } from "../../../services/Subscription";
import { HeaderText } from "../../../components";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { Shop } from "../../../services/Shop";
import usePrompts from "../../../hooks/usePrompts";
export default function Subscription() {
  const { subscriptions } = useGetSubscription();
  const [sub, setSub] = useState(null);
  const { user } = useGetUserFromStorage();
  const { alertSuccess, alertError } = usePrompts();
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState(null);

  async function handleClick(sub_id, price_limit) {
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
      return;
    }
    setIsLoading(false);
  }

  const displaySubscriptList = useMemo(() => {
    return subscriptions?.map((val, i) => (
      <Col md={4}>
        <S.Card
          onClick={() => handleClick(val.subscription_id, val.price_limit)}
          color={
            val.subscription_id === (select ? select : user?.subscription_id)
              ? defaultThemes.secondary
              : defaultThemes.color001
          }
        >
          <HeaderText color={defaultThemes.white}>
            {val.subscriptionName}
          </HeaderText>
          <S.MonthText>{val.noMonths} months</S.MonthText>
        </S.Card>
      </Col>
    ));
  }, [subscriptions, isLoading, setIsLoading, user]);

  return (
    <Sidebar>
      <h3>My Subscription</h3>
      <Container>
        <Row>{displaySubscriptList}</Row>
      </Container>
    </Sidebar>
  );
}
