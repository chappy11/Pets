import { Carousel } from "react-bootstrap";
import * as S from "./style";

const img = require("../../../../asset/header-image.png");


export default function Header() {
  return (
    <S.HeaderBackground>
      <S.HeaderContainer>
        <S.Column >
          <div>
            <S.HeaderText>Pet Society</S.HeaderText>
            <S.Subtitle>Your Pet, Our Passion</S.Subtitle>
          </div>
        </S.Column>
        <S.ColumnImage>
          <S.HeaderImage src={img} />
        </S.ColumnImage>
      </S.HeaderContainer>
    </S.HeaderBackground>
  );
}
