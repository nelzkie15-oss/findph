import Header from "../userlayouts/Header";
import Sidebar from "../userlayouts/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UProject = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    file: '',
    price: '',
    link: '',
    
  });

  const fetchResults = async (page = currentPage) => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id"); //user token id
      const response = await axios.get("/api/projects", {
        params: {
          query,
          page,
          perPage,
          user_id,
        },
      });
      setResults(response.data.data); // Results for the current page
      setTotal(response.data.total); // Total number of results
      setCurrentPage(response.data.current_page);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(); // Fetch results whenever query or currentPage changes
  }, [query, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    fetchResults(1); // Fetch results for page 1
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(total / perPage)) {
      setCurrentPage(page); // Update page number
      fetchResults(page); // Fetch results for the selected page
    }
  };

  const totalPages = Math.ceil(total / perPage);

  const isUserSignedIn = localStorage.getItem('token');


const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch("/api/projects", {
    method: "post",
    body: JSON.stringify(formValues),
    });
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await res.json();

    if (data.errors) {
        formValues(data.errors);
        setLoading(false);
    } else {
      toast.success("Thank you for choose my project!");
      setTimeout(() => {
        window.location.href = "https://pm.link/org-pAVRQmpXvUN7pYGLvwREQYYw/test/YVzAhMQ";
      }, 1000);
       
    }
  }
  const session_id = localStorage.getItem("user_id"); 
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setFormValues((prevValues) => ({
      ...prevValues,
        user_id: session_id, 
        seller_id: row.user_id,
        title: row.title,
        description: row.description, 
        file: row.file, 
        price: row.price,  
        link: row.link, 
    }));
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <>
      <Sidebar />
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black/50 md:hidden sidebar-overlay"></div>
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
        <Header />
        {loading && (
          <div className="spinner-overlay">
            <ClipLoader color="#000" loading={loading} size={50} />
          </div>
        )}
         <ToastContainer />
         <section id="feature-section" className="bg-gray-100 mt-0">
          <div className="container w-full xl:w-100 mx-auto py-10 px-4">
            {/* <h2
              className="text-3xl md:text-5xl font-black text-center text-gray-700 mb-14 tracking-tight"
              data-svelte-h="svelte-1h4n5pr"
            >
              Project
            </h2>{" "} */}
            <div className="row overflow-hidden">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center mb-4"
                >
                  <div className="relative w-full mr-2">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 text-sm border border-gray-100 rounded-md outline-none bg-gray-50 focus:border-blue-500"
                      placeholder="Search..."
                    />
                    <i className="absolute text-gray-400 -translate-y-1/2 ri-search-line top-1/2 left-4"></i>
                  </div>
                </form>
              </div>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-x-5 gap-y-5 text-lg tracking-tight" >
              {results.length ? (
                results.map((post) => (
                  <div key={post.id}>
                    <div className="">
                      <div
                        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                        title="Mountain"
                      ></div>
                      <div className="border-r border-b border-l border-gray-400 lg:border-l-1 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                          <p className="text-sm text-gray-600 flex items-center capitalize">
                            <i className="ri-user-search-line"></i>
                            &nbsp;{post.post_name}
                          </p>
                          <div
                            className="text-slate-800 text-xl font-semibold mb-2 mt-2"
                            style={{
                              textTransform: "capitalize",
                              fontSize: "1.1rem",
                            }}
                          >
                            {" "}
                            {post.title}
                          </div>
                          <img
                            className="w-100 h-40 mr-4"
                            src={`http://127.0.0.1:8000/storage/uploads/${post.file}`}
                            alt="Avatar of Writer"
                          />
                          <p className="text-gray-700 text-base normal-case" >
                            {post.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="text-sm">
                            <p className="text-gray-600 font-medium">Php {numberWithCommas(post.price)}</p>
                          </div>
                         </div>

                        {isUserSignedIn ? 
                        <form onSubmit={handleSubmit}>
                         <div className="px-4 pb-4 pt-0 mt-2">
                          <input
                            type="hidden"
                            name="price"
                          />
                          <button type="submit"
                          onClick={() => handleRowClick(post)} 
                            className="rounded-md bg-lime-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          >
                            <i className="ri-shopping-cart-line"></i> Buy a
                            project
                          </button>
                        </div>
                        </form>
                        :
                         <Link to="/">
                           <div className="px-4 pb-4 pt-0 mt-2">
                            <button
                              className="rounded-md bg-red-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button"
                            >
                              <i className="ri-shopping-cart-line"></i> Buy a
                              project
                            </button>
                          </div>
                          </Link>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
  
                  <h2 className="font-bold text-red-400">No result found...</h2>
               
              )}
            </div>
            <nav>
              <ul className="pagination justify-content-left mt-4">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
};

export default UProject;
