import { BiWorld } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import React from "react";
import NavbarLogo from "./NavbarLogo";
import ProfileDropdown from "./ProfileDropdown";
import NavbarMenu from "./NavbarMenu";

export default function Header() {
    return (
        <div className="w-full navbar shadow">
            <div className="flex-1">
                <NavbarLogo src="/Logo.png" text="TML1-Turbo" alt="ShopTouch_Logo" />
                <div className="flex-none">
                    <NavbarMenu />
                </div>
            </div>
            <div className="flex-none gap-2 hidden lg:inline-block">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <MdDarkMode className="w-6 h-6" />
                    </label>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <FiBell className="w-6 h-6" />
                            <span className="badge badge-sm badge-secondary indicator-item">
                                1
                            </span>
                        </div>
                    </label>
                    <div
                        tabIndex={0}
                        className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"
                    >
                        <div className="card-body">
                            <span className="font-bold text-lg">Notifications</span>
                            <hr />
                            {/* Develop... */}
                            <div className="p-3 bg-white rounded flex">
                                <div
                                    tabIndex={0}
                                    aria-label="heart icon"
                                    role="img"
                                    className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
                                            fill="#EF4444"
                                        />
                                    </svg>
                                </div>
                                <div className="pl-3">
                                    <p
                                        tabIndex={0}
                                        className="focus:outline-none text-sm leading-none"
                                    >
                                        <span className="text-indigo-700">TML1 Turbo</span>{" "}
                                        เข้าสู่ระบบเพื่อใช้งาน
                                        {/* <span className="text-indigo-700">item</span> */}
                                    </p>
                                    <p
                                        tabIndex={0}
                                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                                    >
                                        system reported
                                    </p>
                                </div>
                            </div>

                            <hr />
                            <span className="text-info text-center">
                                View all Notification
                            </span>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <BiWorld className="w-6 h-6" />
                    </label>
                    <div
                        tabIndex={0}
                        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                    >
                        <div className="card-body">
                            <span>ไทย</span>
                            <span className="text-info">English</span>
                        </div>
                    </div>
                </div>
                <ProfileDropdown />
            </div>
        </div>
    );
}