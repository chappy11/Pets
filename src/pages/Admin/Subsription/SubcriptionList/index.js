import React, { useMemo, useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { HeaderText, Line, Container, Button } from "../../../../components";
import useGetSubscription from "../../../../hooks/useGetSubscription";
import usePrompts from "../../../../hooks/usePrompts";
import { Subscription } from "../../../../services/Subscription";
import { formatCurrency } from "../../../../utils/Money";
import Sidebar from "../../component/Sidebar";
import AddSubscription from "./component/AddSubscription";
import * as S from "./style";

export default function SubscriptionList() {
  const { subscriptions, setIsRefreshing } = useGetSubscription();
  const [isShow, setIsShow] = useState(false);
  const { alertSuccess, alertWarning, alertError } = usePrompts();
  const [data, setData] = useState({
    subname: "",
    noMonths: 0,
    price: 0,
    subdesc: "",
    limit: 0,
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatMonth = useCallback(
    (noMonth) => {
      return noMonth < 2 ? `${noMonth} month` : `${noMonth} months`;
    },
    [subscriptions]
  );

  const displayTable = useMemo(() => {
    return subscriptions.map((val, i) => (
      <tr id={val.sub_id}>
        <td>{val.subscriptionName}</td>
        <td>{formatMonth(val.noMonths)}</td>
        <td>{formatCurrency(+val.subprice)}</td>
        <td>{formatCurrency(+val.price_limit)}</td>
      </tr>
    ));
  }, [subscriptions]);

  function handleAddSubscription() {
    if (data.subname === "" || data.subdesc === "") {
      alertWarning("Fillout all fields");
      return;
    }

    if (data.noMonths < 1) {
      alertWarning("Number of months should not be less 1");
      return;
    }

    if (data.price < 1) {
      alertWarning("Prices should not be less than 1 pesos");
      return;
    }

    if (data.limit < 1) {
      alertWarning("Limit should not be less than 1 pesos");
      return;
    }

    createSub();
  }

  const createSub = async () => {
    try {
      const payload = {
        subscriptionName: data.subname,
        description: data.subdesc,
        noMonths: data.noMonths,
        price: data.price,
        limit: data.limit,
      };
      const resp = await Subscription.createSubscription(payload);
      if (resp.data.status == "1") {
        setIsRefreshing(true);
        alertSuccess(resp.data.message);
      } else {
        alertError(resp.data.message);
      }
    } catch (e) {
      alertError();
    }
  };

  console.log("Payload", data);
  return (
    <Sidebar>
      <Container>
        <AddSubscription
          isShow={isShow}
          onChange={onChange}
          setIsShow={setIsShow}
          handleAddSubscription={handleAddSubscription}
        />
        <S.Header>
          <S.TextContainer>
            <HeaderText>Subscription list</HeaderText>
          </S.TextContainer>
          <S.ButtonContainer>
            <Button onClick={() => setIsShow(true)}>
              Create New Subscription
            </Button>
          </S.ButtonContainer>
        </S.Header>
        <Line />
        <Table>
          <thead>
            <tr>
              <th>Subscription Name</th>
              <th>Months</th>
              <th>Price</th>
              <th>Price Limit</th>
            </tr>
          </thead>
          <tbody>{displayTable}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
