import React from 'react'
import Layout from './Layout'

function Update() {
    return (
        <Layout>
            <div className='flex flex-col justify-center items-center gap-12 text-white'>
                <div className='text-2xl'>
                    การอัปเดต
                </div>
                <div className='bg-[#1e1f20] rounded-lg p-8'>
                    <span className='text-bold text-2xl'>2024.06.23</span> <br />
                    <div className='m-3'>ฟีเจอร์ใหม่ของ TLM พร้อมให้บริการ</div>
                    <ul className="list-disc">
                        <li className='ml-8'>การสนทนาด้วยรูปภาพ: คุณเพียงแค่กดปุ่มอัพโหลดรูปภาพแล้วพิมพ์ข้อความของคุณ (ระบบจะไม่บันทึกภาพของคุณ)</li>
                        <div className='flex flex-col lg:flex-row justify-center m-5 gap-5'>
                            <img className='lg:w-[300px] lg:h-[500px]' src="23_6_24_1.png" alt="chat with image" />

                        </div>
                    </ul>
                    <ul className="list-disc">
                        <li className='ml-8'>ให้ TLM พูดด้วยเสียงกับคุณ: คุณเพียงแค่กดที่ข้อความของ TLM จากนั้นรอสักครู่ TLM จะพูดตามข้อความที่คุณกด</li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Update