import { ClipLoader } from 'react-spinners';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Header() {

    const [loading, setLoading] = useState(false);
    const [datas, setDatas] = useState(null);
  
    async function handleLogout(e) {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch("/api/adminlogout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
  
        const data = await res.json();
        console.log(data);
  
        if (res.ok) {
            localStorage.removeItem("token");
            await new Promise((resolve) => setTimeout(resolve, 500));
            window.location.href = "/cpanel/login";
  
        }
    }
  
    useEffect(() => {
      const fetchData = async () => {
          const token = localStorage.getItem("token");
  
          try {
              const response = await axios.get("api/user", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
  
              setDatas(response.data.email);
              setDatas(response.data.name);
          } catch (error) {
              console.error("Error fetching data", error);
          }
      };
  
      setTimeout(fetchData(), 100);
  }, []);


  return (
    <>
    {loading && (
        <div className="spinner-overlay">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      )}
    {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
    <div className="sticky top-0 left-0 z-30 flex items-center px-6 py-2 bg-white shadow-md shadow-black/5" >
    <button type="button" className="text-lg text-gray-600 sidebar-toggle">
        <i className="ri-menu-line"></i>
    </button>

    <ul className="flex items-center ml-4 text-sm">
        <li className="mr-2">
            <a href="#" className="font-medium text-gray-400 hover:text-gray-600">Dashboard</a>
        </li>
    </ul>
    <ul className="flex items-center ml-auto">
        <li className="mr-1 dropdown">
            {/* <button type="button" className="flex items-center justify-center w-8 h-8 text-gray-400 rounded dropdown-toggle hover:bg-gray-50 hover:text-gray-600">
                <i className="ri-search-line"></i>
            </button> */}
            <div className="z-30 hidden w-full max-w-xs bg-white border border-gray-100 rounded-md shadow-md dropdown-menu shadow-black/5">
                <form action="" className="p-4 border-b border-b-gray-100">
                    <div className="relative w-full">
                        <input type="text" className="w-full py-2 pl-10 pr-4 text-sm border border-gray-100 rounded-md outline-none bg-gray-50 focus:border-blue-500" placeholder="Search..." />
                        <i className="absolute text-gray-400 -translate-y-1/2 ri-search-line top-1/2 left-4"></i>
                    </div>
                </form>
                <div className="mt-3 mb-2">
                    <div className="text-[13px] font-medium text-gray-400 ml-4 mb-2">Recently</div>
                    <ul className="overflow-y-auto max-h-64">
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                    <div className="text-[11px] text-gray-400">$345</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "gray" }}>
          <i className="ri-notification-3-line"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="text-red-400 dropdown-item" href="#"> Notification not found</a></li>
          </ul>
        </li>

        {/* <li className="dropdown">
            <button type="button" className="flex items-center justify-center w-8 h-8 text-gray-400 rounded dropdown-toggle hover:bg-gray-50 hover:text-gray-600">
                <i className="ri-notification-3-line"></i>
            </button>
            <div className="z-30 hidden w-full max-w-xs bg-white border border-gray-100 rounded-md shadow-md dropdown-menu shadow-black/5">
                <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                    <button type="button" data-tab="notification" data-tab-page="notifications" className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications</button>
                    <button type="button" data-tab="notification" data-tab-page="messages" className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages</button>
                </div>
                <div className="my-2">
                    <ul className="overflow-y-auto max-h-64" data-tab-for="notification" data-page="notifications">
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                    <div className="text-[11px] text-gray-400">from a user</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                    <div className="text-[11px] text-gray-400">from a user</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                    <div className="text-[11px] text-gray-400">from a user</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                    <div className="text-[11px] text-gray-400">from a user</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                    <div className="text-[11px] text-gray-400">from a user</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul className="hidden overflow-y-auto max-h-64" data-tab-for="notification" data-page="messages">
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" />
                                <div className="ml-2">
                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </li> */}
        <li className="ml-3 dropdown">
            Hello!,&nbsp;{" "} {JSON.stringify(datas)}
            {/* <span className='font-semibold text-gray-700' style={{"textTransform": "capitalize" }}> {JSON.stringify(data).replace(/"/g, "")}</span> */}
                {/* <img src="https://placehold.co/32x32" alt="" className="block object-cover w-8 h-8 align-middle rounded" /> */}

            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                </li>
                <li>
                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                </li>
                <li>
                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                </li>
            </ul>
        </li>

        <li className="ml-3">
            <form onSubmit={handleLogout}>
                <button className="nav-link text-light"><i className="fa-solid fa-power-off" style={{ color:"gray" }}></i></button>
        </form>


        </li>
        
    </ul>
</div>
</>
  )
}
