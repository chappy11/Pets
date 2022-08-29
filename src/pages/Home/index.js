import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Navigation from '../../components/Navigation';
import ProductList from './components/ProductList';


export default function Home(){
    return(
        <>        
            <Navigation/>
            <Header/>
            <ProductList/>
       </>

    )
}