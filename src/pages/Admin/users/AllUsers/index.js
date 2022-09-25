import { People } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Button,
  HeaderText,
  Line,
  SizeBox,
  Text,
} from "../../../../components";
import { BASE_URL } from "../../../../services/ApiClient";
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

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td>{val.createAt}</td>
        <td>
          <S.NameContainer>
            <Avatar alt="Remy Sharp" src={BASE_URL + val.profilePic} />
            <SizeBox width={10} />{" "}
            {val.firstname + " " + val.middlename + " " + val.lastname}
          </S.NameContainer>
        </td>
        <td>{val.username}</td>
        <td>{val.email}</td>
        <td>{val.gender}</td>
        <td>
          {val.user_status === "0" ? (
            <Text color="red">Inactive</Text>
          ) : (
            <Text color="green">Active</Text>
          )}
        </td>
        <td>
          <Link to="/">View</Link>
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
          <Table variant="bordered">
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Gender</th>
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
