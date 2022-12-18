import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import { Orders } from "../../../services/Orders";
import { getItem, KEY } from "../../../utils/storage";
import { useEffect } from "react";
import { formatCurrency } from "../../../utils/Money";
import HeaderText from "../../../components/HeaderText";

import { Container, SizeBox, Button } from "../../../components";
import usePrompts from "../../../hooks/usePrompts";

export default function Deliver() {
  const [order, setOrder] = useState([]);
  const { alertSuccess, alertError } = usePrompts();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const res = await Orders.getShopOrder(user.shop_id, "3");
    console.log(res);
    if (res.data.status == 1) {
      setOrder(res.data.data);
    }
  };

  const filterNewData = (id) => {
    const data = order.filter((val) => val.shoporder_id !== id);
    setOrder(data);
  };

  const updateStatus = async (payload) => {
    try {
      const resp = await Orders.updateStatus(payload);

      if (resp.data.status == "1") {
        filterNewData(payload.id);
        alertSuccess(resp.data.message);
        return;
      }

      alertError(resp.data.message);
    } catch (e) {
      alertError();
    }
  };

  function handleReceivedItems(order_id) {
    const payload = {
      id: order_id,
      status: "5",
    };

    updateStatus(payload);
  }

  return (
    <>
      <Sidebar>
        <Container>
          <SizeBox height={20} />
          <HeaderText>Out for Delivery Orders</HeaderText>
          <Table responsive={"md"} bordered={true}>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Reference Number</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Paid</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.map((val, i) => (
                <tr>
                  <td>{val.createAt}</td>

                  <td>{val.referenceNo}</td>
                  <td>
                    {`${val.firstname} ${val.middlename} ${val.lastname}`}
                  </td>
                  <td>{formatCurrency(parseFloat(val.shopordertotal))}</td>
                  <td>
                    {val.shop_order_status !== "5" ? "On Deliver" : "Recieved"}
                  </td>
                  <td>{formatCurrency(+val.shoporderpaid)}</td>
                  <td>
                    <td>
                      <Button
                        onClick={() =>
                          (window.location.href = `/viewordershop/${val.order_id}/${val.shopReference}`)
                        }
                      >
                        View
                      </Button>
                    </td>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleReceivedItems(val.shoporder_id)}
                    >
                      Order Receive
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Sidebar>
    </>
  );
}
