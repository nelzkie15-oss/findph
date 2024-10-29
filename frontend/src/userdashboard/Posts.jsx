import Header from "../userlayouts/Header";
import Sidebar from "../userlayouts/Sidebar";
import AddPost from "./Modal/AddPost";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import EditPost from "./Modal/EditPost";
import DeletePost from "./Modal/DeletePost";

const Posts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const fetchResults = async (page = currentPage) => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");//user token id
      const response = await axios.get("/api/posts", {
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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //call edit modal/editpost
  const handleShowModal = (id) => {
    setSelectedItemId(id);
    const modal = new window.bootstrap.Modal(document.getElementById('editpostModal'));
    modal.show();
  };

    //call delete modal/deletepost
    const handleShowdeleteModal = (id) => {
      setSelectedItemId(id);
      const modal = new window.bootstrap.Modal(document.getElementById('deletepostModal'));
      modal.show();
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
        <div className="p-6">
          <div className="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
            <div className="row">
              <div className="col-md-10">
                <div className="font-medium text-gray-700">Manage Posts</div>
              </div>
              <div className="col-md-2">
                <AddPost />
                <button
                  type="button"
                  className="mb-2 btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addpostModal"
                >
                  New Post
                </button>
              </div>
            </div>
            <hr className="mb-2" />
            <div className="row">
              <div className="col-md-7"></div>
              <div className="col-md-5">
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
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] mb-3">
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-600 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Photo
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-600 py-2 px-4 bg-gray-50 text-left">
                      Title
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-600 py-2 px-4 bg-gray-50 text-left">
                      Description
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-600 py-2 px-4 bg-gray-50 text-left">
                      Price
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-600 py-2 px-4 bg-gray-50 text-left">
                      Link
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-600 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"></th>
                  </tr>
                </thead>
                <tbody>
                  {results.length ? (
                    results.map((post) => (
                      <tr key={post.id}>
                        <td className="px-4 py-2 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <img
                              src={`http://127.0.0.1:8000/storage/uploads/${post.file}`}
                              alt=""
                              className="block object-cover w-10 h-10 rounded"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {post.title}
                          </span>
                        </td>
                        <td className="px-4 py-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {post.description}
                          </span>
                        </td>
                        <td className="px-4 py-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                             {'Php '+ numberWithCommas(post.price)}
                          </span>
                        </td>
                        <td className="px-4 py-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {post.link}
                          </span>
                        </td>

                        <td className="px-4 py-2 border-b border-b-gray-50 flex">
                           <span className="text-[13px] font-medium text-gray-400">
                             <a href="javaScript:void(0)"  onClick={() => handleShowModal(post.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>    
                             {selectedItemId && <EditPost id={selectedItemId} />}
                          </span>&nbsp;

                          <span className="text-[13px] font-medium text-gray-400">
                             <a href="javaScript:void(0)"  onClick={() => handleShowdeleteModal(post.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>    
                             {selectedItemId && <DeletePost id={selectedItemId} />}
                          </span>

                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <div
                          className="mt-3 text-center alert alert-warning"
                          role="alert"
                        >
                          There are no posts
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <nav>
                <ul className="pagination justify-content-left">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Posts;
