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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/register' element={<Register/>} />
        <Route  path='/createshop' element={<CreateShop/>}/>
        <Route  path='/myshop' element={<MyShop/>}/>
        <Route  path='/myproduct' element={<Product/>}/>
        <Route  path='/addproduct' element={<AddProduct/>}/>
        <Route  path='/admin' element={<Admin/>}/>
        <Route  path='/pendinguser' element={<PendingUser/>}/>
        <Route path="/pendingshop" element={<PendingShop/>}/>
        <Route path="/mysubscription" element={<Subscription/>}/>
        <Route path="/choosesubscription" element={<ChooseSubscription/>}/>
        <Route path="/viewproduct/:id" element={<ViewProduct/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
