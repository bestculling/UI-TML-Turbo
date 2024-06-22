import React from 'react';
import OAuth from './OAuth';
import Layout from './Layout';

function Login() {

    return (
        <Layout>
            <section className="h-full flex items-center justify-center">
                <div className="dark:bg-[#1d232a] border dark:border-[#aaaaaa] bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
                    <div className="px-8">
                        <h2 className="dark:text-white font-bold text-2xl text-[#002D74]">เข้าสู่ระบบ</h2>
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <p className="text-gray-400 text-sm">เข้าสู่ระบบด้วยบัญชี Google</p>
                            <OAuth />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Login;