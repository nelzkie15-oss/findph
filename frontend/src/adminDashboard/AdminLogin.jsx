import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import ky from 'ky';
//import $ from 'jquery';

  const AdminLogin = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    // const navigate = useNavigate();
  
    const handleAdminlogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("/api/loginadmin", {
                email,
                password,
            });
  
            if (response.status === 200) {
                const login_ = window.location.href = '/admin/dashboard';
                await new Promise((resolve) => setTimeout(resolve, login_, 1000));
                localStorage.setItem('user_id', response.data.user_id);
                console.log("Token:", response.data.access_token);
                localStorage.setItem("token", response.data.access_token);
                //navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid login credentials");
            } else {
                setErrorMessage("Something went wrong.");
            }
        } finally {
          setLoading(false);
       }
    };

  return (
    <>
    <div style ={{ backgroundSize: "cover",backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "700px", margin: "auto", padding: "0"}} >
    {loading && (
      <div className="spinner-overlay">
        <ClipLoader color="#000" loading={loading} size={50} />
      </div>
    )}
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-600"><i className="ri-login-box-line"></i> Admin Login</h2>
        <form onSubmit={handleAdminlogin}>
        {errorMessage && (
                <div className="relative px-4 py-3 mt-1 mb-2 text-center text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                {/* <strong class="font-bold">user!</strong> */}
                <span className="block sm:inline">{errorMessage}</span>
                {/* <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="w-6 h-6 text-red-500 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span> */}
              </div>
              )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                    } rounded mt-1`}
            />
             {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email[0]}
                  </p>
                )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                    } rounded mt-1`}
            />
              {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password[0]}
                  </p>
                )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default AdminLogin;
