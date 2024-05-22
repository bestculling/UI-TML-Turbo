import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../lib/firebase'
import { useStore } from '../store'
import { toast } from "react-toastify";

export default function OAuth() {

    const { signInSuccess } = useStore();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleClick = async () => {
        setError('');
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch('https://beta-tml-turbo.onrender.com/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            toast.success("เข้าสู่ระบบสำเร็จ!")
            signInSuccess(data)
        } catch (error) {
            console.log(error)
            toast.error(err.message)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            {isLoading ? (
                <div className="loading">Loading...</div>
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