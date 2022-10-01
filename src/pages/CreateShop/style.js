import { Container,Row,Col } from "react-bootstrap";
import styled from "styled-components";
import { TextInput } from "../../components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const NoImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: lightgray;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HideInput = styled(TextInput)`
  display: none;
`;

export const VerificationMessage = styled.label`
  font-size: 12px;
  color: grey;
  text-align: center;
`;

export const InputContainer = styled.div`
  padding: 0 12px;
`;

export const LinkButton = styled.button`
  border: none;
  padding: 10px;
  background-color: transparent;
  color: ${defaultThemes.primary};
`;

export const CustomContainer = styled(Container)`
  background-color:${defaultThemes.white};
  padding:20px;
`;

export const CustomRow = styled(Row)`
  flex:1;
`;

export const CustomColumn = styled(Col)`
  display:flex;
  flex:1;
  justify-content:center;
  align-items:center;
`;