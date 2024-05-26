import { useStore } from '../store';
import { MdLogout } from 'react-icons/md';
import { CiChat1 } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getApiUrl } from '../lib/utils'; // แก้ path  ตามโครงสร้าง  folder 
import MenuItem from './MenuItem';

export default function Navbar() {
  const { currentUser } = useStore();
  const signout = useStore((state) => state.signout);

  const handleSignOut = async () => {
    const url = `${getApiUrl()}api/auth/signout`;
    try {
      await fetch(url);
      signout();
      toast.error('คุณออกจากระบบแล้ว!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-3 shadow overflow-hidden">
      {/* Logo  และ  ชื่อ */}
      <div className="flex items-center pr-[80px]">
        <div className="flex cursor-pointer items-center gap-2 text-2xl">
          <div className="hidden sm:block">
            <img src="/Logo.png" alt="logo" className="h-9 w-9" />
          </div>
          <div className="font-bold">TML1-Turbo</div>
        </div>
      </div>

      {/* ส่วนของ  User  ที่  Login */}
      {currentUser && (
        <div className="flex gap-5 w-12 drawer z-10">
          <button className="btn btn-circle">
            <FaPen />
          </button>

          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* ปุ่ม  Hamburger  Menu */}
            <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate drawer-button">
              <input type="checkbox" />
              <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>

          {/*  Sidebar  Menu */}
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex flex-col gap-5 p-4 w-80 min-h-full bg-base-200">
              <MenuItem>เมนู</MenuItem>
              <div className="w-full">
                <MenuItem icon={CiChat1}>แชทกับ AI</MenuItem>
                <MenuItem icon={CiChat1}>Extension</MenuItem>
              </div>
              <hr />
              <MenuItem icon={MdLogout} onClick={handleSignOut}>
                ออกจากระบบ
              </MenuItem>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}