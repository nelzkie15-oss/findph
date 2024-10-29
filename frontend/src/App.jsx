import Login from "./guest/Login";
import Register from "./guest/Register";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./userdashboard/dashboard";
import Notfound from "./components/Notfound";
import Posts from "./userdashboard/Posts";
import Sales from "./userdashboard/Sales";
// import Buyer from "./userdashboard/Buyer";
// import CommentPosts from './userdashboard/CommentPosts';
import Contact from "./userdashboard/Contact";
import Account from "./userdashboard/Account";
import Project from "./guest/Project";
import UProject from "./userdashboard/UProject";
import AdminDashboard from './adminDashboard/AdminDashboard';
import AdminLogin from "./adminDashboard/AdminLogin";

function App() {
  const isUserSignedIn = localStorage.getItem('token');
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/cpanel/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/project" element={<Project />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isUserSignedIn ? <Dashboard /> : <Notfound />} />   
          <Route path="/post" element={isUserSignedIn ? <Posts /> : <Notfound />} />  
          <Route path="/uproject" element={isUserSignedIn ? <UProject /> : <Notfound />} />  
          <Route path="/sales" element={isUserSignedIn ? <Sales /> : <Notfound />} />  
          {/* <Route path="/buyer" element={isUserSignedIn ? <Buyer /> : <Notfound />} />   */}
          <Route path="/admin/dashboard" element={isUserSignedIn ? <AdminDashboard /> : <Notfound />} />  
          {/* <Route path="/commentpost" element={isUserSignedIn ? <CommentPosts /> : <Notfound />} />   */}
          <Route path="/contact" element={isUserSignedIn ? <Contact /> : <Notfound />} />  
          <Route path="/account" element={isUserSignedIn ? <Account /> : <Notfound />} />  
          <Route path="*" element={<Notfound />} /> 
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
