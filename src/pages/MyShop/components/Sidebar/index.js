import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Row, Col, Navbar, Container, Nav } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LogoutIcon from "@mui/icons-material/Logout";
import * as S from "./style";
import { SizeBox } from "../../../../components";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import { blue } from "@mui/material/colors";
import { Assessment } from "@mui/icons-material";

export default function Sidebar(props) {
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <SizeBox width={"50"} />
        <Navbar.Brand>Pet Society</Navbar.Brand>
      </Navbar>
      <Row style={{ width: "100vw", height: "100vh" }}>
        {/* <Col   style={{width:'20vw'}} > */}
        <ProSidebar
          collapsedWidth={100}
          style={{
            minWidth: 100,
            background: "transparent",
            overflowY: "auto",
            height: "100%",
            position: "fixed",
          }}
          collapse={true}
          width={"15vw"}
          color={"grey"}
        >
          <SizeBox height={50} />
          <Menu style={{ background: "transparent" }}>
            <MenuItem icon={<DashboardIcon />}>
              Dashboard <Link to="/" />{" "}
            </MenuItem>
            <MenuItem icon={<PersonOutlineIcon />}>Profile</MenuItem>
            <MenuItem icon={<InventoryIcon />}>
              Inventory <Link to="/myproduct" />
            </MenuItem>
            <SubMenu icon={<PointOfSaleIcon />} title="Orders">
              <MenuItem icon={<PendingActionsIcon />}>
                {" "}
                <Link to="/pending" />
                Pending
              </MenuItem>
              <MenuItem icon={<SwipeRightIcon />}>
                {" "}
                <Link to="/accepted" />
                Accepted
              </MenuItem>
              <MenuItem icon={<DepartureBoardIcon />}>
                <Link to="/packed" />
                Ready For Delivery
              </MenuItem>
              <MenuItem icon={<LocalShippingIcon />}>
                {" "}
                <Link to="/deliver" />
                Delivered
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<Assessment />}>
              <Link to="/reports" />
              Reports
            </MenuItem>
            <MenuItem icon={<SubscriptionsIcon />}>
              My Subscription <Link to="/mysubscription" />
            </MenuItem>
            <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </ProSidebar>
        {/* </Col> */}

        <S.Body>{props.children}</S.Body>
      </Row>
    </>
  );
}
