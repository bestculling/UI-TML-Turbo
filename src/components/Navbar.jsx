import { useStore } from '../store';
import { MdLogout } from 'react-icons/md';
import { CiChat1 } from 'react-icons/ci';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getApiUrl } from '../lib/utils';
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

  const handleDeleteConversations = async () => {
    if (!currentUser) {
      toast.error('คุณต้องเข้าสู่ระบบก่อน!');
      return;
    }

    const url = `${getApiUrl()}api/conversations/${currentUser._id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('ลบการสนทนาทั้งหมดเรียบร้อยแล้ว!');
        // Reload the page
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(`เกิดข้อผิดพลาด: ${errorData.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('เกิดข้อผิดพลาดในการลบการสนทนา.');
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
          <div className="font-bold">TLM</div>
        </div>
      </div>

      {/* ส่วนของ  User  ที่  Login */}
      {currentUser && (
        <div className="flex gap-5 w-12 drawer z-10">
          <button className="btn btn-circle" onClick={handleDeleteConversations}>
            <RiDeleteBin6Fill />
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
                <MenuItem icon={CiChat1}>สอบถามโค้ดของคุณ</MenuItem>
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