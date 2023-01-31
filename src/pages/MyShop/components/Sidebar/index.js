import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Row, Col, Navbar, Container, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Mail from "@mui/icons-material/Mail";
import Notif from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import * as S from "./style";
import { SizeBox } from "../../../../components";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import { Assessment, Cancel, MonetizationOn } from "@mui/icons-material";
import { Notification } from "../../../../services/Notification";
import { getItem, KEY } from "../../../../utils/storage";

export default function Sidebar(props) {
  const [notifCount, setNotifCount] = useState(0);
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    getNotif();
  }, []);

  const getNotif = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Notification.getUnRead(user?.user_id);

      setNotifCount(resp.data.count);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <SizeBox width={"50"} />
        <Navbar.Brand>Pet Society</Navbar.Brand>
      </Navbar>

      <Row style={{ width: "100vw", height: "100vh" }}>
        <Col md={2}>
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
              <MenuItem icon={<PersonOutlineIcon />}>
                {" "}
                <Link to="/profile" />
                Profile
              </MenuItem>
              <MenuItem icon={<Notif />}>
                {" "}
                <Link to="/notification" />
                Notification
                {notifCount > 0 && <S.Badge>{notifCount}</S.Badge>}
              </MenuItem>
              <MenuItem icon={<Mail />}>
                {" "}
                <Link to="/message/0" />
                Inbox
              </MenuItem>
              <MenuItem icon={<InventoryIcon />}>
                Products <Link to="/myproduct" />
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
                <MenuItem icon={<ThumbUpAltIcon />}>
                  {" "}
                  <Link to="/success" />
                  Received Item
                </MenuItem>
                <MenuItem icon={<Cancel />}>
                  <Link to={"/canceled"} />
                  Canceled Order
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<Assessment />} title="Reports">
                <MenuItem icon={<Assessment />}>
                  <Link to="/reports" />
                  Sales Reports
                </MenuItem>
                <MenuItem icon={<MonetizationOn />}>
                  <Link to="/inventoryreports" />
                  Inventory Reports
                </MenuItem>
              </SubMenu>

              <MenuItem icon={<SubscriptionsIcon />}>
                My Subscription <Link to="/mysubscription" />
              </MenuItem>
              <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </ProSidebar>
        </Col>
        <Col>
          <SizeBox height={80} />
          <S.Body>{props.children}</S.Body>
        </Col>
      </Row>
    </>
  );
}
