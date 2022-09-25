import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Category as Cat } from "../../../../services/Category";

export default function Categories(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await Cat.getCategory();

    if (resp.data.status == 1) {
      setCategories(resp.data.data);
    }
  };

  const displayCategories = useMemo(() => {
    return categories.map((val, i) => <p>{val.category_name}</p>);
  }, [categories]);

  return (
    <Row>
      <Col>{displayCategories}</Col>
      <Col>{props.children}</Col>
    </Row>
  );
}
