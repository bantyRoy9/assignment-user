import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Info from './pages/Info';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />}></Route>
      <Route path='/info' element={<Info/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
