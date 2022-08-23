import React ,{ useEffect, useMemo,useState } from 'react';
import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap'
import { getItem, KEY } from '../../utils/storage';

const NAVATION = [
    {
        name:'Home',
        url:"/"
    },
    {
        name:'Products',
        url:"/products"
    },
    {
        name:'Cart',
        url:"/cart"
    }
]


export default function Navigation(){
    const [data,setData] = useState(null);

    useEffect(()=>{
        getSession();
    },[])

    const getSession = async() =>{
        const user = await getItem(KEY.ACCOUNT);

       setData(user);
    }

    const displayLinks = useMemo(()=>{
        return(
            NAVATION.map((val,index)=>(
                <Nav.Link href={val.url}>{val.name}</Nav.Link>
            ))
        );
    },[])


    const displayAccount = useMemo(()=>{
      if(data){
        return(
            <NavDropdown title={data.firstname} id="basic-nav-dropdown" className="justify-content-end">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        );
      }
      return(
        <Nav>
        <Nav.Link>Login</Nav.Link>
        <Navbar.Text>
       /
      </Navbar.Text>
      <Nav.Link>Register</Nav.Link>
      </Nav>
      );
    },[data])

    return(
        <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                {displayLinks}
          </Nav>
          {displayAccount}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}