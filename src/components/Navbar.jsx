import { useStore } from '../store';
import { MdLogout } from 'react-icons/md';
import { CiChat1 } from 'react-icons/ci';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getApiUrl } from '../lib/utils';
import MenuItem from './MenuItem';
import { IoMenu } from "react-icons/io5";

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
    <div className='drawer z-10 w-full p-3 shadow overflow-hidden flex justify-between items-center'>
      <div className='flex'>
        {currentUser && (<div>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="">
              <div className='text-white text-2xl btn bg-[#0e0e0f] border-none active:bg-[#1e1f20]'>
                <IoMenu />
              </div>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="h-full flex flex-col gap-5 p-4 w-80 min-h-full bg-[#1e1f20]">
              <MenuItem><span className='text-white'>เมนู</span></MenuItem>
              <div className='h-full flex flex-col justify-between'>
                <div className="w-full">
                  <MenuItem icon={CiChat1}>แชทกับ AI</MenuItem>
                  {/* <MenuItem icon={CiChat1}>สอบถามโค้ดของคุณ</MenuItem> */}
                </div>
                <div>
                  <MenuItem icon={MdLogout} onClick={handleSignOut}>
                    ออกจากระบบ
                  </MenuItem>
                </div>
              </div>
            </div>
          </div>
        </div>)}

        <div className="flex items-center mr-5">
          <div className="flex cursor-pointer items-center gap-2 text-2xl">
            <div className="hidden sm:block">
              <img src="/Logo.png" alt="logo" className="h-9 w-9" />
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">TLM</div>
          </div>
        </div>

        {currentUser && (<div className='flex items-center mr-5'>
          <div onClick={() => document.getElementById('my_modal_1').showModal()} className='text-gray-300 text-lg bg-[#1e1f20] p-3 rounded-full hover:cursor-pointer'>
            <RiDeleteBin6Fill />
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">ลบประวัติการสนทนา</h3>
              <p className="py-4">คุณต้องการลบประวัติการสนทนาทั้งหมดหรือไม่?</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className='flex gap-5'>
                    <button className="btn btn-primary" onClick={handleDeleteConversations}>ตกลง</button>
                    <button className="btn">ยกเลิก</button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>)}
      </div>


      {currentUser && (
        <div className="flex mr-2">
          <div className="bg-gradient-to-r from-red-500 to-violet-500 w-10 h-10 flex justify-center items-center rounded-full">
            <img className="rounded-full p-1" src={currentUser.profilePicture} />
          </div>
        </div>
      )}
    </div>
  );
}