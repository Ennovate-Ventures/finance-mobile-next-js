"use client";

import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="navbar bg-black text-white py-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Ennovate Tracker</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="avatar placeholder">
              <div className="bg-gray-200 text-black w-12 rounded-full">
                <span>SY</span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
             <li>
              <a onClick={() => router.push("/expenditure")}>Expenditure</a>
            </li>
            <li>
              <a onClick={() => router.push("/income")}>Income</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
