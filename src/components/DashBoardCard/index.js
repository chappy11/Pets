import React from "react";
import * as S from "./style";

export default function DashBoardCard(props) {
  return (
    <S.Card color={props.color} onClick={() => props.onClick()}>
      <S.NumberText>{props.title}</S.NumberText>
      <S.Subtitle>{props.subtitle}</S.Subtitle>
    </S.Card>
  );
}
