import { ProSidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Row,Col} from 'react-bootstrap';
import React from 'react'
import {Link} from 'react-router-dom';
export default function Sidebar(props){
    
    function handleLogout(){
        localStorage.clear();
        window.location.href="/";
    }
    
    return(
        <Row style={{width:'100vw',height:'100vh'}}>
            <Col sm={2}  style={{width:'20vw',background:'blue'}} >
                <ProSidebar  collapsedWidth={'10vw'} collapse={true} >
                    <Menu iconShape='square'>
                        <MenuItem >Dashboard <Link to="/myshop" /> </MenuItem>
                        <MenuItem >Profile</MenuItem>
                        <MenuItem >Products <Link to="/myproduct" /></MenuItem>
                        <SubMenu title="Orders">
                            <MenuItem>Active</MenuItem>
                            <MenuItem>Pending</MenuItem>
                            <MenuItem>Ready For Delivery</MenuItem>
                            <MenuItem>Delivered</MenuItem>
                        </SubMenu>
                        <MenuItem >My Subscription <Link to="/mysubscription" /></MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </ProSidebar>
            </Col>
            <Col style={{width:'80vw'}}>
                {props.children}
            </Col>
        </Row>

    );
}