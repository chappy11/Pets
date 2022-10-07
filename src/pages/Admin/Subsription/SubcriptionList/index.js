import React, { useMemo, useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Title,
  Line,
  Container,
  Button,
  Subtitle,
} from "../../../../components";
import { defaultThemes } from "../../../../constants/DefaultThemes";
import useGetSubscription from "../../../../hooks/useGetSubscription";
import usePrompts from "../../../../hooks/usePrompts";
import { Subscription } from "../../../../services/Subscription";
import { formatCurrency } from "../../../../utils/Money";
import Sidebar from "../../component/Sidebar";
import AddSubscription from "./component/AddSubscription";
import UpdateSubscription from "./component/UpdateSubscription";
import * as S from "./style";

export default function SubscriptionList() {
  const { subscriptions, setIsRefreshing } = useGetSubscription();
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { alertSuccess, alertWarning, alertError } = usePrompts();
  const [data, setData] = useState({
    subname: "",
    noMonths: 0,
    price: 0,
    subdesc: "",
    limit: 0,
  });
  const [dataToBeUpdate, setDataToBeUpdate] = useState(null);
  const [updateData, setUpdateData] = useState({
    subname: "",
    noMonths: "",
    price: "",
    subdesc: "",
    limit: "",
  });

  const dataOnUpdate = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

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
      <tr id={val.subscription_id}>
        <td>
          <Subtitle> {val.subscriptionName}</Subtitle>
        </td>
        <td>{formatMonth(val.noMonths)}</td>
        <td>{formatCurrency(+val.subprice)}</td>
        <td>{formatCurrency(+val.price_limit)}</td>
        <td>{val.sub_date_created}</td>
        <td>
          <Link to="/">View</Link>{" "}
        </td>
        <td>
          <Button
            color={defaultThemes.secondary}
            onClick={() => handleOpenUpdate(val.subscription_id)}
          >
            Update
          </Button>
        </td>
      </tr>
    ));
  }, [subscriptions]);

  function handleOpenUpdate(id) {
    const dat = subscriptions.filter((e) => e.subscription_id == id);
    setDataToBeUpdate(dat[0]);
    setIsOpen(true);
  }

  function handleUpdate() {
    const { subname, subdesc, noMonths, limit, price } = updateData;

    const payload = {
      sub_id: dataToBeUpdate?.subscription_id,
      subname: subname == "" ? dataToBeUpdate?.subscriptionName : subname,
      subdesc: subdesc == "" ? dataToBeUpdate?.subDescription : subdesc,
      noMonths: +noMonths < 1 ? dataToBeUpdate?.noMonths : noMonths,
      price: +price < 1 ? dataToBeUpdate?.subprice : price,
      limit: +limit < 1 ? dataToBeUpdate?.limit : limit,
    };

    update(payload);
  }

  async function update(payload) {
    try {
      const resp = await Subscription.updateSubscription(payload);
      if (resp.data.status == 1) {
        alertSuccess(resp.data.message);
        setIsRefreshing(true);
        setIsOpen(false);
        return;
      }

      alertError();
    } catch (e) {
      alertError();
    }
  }

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

  return (
    <Sidebar>
      <Container>
        <UpdateSubscription
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dataToBeUpdate={dataToBeUpdate}
          dataOnUpdate={dataOnUpdate}
          handleUpdate={handleUpdate}
        />
        <AddSubscription
          isShow={isShow}
          onChange={onChange}
          setIsShow={setIsShow}
          handleAddSubscription={handleAddSubscription}
        />
        <S.Header>
          <S.TextContainer>
            <Title>Subscription Management</Title>
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
              <th>Date Created</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{displayTable}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
