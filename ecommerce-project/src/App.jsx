import { HomePage } from './pages/HomePage';
import {Route, Routes} from 'react-router';
import './App.css'

function App() {
 

  return (
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/checkout" element={<div> testing checkout page</div>}/>
        
      </Routes>
     
   
  
  )
}

export default App
