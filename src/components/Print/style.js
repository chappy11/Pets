import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const Container = styled.div`
  padding: 20px 15px;
`;

export const Header = styled.div`
  display: flex;
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
