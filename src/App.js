import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import {BrowserRouter,Route,Router, Routes,} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
