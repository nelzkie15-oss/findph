import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../adminlayouts/Header";
import Sidebar from "../adminlayouts/Sidebar";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);


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
                  <div className="mb-1 text-2xl font-semibold">0</div>
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
                  <div className="mb-1 text-2xl font-semibold">0</div>
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
                  <div className="mb-1 text-2xl font-semibold">0</div>
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

export default AdminDashboard;
