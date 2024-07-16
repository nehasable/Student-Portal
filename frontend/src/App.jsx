
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Intermediate from './pages/Intermediate';
import Home from './pages/Home';
import Student from './pages/student/Student';
import Teacher from './pages/teacher/Teacher';
import StudentSignUp from './pages/student/StudentSignUp';
import TeacherSignUp from './pages/teacher/TeacherSignUp';
function App() {
 

  return (
    <>
       <BrowserRouter>
      <Routes>
      <Route path="/intermediate" element={<Intermediate/>}/>
       <Route path="/signin" element={<SignIn />} />
       <Route path="/student/signup" element={ <StudentSignUp/>} /> 
       <Route path="/teacher/signup" element={ <TeacherSignUp/>} /> 

       <Route path="/student" element={ <Student/>} /> 
       <Route path="/teacher" element={ <Teacher/>} /> 
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
