import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../lib/firebase';
import { useStore } from '../store';
import { toast } from 'react-toastify';
import { getApiUrl } from '../lib/utils';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate();
    const { signInSuccess } = useStore();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkTokenExpiry = () => {
            const token = Cookies.get('access_token');
            if (token) {
                const decodedToken = jwt_decode(token); // ถอดรหัส token เพื่อดู expiry time
                if (decodedToken.exp * 1000 < Date.now()) {
                    Cookies.remove('access_token'); // ลบ token หากหมดอายุ
                    navigate('/login'); // Redirect ไปที่ /login
                }
            }
        };

        checkTokenExpiry(); // ตรวจสอบตอนเริ่มต้น
        const interval = setInterval(checkTokenExpiry, 3600000); // ตรวจสอบทุก 1 ชั่วโมง

        return () => clearInterval(interval); // เคลียร์ interval เมื่อ component unmount
    }, [navigate]);

    const handleGoogleClick = async () => {
        setError('');
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            // ขอ Firebase ID Token
            const firebaseToken = await result.user.getIdToken();

            const url = `${getApiUrl()}api/auth/google`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // ส่ง cookies ไปพร้อมกับ request
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    firebaseToken: firebaseToken, // ส่ง Firebase ID Token ไปด้วย
                }),
            });

            if (res.ok) {
                const data = await res.json();

                // ตรวจสอบว่าได้รับ token จาก backend
                if (data.token) {
                    Cookies.set('access_token', data.token); // เก็บ token ที่ได้จาก backend ใน cookie
                } else {
                    console.error('Backend did not return a token');
                }

                toast.success('เข้าสู่ระบบสำเร็จ!');
                signInSuccess(data);
                navigate('/');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading ? (
                // Loading State สุดเท่  ✨
                <button
                    type="button"
                    className="bg-white px-2 py-2 mt-5 border w-full rounded-xl flex justify-center items-center text-sm opacity-70 cursor-not-allowed"
                    disabled
                >
                    <img src="/google-logo.png" width={30} height={30} alt="Google Logo" className="animate-spin" />{' '}
                    <span className="px-2">กำลังเข้าสู่ระบบ...</span>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleGoogleClick}
                    className="bg-white px-2 py-2 mt-5 border w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
                >
                    <img src="/google-logo.png" width={30} height={30} alt="Google Logo" />{' '}
                    <span className="px-2">Google</span>
                </button>
            )}
        </div>
    );
}