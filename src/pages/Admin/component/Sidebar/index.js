import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { SizeBox } from "../../../../components";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  GridView,
  Logout,
  Sell,
  Storefront,
  Subscriptions,
} from "@mui/icons-material";
import * as S from "./style";
import LoadingOverlay from "react-loading-overlay";

export default function Sidebar(props) {
  function handleLogout() {
    window.localStorage.clear();
    window.location.href = "/";
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <SizeBox width={"50"} />
        <Navbar.Brand>Pet Society</Navbar.Brand>
      </Navbar>
      <Row>
        <Col lg={2}>
          <ProSidebar
            style={{
              minWidth: 100,
              marginTop: "3%",
              overflowY: "auto",
              height: "100%",
              position: "fixed",
            }}
            collapsedWidth={100}
            collapse={true}
            width={"15vw"}
            color={"grey"}
          >
            <Menu style={{ background: "transparent" }}>
              <MenuItem icon={<GridView />}>
                Dashboard <Link to="/" />{" "}
              </MenuItem>
              <SubMenu icon={<PeopleAltIcon />} title="Manage Users">
                <MenuItem>
                  All User <Link to="/users" />
                </MenuItem>
                <MenuItem>
                  Inactive Users <Link to="/pendinguser" />
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/activeuser" />
                  Acitive Users
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<Storefront />} title="Manage Shops">
                <MenuItem>
                  All Shops <Link to="/shops" />
                </MenuItem>
                <MenuItem>
                  Inactive Shops <Link to={"/pendingshops"} />
                </MenuItem>
                <MenuItem>
                  Active Shops <Link to={"/activeshops"} />
                </MenuItem>
              </SubMenu>
              <MenuItem icon={<Sell />}>
                <Link to="/items" />
                Item Selling
              </MenuItem>
              <MenuItem icon={<Subscriptions />}>
                <Link to={"/subscriptions"} />
                Manage Subscription
              </MenuItem>
              <MenuItem onClick={handleLogout} icon={<Logout />}>
                Logout
              </MenuItem>
            </Menu>
          </ProSidebar>
        </Col>
        <Col>
          <S.Body>{props.children}</S.Body>
        </Col>
      </Row>
    </>
  );
}
