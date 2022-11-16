import { Avatar } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Button, HeaderText, SizeBox } from "../../../../components";
import Container from "../../../../components/Container";
import { defaultThemes } from "../../../../constants/DefaultThemes";
import usePrompts from "../../../../hooks/usePrompts";
import { BASE_URL } from "../../../../services/ApiClient";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function ActiveUser(props) {
  const [data, setData] = useState([]);
  const { alertSuccess, alertError } = usePrompts();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await User.getusers(2, 1);
    console.log(res.data.data);
    if (res.data.status == 1) {
      setData(res.data.data);
    }
  };

  async function handleDeactivate(user_id) {
    try {
      const payload = {
        user_id: user_id,
        status: 0,
      };
      const response = await User.updateStatus(payload);

      if (response.data.status == 1) {
        alertSuccess(response.data.data);
        getData();
        return;
      }

      alertError(response.data.data);
    } catch (e) {
      alertError();
    }
  }
  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td>{val.user_id}</td>
        <td>{val.username}</td>
        <td>{val.firstname + " " + val.middlename + " " + val.lastname}</td>
        <td>{val.email}</td>
        <td>
          <Button
            onClick={() => (window.location.href = `/customer/${val.user_id}`)}
          >
            View
          </Button>
        </td>
        <td>
          <Button
            color={defaultThemes.primary}
            onClick={() => handleDeactivate(val.user_id)}
          >
            Activate
          </Button>
          <SizeBox width={5} />
        </td>
      </tr>
    ));
  }, [data]);

  return (
    <>
      <Sidebar>
        <Container>
          <HeaderText>Active User</HeaderText>
          <Table>
            <thead>
              <tr>
                <td>User ID</td>
                <td>Username</td>
                <td>Name</td>
                <td>Email</td>
                <td>View</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>{displayData}</tbody>
          </Table>
        </Container>
      </Sidebar>
    </>
  );
}
