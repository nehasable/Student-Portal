
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Intermediate from './pages/Intermediate';
import Home from './pages/Home';
function App() {
 

  return (
    <>
       <BrowserRouter>
      <Routes>
      <Route path="/intermediate" element={<Intermediate/>}/>
       <Route path="/signin" element={<SignIn/>} />
       <Route path="/signup" element={ <SignUp/>} /> 
       <Route path="/" element={ <Home/>} />   
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
