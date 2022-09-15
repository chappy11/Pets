import React from "react";
import * as S from "./style";

export default function Text(props) {
  return <S.Text color={props.color}>{props.children}</S.Text>;
}
