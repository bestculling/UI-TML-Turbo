import { FiBell } from 'react-icons/fi'
import { BiWorld } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { BiSolidDownArrow } from 'react-icons/bi'
import { MdDarkMode } from 'react-icons/md'

import { useStore } from '../store'

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
        <div className='flex justify-between p-3 shadow'>
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
                    <div className='flex items-center justify-between gap-5'>
                        <div className='flex cursor-pointer items-center gap-2'>

                            <div className='flex w-20 flex-col text-sm'>
                                <button onClick={handleSignOut} className='rounded-md bg-red-500 text-white'>
                                    logout
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}