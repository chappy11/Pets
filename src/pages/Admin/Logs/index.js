import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Container, HeaderText } from "../../../components";
import { User } from "../../../services/User";
import Sidebar from "../component/Sidebar";
export default function Logs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await User.getLogs();

    setData(resp.data.data);
  };

  const displayData = useMemo(() => {
    return data.map((val) => (
      <tr>
        <td>{val.log_date}</td>
        <td>{val.username}</td>
        <td>{val.browsername}</td>
      </tr>
    ));
  }, [data]);

  return (
    <Sidebar>
      <Container>
        <HeaderText>User Logs</HeaderText>
        <Table variant="bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Username</th>
              <th>Browser</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
