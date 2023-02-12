import React from "react";
import { Form } from "react-bootstrap";
import * as S from "./style";

export default function TextInput(props) {
  return (
    <>
      <S.Label>{props.label}</S.Label>
      <Form.Control
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        disabled={props.disabled}
        className="input-sm"
        style={props.style}
        as={props?.as}
        rows={props?.rows}
        maxlength={props?.max}
      />
    </>
  );
}
