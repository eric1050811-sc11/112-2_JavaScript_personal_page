// get the date of today
const TODAY = new Date();

// array that store the total days of the months
const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Zeller's congruence: algorithm that finds out the day of the week of a date
function zeller_congruence_index(year, month, day) {
    let c = Math.floor(year / 100);
    let y = year % 100;
    if (month <= 2) {
        month += 12;
        y--;
    }
    let w =
        (y +
            Math.floor(y / 4) +
            Math.floor(c / 4) -
            2 * c +
            Math.floor((26 * (month + 1)) / 10) +
            day -
            1) %
        7;
    if (w < 0) {
        w += 7;
    }
    return w;
}

// calculate and set the total days of the month
function set_total_days(year, month) {
    // check if leap year
    if (month == 2) {
        // leap year if perfectly divisible by 400
        if (year % 400 == 0) {
            return MONTH_DAYS[month] + 1; // 29 days in February
        }
        // not a leap year if divisible by 100 but not divisible by 400
        else if (year % 100 == 0) {
            return MONTH_DAYS[month];
        }
        // leap year if not divisible by 100 but divisible by 4
        else if (year % 4 == 0) {
            return MONTH_DAYS[month] + 1; // 29 days in February
        }
        // all other years are not leap years
        else {
            return MONTH_DAYS[month];
        }
    } else {
        // rest of the months
        return MONTH_DAYS[month];
    }
}

class Calender {
    // constructor: default inputs are the year and month of today
    constructor(year = TODAY.getFullYear(), month = TODAY.getMonth() + 1) {
        this.year = year;
        this.month = month;
        this.start_date = zeller_congruence_index(year, month, 1);
        this.total_days = set_total_days(year, month);
    }

    // function that returns the calender of the month
    // default inputs are the year and the month of the object
    html(year = this.year, month = this.month) {
        // use local variables to ensure that the year and month of the object are unchanged
        let local_start_date = zeller_congruence_index(year, month, 1);
        let local_total_days = set_total_days(year, month);
        let output = new String();

        // start of the table and caption of the calender
        output += "<table><caption>西元 " + year + " 年 " + month + "月</caption>";
        // first row of the calender
        output += "<tbody><tr class=f_bar><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>";

        // else of the calender
        output += "<tr class=e_bar>";

        // fill the spaces before first day of the month
        let i = 0;
        for (i; i < local_start_date; i++) {
            output += "<td></td>";
        }

        // print out all the days
        for (let day = 1; day <= local_total_days; day++) {
            output += ("<td>" + day + "</td>");

            // check if needed to move to next row
            if (i++ % 7 == 6) {
                output += "</tr><tr class=e_bar>";
            }
        }

        // fill the spaces after the last day of the month
        for (i; i % 7 != 0; i++) {
            output += "<td></td>";
        }

        // end of the table
        output += "</tr></tbody></table>";

        return output;
    }
}

// main function for testing
let myCalender = new Calender();
document.write(myCalender.html(), "<br>");

myCalender = new Calender(2023, 12);
document.write(myCalender.html(), "<br>");

document.write(myCalender.html(2024, 2), "<br>"); // "this line"

console.log(myCalender.year, myCalender.month); // after calling "this line", it won't change the original year and month of the object
