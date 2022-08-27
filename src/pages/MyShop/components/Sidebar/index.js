import { ProSidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Row,Col} from 'react-bootstrap';
import React from 'react'
import {Link} from 'react-router-dom';
export default function Sidebar(props){
    return(
        <Row>
            <Col lg={2}>
            <ProSidebar style={{height:'100vh'}}>
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
                </Menu>
            </ProSidebar>
            </Col>
            <Col>
                {props.children}
            </Col>
        </Row>

    );
}