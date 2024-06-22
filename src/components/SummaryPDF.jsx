import React, { useState } from 'react';

function SummaryPDF() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            alert('กรุณาเลือกไฟล์ PDF');
            return;
        }

        // ตรวจสอบประเภทไฟล์ (ถ้าจำเป็น)
        if (selectedFile.type !== 'application/pdf') {
            alert('ไฟล์ต้องเป็น PDF เท่านั้น');
            return;
        }

        // ดำเนินการอัปโหลดไฟล์ที่นี่ (เช่น ส่งไปยังเซิร์ฟเวอร์)
        // ...
        console.log('กำลังอัปโหลดไฟล์:', selectedFile);
    };

    return (
        <div>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>อัปโหลด</button>

            {/* แสดงข้อมูลสรุป PDF (ถ้ามี) */}
            {selectedFile && (
                <div>
                    <h3>ข้อมูลไฟล์:</h3>
                    <p>ชื่อไฟล์: {selectedFile.name}</p>
                    <p>ขนาดไฟล์: {selectedFile.size} bytes</p>
                    {/* สามารถแสดงข้อมูลอื่นๆ ได้ตามต้องการ */}
                </div>
            )}
        </div>
    );
}

export default SummaryPDF;
