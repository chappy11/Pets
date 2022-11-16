import React, { useState, useMemo } from "react";
import { InputGroup, Form } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as S from "./style";

export default function Password(props) {
  const { onChange, value, placeholder, name, label } = props;
  const [isVisible, setIsVisible] = useState(false);

  const type = useMemo(() => {
    if (isVisible) {
      return "text";
    }

    return "password";
  }, [isVisible, setIsVisible]);

  const dipslayIcon = useMemo(() => {
    if (isVisible) {
      return <VisibilityOffIcon />;
    }

    return <RemoveRedEyeIcon />;
  }, [isVisible, setIsVisible]);

  return (
    <>
      <S.Label>{label}</S.Label>
      <InputGroup>
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          aria-describedby="inputGroupPrepend"
        />
        <InputGroup.Text
          id="inputGroupPrepend"
          onClick={() => setIsVisible(!isVisible)}
        >
          {dipslayIcon}
        </InputGroup.Text>
      </InputGroup>
    </>
  );
}
