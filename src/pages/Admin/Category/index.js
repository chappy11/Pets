import React, { useMemo } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Container, Line, SizeBox, Button, Title } from "../../../components";
import useGetCategory from "../../../hooks/useGetCategory";
import usePrompts from "../../../hooks/usePrompts";
import { Category as Cat } from "../../../services/Category";
import Sidebar from "../component/Sidebar";
import CreateCategory from "./CreateCategory";
import * as S from "./style";

export default function Category() {
  const { category, setIsRefresh } = useGetCategory();
  const [isShowCreate, setIsShowCreate] = useState(false);
  const { alertSuccess, alertError, alertWarning } = usePrompts();
  const [name, setName] = useState("");

  const onChange = (e) => {
    setName(e.target.value);
  };

  const displayData = useMemo(() => {
    return category?.map((val, i) => (
      <tr key={val.category_id}>
        <td>{val.category_id}</td>
        <td>{val.category_name}</td>
        <td>{val.cat_CreatedAt}</td>
      </tr>
    ));
  }, [category]);

  const create = async () => {
    try {
      const payload = {
        name,
      };
      const resp = await Cat.createCategory(payload);

      if (resp.data.status == "1") {
        alertSuccess(resp.data.message);
        setIsRefresh(true);
        setIsShowCreate(false);
        return;
      }

      alertError(resp.data.message);
    } catch (e) {
      alertError();
    }
  };

  function handleCreate() {
    if (name == "") {
      alertWarning("Please enter category name");

      return;
    }

    create();
  }

  return (
    <Sidebar>
      <Container>
        <CreateCategory
          isOpen={isShowCreate}
          setIsOpen={setIsShowCreate}
          onChange={onChange}
          create={handleCreate}
        />
        <S.HeaderContainer>
          <S.TitleContainer>
            <Title>Category Management</Title>
          </S.TitleContainer>
          <S.ActionContainer>
            <Button onClick={() => setIsShowCreate(true)}>
              Create New Category
            </Button>
          </S.ActionContainer>
        </S.HeaderContainer>
        <Line />
        <SizeBox height={20} />
        <Table>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
