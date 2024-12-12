// Your code here
function createEmployeeRecord ([string1, string2, string3, number1]) {
    const records = {
        firstName: string1,
        familyName: string2,
        title: string3,
        payPerHour: number1, 
        timeInEvents: [],
        timeOutEvents: []
    };
    return records;
}


function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date,
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut -timeIn) / 100;
   };

function wagesEarnedOnDate(employeeRecord, date) {
   const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
   return hoursWorked * employeeRecord.payPerHour; 
}

function allWagesFor(employeeRecord) {
   const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
   const allWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
   }, 0);
   return allWages;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
     }, 0);
}