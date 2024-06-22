import React from 'react'
import Navbar from './Navbar';
import Notification from './Notification'

function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen w-screen overflow-scroll bg-[#0e0e0f]">
            <Navbar />
            <div className="flex h-full overflow-scroll">
                <div className="flex-1">
                    <div className="container mx-auto p-4 h-full">
                        {children}
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default Layout