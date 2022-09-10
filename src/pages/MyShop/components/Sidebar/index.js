import { ProSidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Row,Col, Navbar, Container, Nav} from 'react-bootstrap';
import React from 'react'
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LogoutIcon from '@mui/icons-material/Logout';
import * as S from './style';
import { SizeBox } from '../../../../components';

export default function Sidebar(props){
    
    function handleLogout(){
        localStorage.clear();
        window.location.href="/";
    }
    
    return(
        <>
            <Navbar bg="dark" variant='dark' expand="lg">
                    <SizeBox width={'50'}/>
                    <Navbar.Brand>Pet Society</Navbar.Brand>
            
            </Navbar>
            <Row style={{width:'100vw',height:'100vh'}}>
                {/* <Col   style={{width:'20vw'}} > */}
                    <ProSidebar  collapsedWidth={100} style={{minWidth:100}}  collapse={true} width={'15vw'}>
                        <Menu >
                            <MenuItem icon={<DashboardIcon/>}>Dashboard <Link to="/myshop" /> </MenuItem>
                            <MenuItem icon={<PersonOutlineIcon/>} >Profile</MenuItem>
                            <MenuItem icon={<InventoryIcon/>}>Inventory <Link to="/myproduct" /></MenuItem>
                            <SubMenu icon={<PointOfSaleIcon/>} title="Orders">
                                <MenuItem icon={<PendingActionsIcon/>}>Pending</MenuItem>
                                <MenuItem icon={<DepartureBoardIcon/>}>Ready For Delivery</MenuItem>
                                <MenuItem icon={<LocalShippingIcon/>}>Delivered</MenuItem>
                            </SubMenu>
                            <MenuItem icon={<SubscriptionsIcon/>}>My Subscription <Link to="/mysubscription" /></MenuItem>
                            <MenuItem icon={<LogoutIcon/>} onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </ProSidebar>
                {/* </Col> */}
                
                <S.Body>
                    {props.children}
                </S.Body> 
            </Row>
        </>
    );
}