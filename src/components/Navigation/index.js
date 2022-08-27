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
        const fetch = async() =>{
            const user = await getItem(KEY.ACCOUNT);

            setData(user);
        }

         fetch();
        
    },[]);


    const displayLinks = useMemo(()=>{
        return(
            NAVATION.map((val,index)=>(
                <Nav.Link href={val.url}>{val.name}</Nav.Link>
            ))
        );
    },[])

    
    return(
        <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">Pet Society</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                {displayLinks}
          </Nav>
          <p>{data?.firstname}</p>
          {data ? 
      (
        <Nav>            
            <NavDropdown title={data?.username} id="basic-nav-dropdown" className="justify-content-end">
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
          </Nav>

        )
      :    (
            <Nav>
            <Nav.Link href='/login'>Login</Nav.Link>
            <Navbar.Text>
           /
          </Navbar.Text>
          <Nav.Link href='/register'>Register</Nav.Link>
          </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}