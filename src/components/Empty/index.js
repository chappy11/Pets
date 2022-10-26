import React, { useMemo, useState } from "react";
import * as S from "./style";

const EMPTY_CART = require("../../asset/empty/empty-cart.png");
const EMPTY_ORDER = require("../../asset/empty/emptyorder.png");
export default function Empty(props) {
  const [size, setsize] = useState({
    width: 0,
    height: 0,
  });
  const displayType = useMemo(() => {
    let type = "";

    if (props?.type === "cart") {
      type = EMPTY_CART;
      setsize({
        width: 500,
        height: 500,
      });
    }

    if (props?.type === "order") {
      type = EMPTY_ORDER;
      setsize({
        width: 200,
        height: 200,
      });
    }

    return type;
  }, [props.type]);

  return (
    <S.Container>
      <S.Image
        src={displayType}
        alt="empty image"
        width={size.width}
        height={size.height}
      />
    </S.Container>
  );
}
