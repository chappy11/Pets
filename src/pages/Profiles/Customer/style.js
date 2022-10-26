import styled from "styled-components";
import { Container } from "react-bootstrap";
import { defaultThemes } from "../../../constants/DefaultThemes";

export const MainContainer = styled(Container)`
  width: 700px;
  background: ${defaultThemes.white};
  padding: 20px 15px;
  margin-top: 20px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

export const Text = styled.text`
  font-size: 24px;
  text-align: center;
  color: gray;
`;

export const Information = styled.div`
  padding: 15px 20px;
`;
