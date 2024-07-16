
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Intermediate from './pages/Intermediate';
import Home from './pages/Home';
import Student from './pages/student/Student';
import Teacher from './pages/teacher/Teacher';
import StudentSignUp from './pages/student/StudentSignUp';
import TeacherSignUp from './pages/teacher/TeacherSignUp';
import PrivateRoutes from './PrivateRoutes'
function App() {
  // const isLoggedIn = !!localStorage.getItem('token');
  // const PrivateRoute = ({ children }) => {
  //   const token = localStorage.getItem('token');
  //   console.log("token",token)
  //   if (!token) {
  //     return <Navigate to="/signin" />;
  //   }
  //   return children;
  // };
  


  return (
    <>
       <BrowserRouter>
      <Routes>
      <Route path="/intermediate" element={<Intermediate/>}/>
       <Route path="/signin" element={<SignIn />} />
       <Route path="/student/signup" element={ <StudentSignUp/>} /> 
       <Route path="/teacher/signup" element={ <TeacherSignUp/>} /> 
      
       {/* <Route path="/student" element={<PrivateRoutes><Student/></PrivateRoutes>} />
       <Route path="/teacher" element={<PrivateRoutes><Teacher/></PrivateRoutes>} /> */}
      
       <Route element={<PrivateRoutes />}>
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
        </Route>
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
