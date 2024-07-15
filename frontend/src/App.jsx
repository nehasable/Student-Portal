
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
import Student from './pages/student/Student';
import Teacher from './pages/teacher/Teacher';
function App() {
 

  return (
    <>
       <BrowserRouter>
      <Routes>
      <Route path="/intermediate" element={<Intermediate/>}/>
       <Route path="/signin" element={<SignIn/>} />
       <Route path="/student/signup" element={ <SignUp/>} /> 
       <Route path="/teacher/signup" element={ <SignUp/>} /> 

       <Route path="/student" element={ <Student/>} /> 
       <Route path="/teacher" element={ <Teacher/>} /> 
       <Route path="/" element={ <Home/>} />   
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
