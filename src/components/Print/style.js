import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const Container = styled.div`
  padding: 20px 15px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
`;

export const Logo = styled.img`
  position: absolute;
  right: 100;
  width: 150px;
  height: 150px;
`;

export const SideContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.justification ? props?.justification : "flex-start"};
`;

export const Title = styled.div`
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  color: ${defaultThemes.secondary};
`;

export const UserName = styled.text`
  text-align: center;
  text-decoration: underline;
  margin-left: 100px;
`;

export const Prepare = styled.text`
  margin-right: 200px;
  font-weight: bold;
`;
