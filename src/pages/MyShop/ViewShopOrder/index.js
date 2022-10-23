import React, { useEffect } from "react";
import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  Container,
  HeaderText,
  SizeBox,
  Title,
  Text,
} from "../../../components";
import useGetShopOrder from "../../../hooks/useGetShopOrder";
import { BASE_URL } from "../../../services/ApiClient";
import { formatCurrency } from "../../../utils/Money";
import Sidebar from "../components/Sidebar";
import * as S from "./style";

export default function ViewShopOrder() {
  const { id, reference } = useParams();
  const { data } = useGetShopOrder({ order_id: id });
  const formatFullname = `${data?.lastname}, ${data?.firstname} ${data?.middlename}`;

  const displayItem = useMemo(() => {
    return data?.order?.map((val) => (
      <tr>
        <td>
          <S.Image src={BASE_URL + val.productImage} alt="product image" />
        </td>
        <td>{val.productName}</td>
        <td>{formatCurrency(+val.price)}</td>
        <td>{`${val.orderItemNo} ${val.unit}`}</td>
        <td>{formatCurrency(+val.orderItemAmount)}</td>
      </tr>
    ));
  }, [data]);

  return (
    <Sidebar>
      <Container>
        <HeaderText>{reference}</HeaderText>
        <Text>Purchase By : {formatFullname}</Text>
        <Text>Total Amount: {formatCurrency(+data.totalAmount)}</Text>
        <SizeBox height={20} />
        <Table>
          <thead>
            <tr>
              <th>Item Visual</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Number of Item</th>
              <th>Total Amount of Purchase</th>
            </tr>
          </thead>
          <tbody>{displayItem}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
