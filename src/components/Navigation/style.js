import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const CustomNavbar = styled(Navbar)`
  background-color: ${defaultThemes.secondary};
  color: ${(props) => props.color};
  border-bottom: 1px solid whitesmoke;
  height: 100px;
`;

export const CustomNav = styled(Nav.Link)`
  font-weight: bold;
  font-size: 18px;
`;

export const CustomBrand = styled(Navbar.Brand)`
  font-size: 24px;
  font-weight: bold;
`;
