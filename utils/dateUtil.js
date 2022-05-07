// check if date is valid
const isDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(date)) {
        return false;
    } else {
        const dateArray = date.split('-');
        let [year, month, day] = dateArray;
        year = parseInt(year);
        month = parseInt(month);
        day = parseInt(day);
        if(month < 1 || month > 12) {
            return false;
        }
        if(day < 1 || day > 31) {
            return false;
        }
        if(month === 2) {
            if(isLeapYear(year)) {
                if(day < 1 || day > 29) {
                    return false;
                }
            } else {
                if(day < 1 || day > 28) {
                    return false;
                }
            }
        } else if(isThirtyDayMonth(month) && (day < 1 || day > 30)) {
            return false;
        }
        return true;
    }
}

const isLeapYear = (year) => {
    // check if year is a leap year
    return ((year % 4 === 0) && (year % 100 !== 0)) || year % 400 === 0;
}

// check if month is 30 day
const isThirtyDayMonth = (month) => {
    // store 30 day months in a set for O(1) lookup
    const thirtyDayMonths = new Set([4, 6, 9, 11]);
    return thirtyDayMonths.has(parseInt(month));
}

// console.log(isDate('2020-09-31'));
module.exports = { isDate };