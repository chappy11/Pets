import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DashBoard } from "../../services/DashBoard";

import * as S from "./style";

export default function DashBoardCard(props) {
  return (
    <S.Card color={props.color}>
      <S.NumberText>{props.title}</S.NumberText>
      <S.Subtitle>{props.subtitle}</S.Subtitle>
    </S.Card>
  );
}
