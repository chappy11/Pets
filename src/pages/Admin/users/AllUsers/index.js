import { People } from "@mui/icons-material";

import React from "react";
import { useEffect } from "react";
import { useState, useMemo, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  HeaderText,
  Line,
  SizeBox,
} from "../../../../components";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function AllUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await User.getusers(2, 3);

    if (res.data.status == 1) {
      setData(res.data.data);
    }
  };

  const isNoDataFound = useMemo(() => {
    return data.length < 1 && <p className="text-center">No Data Found</p>;
  }, [data]);

  const status = useCallback(
    (stat) => {
      if (stat == "0") {
        return "text-danger";
      }

      return "text-success";
    },
    [data]
  );

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td>{val.user_id}</td>
        <td>{val.username}</td>
        <td>{val.firstname + " " + val.middlename + " " + val.lastname}</td>
        <td>{val.email}</td>
        <td className={status(val.user_status)}>
          {val.user_status === "0" ? "Inactive" : "Active"}
        </td>
        <td>
          <Button
            onClick={() => (window.location.href = `/customer/${val.user_id}`)}
          >
            View
          </Button>
        </td>
        {/* <td>
        <Button onClick={() => handleApproved(val.user_id)}>
          Approved
        </Button>
      </td> */}
      </tr>
    ));
  }, [data]);

  return (
    <>
      <Sidebar>
        <Container>
          <SizeBox height={20} />
          <HeaderText>
            <People /> Users
          </HeaderText>
          <Line />
          <SizeBox height={20} />
          <Table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{displayData}</tbody>
          </Table>
          {isNoDataFound}
        </Container>
      </Sidebar>
    </>
  );
}
