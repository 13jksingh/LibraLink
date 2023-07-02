'use client'
const Time = () => {
    // Date and Time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const date = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return (
        <h1 className="py-3 font-semibold">{month} {date}, {year} | {day}, {hours}:{minutes}</h1>
    );
}

export default Time;