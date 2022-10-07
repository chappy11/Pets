import Sidebar from "../../components/Sidebar";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useMemo, useState } from "react";
import { TextInput, SizeBox, Container, Title } from "../../../../components";
import useGetCategory from "../../../../hooks/useGetCategory";
import swal from "sweetalert";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import { Product } from "../../../../services/Product";
import usePrompts from "../../../../hooks/usePrompts";
const UNIT = ["pcs", "kg"];

export default function AddProduct() {
  const [img, setImg] = useState(null);
  const { user } = useGetUserFromStorage();
  const { category } = useGetCategory();
  const { alertWarning } = usePrompts();
  const [data, setData] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    stock: "",
    unit: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    setImg(e.target.files[0]);
  };

  // console.log(data);

  async function handleAddproduct() {
    const { name, description, category_id, unit, price, stock } = data;
    if (!img) {
      swal("Warning", "Provide Picture of Product");
    } else if (
      name === "" ||
      description === "" ||
      category_id === "" ||
      unit === "" ||
      price === ""
    ) {
      swal("Warning", "Fill out all fields");
    } else if (+price > +user.price_limit) {
      alertWarning(`The price of item shoud be ${user.price_limit} below`);
    } else {
      try {
        console.log(user.shop_id);
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("description", description);
        formdata.append("category_id", category_id);
        formdata.append("price", price);
        formdata.append("unit", unit);
        formdata.append("stock", stock);
        formdata.append("shop_id", user.shop_id);
        formdata.append("pic", img);

        const response = await Product.addProduct(formdata);
        console.log("DATA", response);
        if (response.data.status == 1) {
          swal("Success", response.data.message, "success").then((res) => {
            window.location.href = "/myproduct";
          });
        } else {
          swal("Error", response.data.message, "error");
        }
      } catch (e) {
        swal("Opps", "Something wenty wrong", "error");
      }
    }
  }

  return (
    <>
      <Sidebar>
        <SizeBox height={20} />
        <Container>
          <SizeBox height={20} />
          <Title>Sell New Product</Title>
          <Row>
            <Col>
              {img && (
                <Image
                  width={200}
                  height={200}
                  src={URL.createObjectURL(img)}
                />
              )}
              <TextInput type="file" onChange={onChangeImage} />
            </Col>
            <Col>
              <TextInput
                name="name"
                onChange={onChange}
                placeholder="Product Name"
                label="Product Name"
              />
              <SizeBox height={15} />
              <TextInput
                name="description"
                onChange={onChange}
                placeholder="Product Description"
                label="Product Description"
              />
              <SizeBox height={15} />
              <Form.Label>Product Category</Form.Label>
              <Form.Select name="category_id" onChange={onChange}>
                <option value={""}>
                  {data.category_id === "" && "Choose Category"}
                </option>
                {category.map((val, i) => (
                  <option key={val.category_id} value={val.category_id}>
                    {val.category_name}
                  </option>
                ))}
              </Form.Select>
              <SizeBox height={15} />
              <Form.Label>Unit</Form.Label>
              <Form.Select name="unit" onChange={onChange}>
                <option value={""}>{data.unit === "" && "Choose Unit"}</option>
                {UNIT.map((val, index) => (
                  <option key={index.toString()} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
              <SizeBox height={15} />
              <TextInput
                label="Price"
                name="price"
                type="number"
                placeholder="0.00"
                onChange={onChange}
              />
              <SizeBox height={15} />
              <TextInput
                label="Stock Available"
                name="stock"
                type="number"
                placeholder="0"
                onChange={onChange}
              />
              <SizeBox height={30} />
              <Button onClick={handleAddproduct}>Add Products</Button>
            </Col>
          </Row>
        </Container>
      </Sidebar>
    </>
  );
}
