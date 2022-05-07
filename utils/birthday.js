const { isDate } = require('./dateUtil');

const nextBirthday = (birthday) => {
    if(!isDate(birthday)) {
        return -1;
    }
    // extract birthday date and month only
    const dateArray = birthday.split('-');
    let [year, month, day] = dateArray;
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    // check if birthday is today
    const today = new Date();
    if(today.getMonth() === month - 1 && today.getDate() === day) {
        return 0;
    }
    // calculate next birthday
    const nextBirthday = new Date(year, month - 1, day);
    nextBirthday.setFullYear(today.getFullYear());
    const diff = nextBirthday - today;
    // console.log(diff);
    // check if birthday has passed for the current year
    if(diff < 0) {
        year = today.getFullYear() + 1;
        nextBirthday.setFullYear(year);
        console.log(nextBirthday)
        return Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    }
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// console.log(nextBirthday('2020-02-20'));
module.exports = { nextBirthday };
