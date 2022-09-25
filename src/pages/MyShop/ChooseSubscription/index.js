import React from "react";
import Sidebar from "../components/Sidebar";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import useGetSubscription from "../../../hooks/useGetSubscription";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import { Subscription } from "../../../services/Subscription";
import { Shop } from "../../../services/Shop";
import swal from "sweetalert";
import { save } from "../../../utils/storage";
import DashBoardCard from "../../../components/DashBoardCard";

export default function ChooseSubscription() {
  const { user } = useGetUserFromStorage();
  const { subscriptions } = useGetSubscription();

  function displayMonthString(noMonths) {
    return noMonths < 2 ? "month" : "months";
  }

  async function handleSubscribe(sub_id) {
    const payload = {
      shop_id: user.shop_id,
      subscription_id: sub_id,
    };

    const resp = await Shop.subscribe(payload);

    if (resp.data.status == 1) {
      const newUser = { ...user, subscription_id: sub_id };
      await save(newUser);
      swal("Congratualtion", resp.data.message, "success").then((res) => {
        window.location.href = "/mysubscription";
      });
    } else {
      swal("Oops", "Something went wrong", "error");
    }
  }
  return (
    <Sidebar>
      <h3>My Subscription</h3>
      <Container>
        <Row>
          {subscriptions.map((val, idx) => (
            <Col md={4}></Col>
          ))}
        </Row>
      </Container>
    </Sidebar>
  );
}
