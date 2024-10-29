import { useState } from 'react';
import BackgroundImage from './../assets/images/bg-image.png';
import Navbar from './../layouts/Navbar';
import { ClipLoader } from 'react-spinners';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import ky from 'ky';
//import $ from 'jquery';

const Login = () => {

  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          await axios.get("/sanctum/csrf-cookie");
          const response = await axios.post("/api/login", {
              email,
              password,
          });

          if (response.status === 200) {
              const login_ = window.location.href = '/dashboard';
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


  const handleContextMenu = (event) => {
    event.preventDefault();
    alert('Right-click is disabled on this image. Please avoid copying or saving.');
  };

  return (
    <div style ={{ backgroundImage: `url(${BackgroundImage})`,  backgroundSize: "cover",backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "700px", margin: "auto", padding: "0"}} onContextMenu={handleContextMenu} >
      <Navbar />
      {loading && (
        <div className="spinner-overlay">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      )}
        <div className="flex flex-col min-h-screen mt-10 md:flex-row">
          <div className="flex items-center justify-center w-full mt-10 md:w-1/2">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleLogin}>
              <h2 className="mb-6 text-2xl font-bold text-center text-slate-700">Login here</h2>
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
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
                className="w-full py-2 px-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign In
              </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don`t have an account?{" "}
                  <a
                    href="/register"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
   
      <div className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-12">
        <div className="p-6 bg-gray-100">
          <p className="text-4xl text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </p>

          <h2 className="mt-2 text-lg font-semibold text-center text-gray-800">
            Post you project
          </h2>

          <p className="mt-2 text-center text-gray-800">
            Here you can even post your projects, thesis, capstone, etc.. so
            that you can sell it here at a low price that others can afford.
          </p>
        </div>

        <div className="p-6 bg-gray-100">
          <p className="text-4xl text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </p>

          <h2 className="mt-2 text-lg font-semibold text-center text-gray-800">
            Pay before download
          </h2>

          <p className="mt-2 text-center text-gray-800">
            Before the project can be downloaded you have to pay for it in the
            amount posted here.<br></br>
            You can pay using gcash or whatever is stated as supported by the
            website.
          </p>
        </div>
        <div className="p-6 bg-gray-100">
          <p className="text-4xl text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </p>

          <h2 className="mt-2 text-lg font-semibold text-center text-gray-800">
            Download Project
          </h2>

          <p className="mt-2 text-center text-gray-800">
            When the project or whatever you have chosen is paid for, you can
            download it first and you can also contact the person who posted the
            project or whatever so that you can complain to him if there is a
            defect in what you downloaded.
          </p>
        </div>
        <div className="p-6 bg-gray-100">
          <p className="text-4xl text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          </p>

          <h2 className="mt-2 text-lg font-semibold text-center text-gray-800">
            Thank you
          </h2>

          <p className="mt-2 text-center text-gray-800">
            Thank you very much for enjoying this I made a simple website
            godbless to all of you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
