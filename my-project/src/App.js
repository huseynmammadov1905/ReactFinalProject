
import Main from './pages/Main';
import {Routes,Route} from 'react-router-dom'
import Shopping from './pages/Shopping';
import MyBag from './pages/MyBag';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      
      <Main/>
      <Routes>
        <Route path='/' element={<Shopping/>}/>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/my-bag' element={<MyBag/>}/>
      </Routes>
    </>
  );
}

export default App;
