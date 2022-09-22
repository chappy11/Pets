import React from "react";
import { Container, Table } from "react-bootstrap";
import { HeaderText } from "../../../../components";
import Sidebar from "../../component/Sidebar";

export default function AllUser() {
  return (
    <>
      <Sidebar>
        <Container>
          <HeaderText>Users</HeaderText>
          <Table>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Gender</th>
              </tr>
            </thead>
          </Table>
          <p className="text-center">No Data Found</p>
        </Container>
      </Sidebar>
    </>
  );
}
