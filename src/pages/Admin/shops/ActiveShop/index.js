import { Avatar } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Container, SizeBox, Button } from "../../../../components";
import usePrompts from "../../../../hooks/usePrompts";
import { BASE_URL } from "../../../../services/ApiClient";
import { Shop } from "../../../../services/Shop";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function ActiveShop() {
  const [data, setData] = useState([]);
  const { alertSuccess, alertError } = usePrompts();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Shop.getActiveShop();

      setData(res.data.data);
    } catch (e) {
      console.log(e);
      alertError();
    }
  };

  const updateStatus = async (id) => {
    try {
      const payload = {
        user_id: id,
        status: 0,
      };

      const res = await User.updateStatus(payload);
      if (res.data.status == 1) {
        alertSuccess(res.data.message);
        getData();
        return;
      }
    } catch (e) {
      alertError();
    }
  };
  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr key={val.user_id}>
        <td>
          <S.Container>
            <Avatar src={BASE_URL + val.logo} />
            <SizeBox width={20} />
            {val.shopName}
          </S.Container>
        </td>
        <td>
          {val.ownerFirstName +
            " " +
            val.ownerMiddleName +
            " " +
            val.ownerLastName}
        </td>
        <td>{val.createAt}</td>
        <td>{val.shopEmail}</td>
        <td>
          <Button
            onClick={() => (window.location.href = `/shop/${val.user_id}`)}
          >
            View
          </Button>
        </td>
        <td>
          <Button onClick={() => handlestatus(val.user_id)}>Deactivate</Button>
        </td>
      </tr>
    ));
  }, [data]);

  function handlestatus(id) {
    updateStatus(id);
  }
  return (
    <Sidebar>
      <Container>
        <Table>
          <thead>
            <tr>
              <td>Shop Name</td>
              <td>Shop Owner</td>
              <td>Date Created</td>
              <td>Shop Email</td>
              <td>View</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
