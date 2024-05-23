import React from 'react'
import OAuth from './OAuth'

function Login() {
    const formSubmit = (e) => {
        e.preventDefault()
        document.getElementById('my_modal_1').showModal()
    }
    return (
        <section className="h-full flex items-center justify-center">
            <div className="dark:bg-[#1d232a] border dark:border-[#aaaaaa] bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
                <div className="px-8">
                    <h2 className="dark:text-white font-bold text-2xl text-[#002D74]">เข้าสู่ระบบ</h2>
                    <form className="text-sm flex flex-col gap-4 mt-4" onSubmit={formSubmit}>
                        <input
                            type="email"
                            className="dark:bg-[#1d232a] p-2 rounded-xl border"
                            placeholder="Email / ชื่อผู้ใช้"
                        />
                        <input
                            type="password"
                            className="dark:bg-[#1d232a] p-2 rounded-xl border w-full"
                            placeholder="รหัสผ่าน"
                        />
                        <button
                            className="dark:bg-primary bg-[#002D74] text-white rounded-xl py-2 hover:scale-105
            duration-300"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </form>
                    <div className="dark:text-primary mt-2 text-xs text-[#002D74] underline">
                        <a href="#">ลืมรหัสผ่าน</a>
                    </div>
                    <div className="mt-6 text-gray-400 grid items-center grid-cols-3">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">หรือ</p>
                        <hr className="border-gray-400" />
                    </div>
                    <OAuth />

                    <div className="mt-5 text-xs flex justify-between items-center">
                        <p className="text-gray-400">คุณยังไม่มีบัญชีใช่หรือไม่?</p>
                        <a href="#" className="dark:text-primary text-[#002D74]">
                            สมัครสมาชิก
                        </a>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">ขออภัย!</h3>
                    <p className="py-4">ขณะนี้ทางทีมงานเร่งปรับปรุงการเข้าสู่ระบบจึงยังเข้าใช้งานไม่ได้ขณะนี้ ทางเราขอให้ท่านเข้าสู่ระบบด้วย Google แทน</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">ปิด</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </section>
    )
}

export default Login