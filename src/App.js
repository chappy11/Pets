import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import {BrowserRouter,Route,Router, Routes,} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateShop from './pages/CreateShop';
import MyShop from './pages/MyShop';
import AddProduct from './pages/MyShop/Product/AddProduct';
import Product from './pages/MyShop/Product';
import Admin from './pages/Admin';
import PendingUser from './pages/Admin/PendingUser';
import PendingShop from './pages/Admin/PendingShop';
import Subscription from './pages/MyShop/Subscription';
import ChooseSubscription from './pages/MyShop/ChooseSubscription';
import ViewProduct from './pages/ViewProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { getItem, KEY } from './utils/storage';
import { useCallback, useEffect, useState } from 'react';
import PageNotFound from './pages/PageNotFound';




function App() {
  const [currentSession,setCurrentSession] = useState(null);

  useEffect(()=>{
    getSession();
  },[])

  const getSession = async() =>{
    const user  = await getItem(KEY.ACCOUNT)
    
  setCurrentSession(user);
  }

  const displayRoutes = useCallback(()=>{
    if(!currentSession){
      return(
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path="/viewproduct/:id" element={<ViewProduct/>}/>
          <Route  path='/login' element={<Login/>} />
          <Route  path='/register' element={<Register/>} />
          <Route  path='/createshop' element={<CreateShop/>}/>
        </Routes>
       );
    }
   
    if(currentSession.user_roles == 1){
      return (
        <Routes>
          <Route  path='/myshop' element={<MyShop/>}/>
          <Route  path='/myproduct' element={<Product/>}/>
          <Route  path='/addproduct' element={<AddProduct/>}/>
          <Route path="/mysubscription" element={<Subscription/>}/>
          <Route path="/choosesubscription" element={<ChooseSubscription/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      )
    }

    if(currentSession.user_roles == 2){
        return(
          <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path="/viewproduct/:id" element={<ViewProduct/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        );
    } 

    if(currentSession.user_roles == 0){
      return(
        <Routes>
          <Route  path='/admin' element={<Admin/>}/>
          <Route  path='/pendinguser' element={<PendingUser/>}/>
          <Route path="/pendingshop" element={<PendingShop/>}/>
          <Route path='*' element={<PageNotFound/>}/>
      </Routes> 
      )
    }

   
  },[currentSession])
  
  return (
    <BrowserRouter>
      {displayRoutes()}
    </BrowserRouter>
  );
}

export default App;
