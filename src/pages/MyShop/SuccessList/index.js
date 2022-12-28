import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Orders } from "../../../services/Orders";
import { getItem, KEY } from "../../../utils/storage";
import { useEffect } from "react";
import { formatCurrency } from "../../../utils/Money";
import HeaderText from "../../../components/HeaderText";
import swal from "sweetalert";
import { Container, SizeBox } from "../../../components";
import { useCallback } from "react";
import usePrompts from "../../../hooks/usePrompts";

export default function SuccessList() {
  const [order, setOrder] = useState([]);
  const { alertError } = usePrompts();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const res = await Orders.getShopOrder(user.shop_id, "5");
      if (res.data.status == 1) {
        setOrder(res.data.data);
      }
    } catch (error) {
      alertError();
    }
  };

  return (
    <>
      <Sidebar>
        <Container>
          <SizeBox height={20} />
          <HeaderText>Customer Receive the Item</HeaderText>
          <Table responsive={"md"} bordered={true}>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Reference Number</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>View</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Sidebar>
    </>
  );
}
