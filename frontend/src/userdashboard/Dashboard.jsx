import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../userlayouts/Header";
import Sidebar from "../userlayouts/Sidebar";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [setData] = useState(null);
  const [counts, setCounts] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.email);
        setData(response.data.name);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  //count my posts
  async function countallMyposts() {
    const sessionId = localStorage.getItem("user_id");
    const res = await fetch("http://127.0.0.1:8000/api/count", {
      method: "post",
      headers: {
        _user_id: sessionId,
      },
      withCredentials: true,
    });

    const data = await res.json();
    console.log("Posts Count:", data.count);

    if (res.ok) {
      setCounts(data.count);
    }
  }

  useEffect(() => {
    countallMyposts();
  }, []);

  const fetchPriceCount = async () => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id"); //user token id
      const response = await axios.get("/api/countprice", {
        params: {
          user_id,
        },
      });
      setCount(response.data.count); // Results for the current page
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPriceCount(); // Fetch results whenever query or currentPage changes
  }, []);

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
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="mb-1 text-2xl font-semibold">{counts}</div>
                  <div className="text-sm font-medium text-gray-400">Posts</div>
                </div>
              </div>
              <Link
                to="/post"
                className="text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                View details
              </Link>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="mb-1 text-2xl font-semibold">{count}</div>
                  <div className="text-sm font-medium text-gray-400">Sales</div>
                </div>
              </div>
              <Link
                to="/sales"
                className="text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                View details
              </Link>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="mb-1 text-2xl font-semibold">{count}</div>
                  <div className="text-sm font-medium text-gray-400">Paid</div>
                </div>
              </div>
              <Link
                to="/sales"
                className="text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
