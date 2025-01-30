import React, { useContext } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import ROLE from "../common/role";
import Context from "../context";

function Header() {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.Logout.url, {
      method: SummaryApi.Logout.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.error);
    }
  };
  console.log("header add to card count", context);

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center max-w-sm justify-between w-full border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here ..."
            className="w-full outline-none"
          />
          <div className="bg-red-400 text-lg min-w-[50px] h-8 flex items-center rounded-r-full text-white justify-center">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to="/cart" className="text-2xl relative">
              <span>
                <FaShoppingCart />

                <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-xs">{context?.cartProductCount}</p>
                </div>
              </span>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
