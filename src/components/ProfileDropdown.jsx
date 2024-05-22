import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileDropdown() {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <FaUserCircle className="w-6 h-6" />
            </label>
            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge badge-secondary">New</span>
                    </a>
                </li>
                <li>
                    <a>Settings</a>
                </li>
                <li>
                    <a>Logout</a>
                </li>
            </ul>
        </div>
    );
}