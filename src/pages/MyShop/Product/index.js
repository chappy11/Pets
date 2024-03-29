import Sidebar from "../components/Sidebar";
import { Table, Row, Col, ButtonGroup, Modal, Button } from "react-bootstrap";
import {
  SizeBox,
  TextInput,
  Button as CustomButton,
  Container,
} from "../../../components";
import { getItem, KEY } from "../../../utils/storage";
import { Product as ProductAPi } from "../../../services/Product";
import { BASE_URL } from "../../../services/ApiClient";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as S from "./style";
import useModal from "../../../hooks/useModal";
import swal from "sweetalert";
import UpdateStock from "../components/UpdateStock";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import { Link } from "react-router-dom";
import { defaultThemes } from "../../../constants/DefaultThemes";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    itemData: null,
    type: "",
  });
  const [error, setError] = useState(null);
  const [noItems, setNoItems] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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

  function handleAddProduct() {
    window.location.href = "/addproduct";
  }

  const itemAvailability = useCallback((stock) => {
    if (stock == "0") {
      return <p style={{ color: "red" }}>Sold Out</p>;
    }

    return <p style={{ color: "green" }}>Available</p>;
  }, []);

  const onChange = (e) => {
    setNoItems(e.target.value);
  };

  const updateStock = useCallback(async () => {
    if (noItems < 1) {
      swal("Warning", "You must input no of item that you want add", "warning");

      return;
    }

    try {
      const payload = {
        noStockAdded: noItems,
        itemId: currentItem.itemData.product_id,
        type: currentItem.type,
      };

      const response = await ProductAPi.updateStock(payload);

      if (response.data?.status == 1) {
        swal("Success", response.data.message, "success");
        getProducts();
        setIsOpen(false);
        return;
      }

      swal("Error", response?.data?.message, "error");
    } catch (e) {
      console.log("EERR", e);
      swal("Error", "Something went wrong", "error");
    }
  }, [noItems, setNoItems, isOpen]);

  const handleModal = (item, updateType) => {
    setIsOpen(true);
    setCurrentItem({
      type: updateType,
      itemData: item,
    });
  };

  const isSubscribe = useMemo(() => {
    if (!user?.subscription_id || user?.subscription_id.toString() == "0") {
      return (
        <p>
          You can only sell items if you subscribe to the application{" "}
          <a href="/mysubscription">Subscribe now</a>
        </p>
      );
    }

    return (
      <CustomButton className="float-right" color={defaultThemes.cancel} onClick={handleAddProduct}>
        Add New Product
      </CustomButton>
    );
  }, [user?.subscription_id]);

  return (
    <Sidebar>
      <Container>
        <SizeBox height={20} />
        <Modal show={isOpen}>
          <Modal.Header>
            <Modal.Title>
              {currentItem.type === "add" ? "Stock In" : "Stock Out"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextInput onChange={onChange} type="number" />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-dark" onClick={updateStock}>
              Save
            </Button>
            <Button className="btn btn-danger" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col>
            <h3>Products</h3>
          </Col>
          <S.JustifyEnd className="flex-1 justify-content-end align-items-end">
            {isSubscribe}
          </S.JustifyEnd>
        </Row>
        <SizeBox height={20} />
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((val, i) => (
              <S.Item isReOrder={parseInt(val.stock) <= parseInt(val.reorderLevel)} >
                <td>{val.p_createdAt}</td>
                <td>
                  <img
                    src={BASE_URL + "" + val.productImage}
                    alt="product"
                    style={{ width: 50, height: 50 }}
                  />
                </td>
                <td>
                  <Link to={`/viewproduct/${val.product_id}`}>
                    {val.productName}
                  </Link>
                </td>
                <td>
                  {val.stock} {val.unit}
                </td>
                <td>{val.price}</td>
                <td>{itemAvailability(val.stock)}</td>
                <td>{val.p_updateAt}</td>
                <td>
                  {val.category_id !== "1" && (
                    <ButtonGroup className="me-2">
                      <Button
                        variant="success"
                        size={"sm"}
                        onClick={() => handleModal(val, "add")}
                      >
                        Stock In{" "}
                      </Button>
                      <Button
                        variant="danger"
                        size={"sm"}
                        onClick={() => handleModal(val, "out")}
                      >
                        Stock out
                      </Button>
                    </ButtonGroup>
                  )}
                </td>
              </S.Item>
            ))}
          </tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
