/**
 *  Utc time to Local date only
 *
 * @param {String} createdDate
 */
const toTimeOnly = (createdDate) => {
    let dateObj = new Date(createdDate);
    let hours = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : (dateObj.getHours() < 1) ? 12 : dateObj.getHours();
    let timeOfDay = dateObj.getHours() >= 12 ? ' PM' : ' AM';
    let minutes = (dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()
    let time = hours + ' :' + minutes + timeOfDay
    return time
};

const DateUtils = {
    toTimeOnly
};
export default DateUtils