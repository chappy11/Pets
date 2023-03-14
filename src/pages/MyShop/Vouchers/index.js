import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Button,
  Container,
  HeaderText,
  SizeBox,
  TextInput,
} from "../../../components";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import usePrompts from "../../../hooks/usePrompts";
import { Voucher } from "../../../services/Voucher";
import Sidebar from "../components/Sidebar";
import * as S from "./style";

function Vouchers() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGetUserFromStorage();
  const { alertError, alertSuccess } = usePrompts();
  const [data, setData] = useState({
    voucherLimit: 0,
    percentage: 0,
  });

  async function handleCreateVoucher() {
    try {
      const payload = {
        shop_id: user.shop_id,
        voucherLimit: data.voucherLimit,
        percent: data.percentage,
      };
      const resp = await Voucher.createVoucher(payload);

      if (resp.data.status === "0") {
        alertError();
        return;
      }

      alertSuccess("Successfully Added");
    } catch (error) {
      alertError();
    }
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Sidebar>
      <Container>
        <Modal show={isOpen}>
          <Modal.Header>Add Voucher</Modal.Header>
          <Modal.Body>
            <TextInput
              label="Limit"
              type="number"
              onChange={onChange}
              name="voucherLimit"
              value={data.voucherLimit}
            />
            <SizeBox height={20} />
            <TextInput
              label="Percentage"
              name="percentage"
              type="number"
              onChange={onChange}
              value={data.percentage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCreateVoucher}>Create</Button>
            <Button color="red" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <S.HeaderContainer>
          <S.TextContainer>
            <HeaderText>Voucher Management</HeaderText>
          </S.TextContainer>
          <S.ButtonContainer>
            <Button onClick={() => setIsOpen(true)}>Create New Voucher</Button>
          </S.ButtonContainer>
        </S.HeaderContainer>
      </Container>
    </Sidebar>
  );
}

export default Vouchers;
