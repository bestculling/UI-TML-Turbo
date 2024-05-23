export function convertToFormattedString(conversations, limit = 50) {
    let result = "";
    // เริ่มวนลูปจากประโยคสุดท้าย
    for (let i = conversations.length - 1; i >= 0 && i > conversations.length - limit - 1; i--) {
        const item = conversations[i];
        result += `ประโยคที่ ${conversations.length - i}\n ข้อความของฉัน: ${item.prompt}\nข้อความของคุณ: ${item.response}\n`;
    }
    return result;
}