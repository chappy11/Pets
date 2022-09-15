import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const CustomNavbar = styled(Navbar)`
  background-color: ${defaultThemes.primary};
  color: ${(props) => props.color};
`;
