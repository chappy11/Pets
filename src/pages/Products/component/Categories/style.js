import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Title } from "../../../../components";
import { defaultThemes } from "../../../../constants/DefaultThemes";

export const Category = styled(Form.Check)`
  font-size: 18px;
`;

export const CategoryContainer = styled.div`
  padding: 0px 15px;
`;

export const TitleText = styled.p`
  color: ${defaultThemes.primary};
  font-size: 24px;
  font-weight: bold;
`;
