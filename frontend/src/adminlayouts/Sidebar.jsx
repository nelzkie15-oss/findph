import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 z-50 w-64 h-full p-4 transition-transform bg-green-900">
      <Link
        to="/dashboard"
        className="flex items-center pb-4 border-b border-b-gray-800"
      >
        <img
          src="https://placehold.co/32x32"
          alt=""
          className="object-cover w-8 h-8 rounded"
        />
        <span className="ml-3 text-lg font-bold text-white">Logo</span>
      </Link>
      <ul className="mt-4">
        <li className="mb-1 group active">
          <Link
            to="/dashboard"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <i className="mr-3 text-lg ri-dashboard-2-line"></i>
            <span className="text-sm">Dashboard</span>
          </Link>
        </li>
        <li className="mb-1 group">
          <Link
            to="/post"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
          >
            <i className="mr-3 text-lg ri-file-user-line"></i>
            <span className="text-sm">Posts</span>
          </Link>
        </li>

        <li className="mb-1 group">
          <Link
            to="/uproject"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
          >
            <i className="mr-3 ri-download-cloud-line"></i>
            <span className="text-sm">Project</span>
          </Link>
        </li>

        <li className="mb-1 group">
          <Link
            to="/sales"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
          >
            <i className="mr-3 text-lg ri-money-dollar-circle-line"></i>
            <span className="text-sm">Sales</span>
          </Link>
        </li>
        {/* 
        <li className="mb-1 group">
            <Link to="/buyer" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
            <i className="mr-3 text-lg ri-group-line"></i>
                <span className="text-sm">Buyer</span>
            </Link>
        </li> */}

        {/* <li className="mb-1 group">
            <Link to="/commentpost" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
            <i className="mr-3 text-lg ri-message-3-line"></i>
                <span className="text-sm">Comment Post</span>
            </Link>
        </li> */}

        <li className="mb-1 group">
          <Link
            to="/contact"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
          >
            <i className="mr-3 text-lg ri-contacts-book-2-line"></i>
            <span className="text-sm">Contact</span>
          </Link>
        </li>

        <li className="mb-1 group">
          <Link
            to="/account"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <i className="mr-3 text-lg ri-phone-lock-line"></i>
            <span className="text-sm">Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
