export function getDateFormatStr(date) {
    // use momentjs if needed in the future

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let dayStr = days[date.getDay()];
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${dayStr} ${day} ${month.toUpperCase()} ${year}`;
}