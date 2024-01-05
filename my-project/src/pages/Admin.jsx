import {Routes,Route} from 'react-router-dom'
import AdminHeader from '../components/AdminHeader';
import Products from '../components/Products';
import Orders from '../components/Orders';

function Admin() {
    return (
      <div >
        <AdminHeader/>
        <div>
            <Routes>
                <Route path='/' element= {<Products/>}/>
                <Route path='products' element= {<Products/>}/>
                <Route path='orders' element= {<Orders/>}/>
            </Routes>
        </div>
      </div>
    );
  }
  
  export default Admin;
  