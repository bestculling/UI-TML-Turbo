export const fetchWithAuth = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include', // ส่ง cookie ด้วยเพื่อยืนยันตัวตน
        });

        if (response.status === 401) {
            // หาก token หมดอายุหรือไม่ถูกต้อง ให้พาผู้ใช้ไปยังหน้าเข้าสู่ระบบใหม่
            window.location.href = '/login'; // หรือใช้ react-router เพื่อพาผู้ใช้ไปยังหน้า login
            return Promise.reject(new Error('Token หมดอายุ กรุณาเข้าสู่ระบบใหม่'));
        }

        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};
