import { Row, Card } from "react-bootstrap";
import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const ItemRow = styled(Row)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.fontColor};
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.color};
  border: solid ${(props) => props.color}px lightgrey;
  cursor: pointer;
  opacity: 1;

  &:hover {
    visibility: visible;
    opacity: 0.5;
    transition: opacity 0.3s, visibility 0.3s;
  }
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InfoContainer = styled.div`
  width: 100%;
  min-width: 50%;
`;

export const CustomizeCard = styled(Card)`
  width: 250px;
  margin: 10px;
  padding: 0px;
  height: 250px;
  opacity: 1;
  cursor: pointer;
  border: 1px solid lightgrey;
  shadow: 1px;
  &:hover {
    visibility: visible;
    opacity: 0.5;
    transition: opacity 0.3s, visibility 0.3s;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
`;

export const BodyText = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: ${defaultThemes.secondary};
`;

export const Subtitle = styled.p`
  font-size: 0.9em;
  text-align: center;
`;

export const Title = styled(Card.Title)`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

export const Section = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${defaultThemes.white};
  padding-top: 20px;
`;

export const TitleText = styled.p`
  font-size: 24px;
  color: ${defaultThemes.secondary};
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-color: lightgrey;
  padding: 10px;
`;

export const ReviewContainer = styled.div`
  padding: 5px 10px;
  border-bottom: 1px solid lightgray;
`;

export const ReviewTextContainer = styled.div`
  padding: 5px 30px;
`;
