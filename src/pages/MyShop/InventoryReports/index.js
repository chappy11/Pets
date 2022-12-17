import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Container, HeaderText, Print, SizeBox } from "../../../components";
import { getItem, KEY } from "../../../utils/storage";
import Sidebar from "../components/Sidebar";
import { Product as ProductAPi } from "../../../services/Product";
import { BASE_URL } from "../../../services/ApiClient";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";

export default function InventoryReports() {
  const [products, setProducts] = useState([]);
  const { user } = useGetUserFromStorage();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const shopData = await getItem(KEY.ACCOUNT);

    const response = await ProductAPi.getProductByShopId(shopData.shop_id);

    if (response.data.status == "1") {
      setProducts(response.data.data);
    }
  };

  const itemAvailability = useCallback((stock) => {
    if (stock == "0") {
      return <p style={{ color: "red" }}>Sold Out</p>;
    }

    return <p style={{ color: "green" }}>Available</p>;
  }, []);
  return (
    <Sidebar>
      <Container>
        <SizeBox height={10} />
        <Print
          fullName={
            user?.ownerFirstName +
            " " +
            " " +
            user?.ownerMiddleName +
            " " +
            user?.ownerLastName
          }
        >
          <HeaderText>Inventory Reports</HeaderText>

          <SizeBox height={10} />

          <Table responsive={"md"} bordered={true}>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Image</th>
                <th>Name</th>

                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date Updated</th>
              </tr>
            </thead>
            <tbody>
              {products.map((val, i) => (
                <tr>
                  <td>{val.p_createdAt}</td>
                  <td>
                    <img
                      src={BASE_URL + "" + val.productImage}
                      alt="product"
                      style={{ width: 50, height: 50 }}
                    />
                  </td>
                  <td>{val.productName}</td>
                  <td>
                    {val.stock} {val.unit}
                  </td>
                  <td>{val.price}</td>
                  <td>{itemAvailability(val.stock)}</td>
                  <td>{val.p_updateAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Print>
      </Container>
    </Sidebar>
  );
}
