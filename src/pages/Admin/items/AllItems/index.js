import React from "react";
import { useState, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Product } from "../../../../services/Product";
import Sidebar from "../../component/Sidebar";
import usePrompts from "../../../../hooks/usePrompts";
import { useEffect } from "react";
import * as S from "./style";
import { Avatar } from "@mui/material";
import { BASE_URL } from "../../../../services/ApiClient";
import { SizeBox, Container, HeaderText } from "../../../../components";

export default function AllItems() {
  const [data, setData] = useState([]);
  const { alertError } = usePrompts();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await Product.getallItems();
      console.log(res.data.data);
      if (res.data.status == 1) {
        setData(res.data.data);
      }
    } catch (e) {
      console.log(e);
      alertError();
    }
  };

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr key={val.product_id}>
        <td>
          <S.NameContainer>
            <Avatar src={BASE_URL + val.logo} />
            <SizeBox width={10} />
            {val.shopName}
          </S.NameContainer>
        </td>
        <td>
          {
            <S.NameContainer>
              <Avatar src={BASE_URL + val.productImage} />
              <SizeBox width={10} />
              {val.productName}
            </S.NameContainer>
          }
        </td>
        <td>{val.category_name}</td>
        <td>{val.price}</td>
        <td>{val.stock + " " + val.unit}</td>
      </tr>
    ));
  }, [data]);

  return (
    <Sidebar>
      <Container>
        <Container>
          <HeaderText>Product List</HeaderText>
        </Container>

        <Table>
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
