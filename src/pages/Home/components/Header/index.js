import {Carousel} from 'react-bootstrap';
import * as S from './style';

const img1 = require('../../../../asset/pic1.jpg');
const img2 = require('../../../../asset/pic2.jpg');
const img3 = require('../../../../asset/pic3.jpg');
export default function Header(){
    return(
        <Carousel variant='dark'>
              <Carousel.Item interval={1000}>
        <S.Image
          style={{width:'100vw',height:'100vh'}}
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        <S.Image
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <S.Image
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
        </Carousel>
    );
}