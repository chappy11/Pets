import React from "react";
import { useState, useMemo, useCallback } from "react";
import { Form, Modal, Table } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import { Orders } from "../../../services/Orders";
import { getItem, KEY } from "../../../utils/storage";
import { useEffect } from "react";
import { formatCurrency } from "../../../utils/Money";
import HeaderText from "../../../components/HeaderText";
import swal from "sweetalert";
import { SizeBox, Container, Button } from "../../../components";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { RemoveRedEye, SwipeRight } from "@mui/icons-material";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import usePrompts from "../../../hooks/usePrompts";

export default function PendingList() {
  const [order, setOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentShopOrderId, setCurrentShopOrderId] = useState("");
  const [remarks, setRemarks] = useState("");
  const { user } = useGetUserFromStorage();
  const { alertSuccess, alertError } = usePrompts();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const res = await Orders.getShopOrder(user.shop_id, "0");
    if (res.data.status == 1) {
      setOrder(res.data.data);
    }
  };

  const handleUpdate = useCallback(
    async (id) => {
      const payload = {
        id,
        status: "1",
      };
      const resp = await Orders.updateStatus(payload);
      if (resp.data.status == 1) {
        filterNewData(id);
        swal("Success", resp.data.message, "success");
        return;
      }

      swal("Error", resp.data.message, "error");
    },
    [order, setOrder]
  );

  const filterNewData = (id) => {
    const newData = order.filter((val) => val.shoporder_id !== id);

    setOrder(newData);
  };
  const displayTable = useMemo(() => {
    return order.map((val, i) => (
      <tr>
        <td>{val.createAt}</td>

        <td>{val.referenceNo}</td>
        <td>{`${val.firstname} ${val.middlename} ${val.lastname}`}</td>
        <td>{formatCurrency(parseFloat(val.shopordertotal))}</td>
        <td>{formatCurrency(parseFloat(val.shoporderpaid))}</td>
        <td>
          <Button
            color={defaultThemes.pending}
            onClick={() =>
              (window.location.href = `/viewordershop/${val.order_id}/${val.shopReference}`)
            }
          >
            <RemoveRedEye /> View
          </Button>
        </td>
        <td>
          <Button
            color={defaultThemes.accepted}
            onClick={() => handleUpdate(val.shoporder_id)}
          >
            <SwipeRight />
            Accept Order
          </Button>
        </td>
        <td>
          <Button
            onClick={() => handleClickDecline(val.shoporder_id, val.order_id)}
            color="red"
          >
            Decline
          </Button>
        </td>
      </tr>
    ));
  }, [order, setOrder]);

  useEffect(() => {
    getData();
  }, []);

  function handleClickDecline(shoporder_id, order_id) {
    setCurrentId(order_id);
    setCurrentShopOrderId(shoporder_id);
    setIsOpen(true);
  }

  async function handleClick() {
    const payload = {
      order_id: currentId,
      shop_id: user?.shop_id,
      remarks: remarks,
      cancelBy: "shop",
    };

    if (remarks == "") {
      alertError("Fill out all fields");
      return;
    }

    const resp = await Orders.cancelOrder(payload);

    if (resp.data.status == "1") {
      filterNewData(currentShopOrderId);
      setIsOpen(false);
      alertSuccess();
    } else {
      alertError();
    }
  }

  return (
    <>
      <Sidebar>
        <Container>
          <SizeBox height={20} />
          <Modal show={isOpen}>
            <Modal.Header>Reason for declining {currentId}</Modal.Header>
            <Modal.Body>
              <Form.Control
                as="textarea"
                row={3}
                placeholder="Your Reason..."
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleClick()}>Confirm</Button>
              <Button onClick={() => setIsOpen(false)} color="red">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <HeaderText>Pending List</HeaderText>
          <Table responsive={"md"} bordered={true}>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Reference Number</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Total Paid</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{displayTable}</tbody>
          </Table>
        </Container>
      </Sidebar>
    </>
  );
}
