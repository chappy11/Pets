import { Carousel } from "react-bootstrap";
import * as S from "./style";

const img = require("../../../../asset/header-image.png");

const img1 = require("../../../../asset/pic1.jpg");
const img2 = require("../../../../asset/pic2.jpg");
const img3 = require("../../../../asset/pic3.jpg");
export default function Header() {
  return (
    <S.HeaderBackground>
      <S.HeaderContainer>
        <S.Column>
          <div>
            <S.HeaderText>Pet Society</S.HeaderText>
            <S.Subtitle>Your Pet, Our Passion</S.Subtitle>
          </div>
        </S.Column>
        <S.Column>
          <S.HeaderImage src={img} />
        </S.Column>
      </S.HeaderContainer>
    </S.HeaderBackground>
  );
}
