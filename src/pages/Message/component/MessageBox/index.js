import React, { useMemo, useState, useRef, useEffect } from "react";

import { Button, HeaderText, SizeBox, Text } from "../../../../components";
import useGetConvo from "../../../../hooks/useGetConvo";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import { TextArea } from "../../../ViewProduct/style";
import * as S from "./style";
import { Row, Col } from "react-bootstrap";
import { defaultThemes } from "../../../../constants/DefaultThemes";
import { Avatar } from "@mui/material";
import { BASE_URL } from "../../../../services/ApiClient";
import { Messages } from "../../../../services/Messages";
import { getItem, KEY } from "../../../../utils/storage";
import { MessageConnection } from "../../../../services/MessageConnection";

export default function MessageBox(props) {
  const { conn_id } = props;
  const { data, setIsRefetch, roles } = useGetConvo(conn_id);
  const [message, setMessage] = useState("");
  const divRef = useRef(null);
  console.log(conn_id);
  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [setIsRefetch]);

  const renderItem = useMemo(() => {
    return data?.convo?.map((item, i) => {
      const alignment = roles == item.sender ? "flex-end" : "flex-start";
      const background =
        roles == item.sender ? defaultThemes.primary : defaultThemes.secondary;
      const pic = data?.customer
        ? BASE_URL + item.logo
        : BASE_URL + item.profilePic;
      return (
        <>
          <S.Message alignment={alignment}>
            <Row>
              {item.sender !== roles && (
                <Col>
                  <Avatar src={pic} alt="profile pic" />
                </Col>
              )}

              <Col>
                <S.Msg background={background}>
                  <S.MsgText>{item.message}</S.MsgText>
                </S.Msg>
              </Col>
            </Row>
            <SizeBox height={10} />
            <S.Label>{item.message_date}</S.Label>
            <div ref={divRef} />
          </S.Message>
        </>
      );
    });
  }, [data, roles]);

  const createMessage = async () => {
    try {
      setIsRefetch(true);
      const storage = await getItem(KEY.ACCOUNT);
      const customer_id = data?.customer
        ? data?.customer?.customer_id
        : storage?.customer_id;
      const shop_id = data?.shop ? data?.shop?.shop_id : storage?.shop_id;

      const payload = {
        message,
        customer_id: customer_id,
        shop_id: shop_id,
        sender: storage?.user_roles,
      };

      const resp = await MessageConnection.sendmessage(payload);

      if (resp.data.status == 1) {
        setMessage("");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsRefetch(false);
    }
  };

  function handleSend() {
    createMessage();
  }

  const displayCustomer = useMemo(() => {
    console.log("BOBO", data);
    if (data?.customer) {
      return (
        data?.customer?.firstname +
        " " +
        data?.customer?.middlename +
        " " +
        data?.customer?.lastname
      );
    }

    if (data?.shop) {
      return data?.shop?.shopName;
    }

    return "";
  }, [data]);
  return (
    <S.Container>
      <S.Header>
        <S.TextContainer alignment={"flex-start"}>
          <HeaderText color="white">{displayCustomer}</HeaderText>
        </S.TextContainer>
        <S.TextContainer alignment={"flex-end"}>
          <Button onClick={() => (window.location.href = "/")}>
            Back To Home
          </Button>
        </S.TextContainer>
      </S.Header>
      <SizeBox height={15} />
      <S.MessageContainer>{renderItem}</S.MessageContainer>
      <Row>
        <Col md="11">
          <TextArea
            style={{ height: 50 }}
            placeholder="Write Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></TextArea>
        </Col>
        <Col md="1">
          <Button onClick={handleSend}>Send</Button>
        </Col>
      </Row>
    </S.Container>
  );
}
