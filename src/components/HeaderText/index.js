import React from "react";
import * as S from "./style";

export default function HeaderText(props) {
  return (
    <S.Text
      color={props?.color ? props?.color : "black"}
      textAlign={props?.textAlign}
    >
      {props.children}
    </S.Text>
  );
}
