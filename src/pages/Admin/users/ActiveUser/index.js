import { Avatar } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Button, HeaderText, SizeBox } from "../../../../components";
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
    console.log("GG");
    return data.map((val, i) => (
      <tr key={val.user_id}>
        <td>{val.createAt}</td>
        <td>
          <S.NameContainer>
            <Avatar src={BASE_URL + val.profilePic} />
            <SizeBox width={10} />
            {val.firstname + " " + val.middlename + " " + val.lastname}
          </S.NameContainer>
        </td>
        <td>{val.email}</td>
        <td>{val.contact}</td>
        <td>{val.gender}</td>
        <td>
          <Button>View</Button>
        </td>
        <td>
          <Button
            onClick={() => handleDeactivate(val.user_id)}
            color={defaultThemes.secondary}
          >
            Deactivate
          </Button>
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
            <tr>
              <th>Create Date</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Gender</th>
              <th>View</th>
              <th>Action</th>
            </tr>
            <tbody>{displayData}</tbody>
          </Table>
        </Container>
      </Sidebar>
    </>
  );
}
