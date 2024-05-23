import { useStore } from '../store'
import { MdLogout } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { FaPen } from "react-icons/fa";

export default function Navbar() {

    const { currentUser } = useStore()
    const signout = useStore((state) => state.signout);

    const handleSignOut = async () => {
        try {
            await fetch('https://beta-tml-turbo.onrender.com/api/auth/signout');
            signout()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex p-3 shadow overflow-hidden'>
            <div className='flex items-center pr-[80px]'>
                <div className='flex cursor-pointer items-center gap-2 text-2xl'>
                    <div className='hidden sm:block'>
                        <img src={'/Logo.png'} alt={'logo'} className="h-9 w-9" />
                    </div>
                    <div className='font-bold'>TML1-Turbo</div>
                </div>
            </div>

            {
                currentUser && (
                    <div className="flex gap-5 w-12 drawer z-10">

                        <div className='flex'>
                            <button className="btn btn-circle">
                                <FaPen />
                            </button>
                        </div>

                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate drawer-button">

                                {/* this hidden checkbox controls the state */}
                                <input type="checkbox" />

                                {/* hamburger icon */}
                                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                                {/* close icon */}
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="flex flex-col gap-5 p-4 w-80 min-h-full bg-base-200">
                                <div><button className='flex items-center rounded-md text-white'>
                                    ล่าสุด
                                </button></div>
                                <div className='w-full'>
                                    <div className='flex gap-5  items-center rounded-md text-gray-500 hover:bg-gray-900 p-3'>
                                        <CiChat1 />
                                        แชทกับ AI
                                    </div>
                                    <div className='flex gap-5 items-center rounded-md text-gray-500 hover:bg-gray-900 p-3'>
                                        <CiChat1 />
                                        Extension
                                    </div>
                                </div>
                                <hr />
                                <div><button onClick={handleSignOut} className='flex items-center btn rounded-md text-white'>
                                    <MdLogout />
                                    ออกจากระบบ
                                </button></div>

                            </div>
                        </div>
                    </div>

                )
            }

        </div>
    )
}