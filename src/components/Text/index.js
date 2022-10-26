import React from "react";
import * as S from "./style";

export default function Text(props) {
  return (
    <S.Text
      color={props.color ? props.color : "gray"}
      textAlign={props.alignText ? props?.alignText : "left"}
    >
      {props.children}
    </S.Text>
  );
}
