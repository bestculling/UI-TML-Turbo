import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi'
import { useStore } from '../store';

export default function Authentication() {

    const { setPIN } = useStore();

    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('https://beta-tml-turbo.onrender.com/api/pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin }),
            });

            if (response.ok) {
                const data = await response.json();
                setPIN(data.message)
                setMessage(data.message);
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center font-bold'>
            <div className='rounded-full bg-gray-500 p-8 text-5xl text-white'>
                <FiLock />
            </div>
            <div className='mt-5 text-5xl'>Protected</div>
            <div className='my-5 text-2xl text-gray-500'>please enter secrete code</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="grow" />
                    </label>
                </div>
                <button className="dark:text-white mt-4 btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
            </form>

            {isLoading && <div className="loading">Loading...</div>}
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    )
}