import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { SizeBox } from "../../../../components";

import NotifIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  GridView,
  Logout,
  Sell,
  Storefront,
  Subscriptions,
} from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import * as S from "./style";
import { getItem, KEY } from "../../../../utils/storage";
import { Notification } from "../../../../services/Notification";

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
              <MenuItem icon={<NotifIcon />}>
                Notification <Link to="/notification" />
                {notifCount > 0 && <S.Badge>{notifCount}</S.Badge>}
              </MenuItem>
              <SubMenu icon={<PeopleAltIcon />} title="Manage Users">
                <MenuItem>
                  All User <Link to="/users" />
                </MenuItem>
                <MenuItem>
                  Inactive Users <Link to="/pendinguser" />
                </MenuItem>
                <MenuItem>
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
              <MenuItem icon={<CategoryIcon />}>
                <Link to={"/category"} />
                Manage Categories
              </MenuItem>
              <MenuItem icon={<FolderCopyIcon />}>
                <Link to="/logs" />
                User Logs
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
