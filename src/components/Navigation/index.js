import React, { useEffect, useMemo, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Carts } from "../../services/Cart";
import { getItem, KEY } from "../../utils/storage";
import CustomBadge from "./Badge";
import * as S from "./style";

const NAVATION = [
  {
    id: 100,
    name: "Home",
    url: "/",
  },
  {
    id: 200,
    name: "My Orders",
    url: "/order",
  },
  {
    id: 300,
    name: "Cart",
    url: "/cart",
  },
  {
    id: 600,
    name: "Inbox",
    url: "/message/0",
  },
];

const NO_SESSION = [
  {
    id: 400,
    name: "Home",
    url: "/",
  },
  {
    id: 500,
    name: "About",
    url: "/about",
  },
];

export default function Navigation(props) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const { isFetch } = props;
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [isFetch]);

  const fetch = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const res = await Carts.mycart(user.user_id);
    setCount(res.data.count);
    setData(user);
  };

  const displayLinks = useMemo(() => {
    return (data ? NAVATION : NO_SESSION).map((val, index) => (
      <S.CustomNav href={val.url} key={index}>
        {val.name}
        {val.id == 300 && <CustomBadge value={count} />}
      </S.CustomNav>
    ));
  }, [data, isFetch]);

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <S.CustomNavbar variant="dark" expand="lg">
      <Container>
        <S.CustomBrand href="#home">Pet Society</S.CustomBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">{displayLinks}</Nav>
          {data ? (
            <Nav>
              <NavDropdown
                title={data?.username}
                id="basic-nav-dropdown"
                className="justify-content-end"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <S.CustomNav href="/login">Login</S.CustomNav>
              <Navbar.Text>/</Navbar.Text>
              <S.CustomNav href="/register">Register</S.CustomNav>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </S.CustomNavbar>
  );
}
