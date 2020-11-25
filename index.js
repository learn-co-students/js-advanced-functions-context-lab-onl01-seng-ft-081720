/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const createEmployeeRecord = employeeRow => {
    return {
        firstName: employeeRow[0],
        familyName: employeeRow[1],
        title: employeeRow[2],
        payPerHour: employeeRow[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employeeRows => {
    return employeeRows.map(employeeRow => {
        return createEmployeeRecord(employeeRow)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

const hoursWorkedOnDate = function(dateString) {
    const timeIn = this.timeInEvents.find(e => {
        return e.date === dateString
    })
    const timeOut = this.timeOutEvents.find(e => {	  
        return e.date === dateString	       
    })	   
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(dateString) {
    const wage = hoursWorkedOnDate.call(this, dateString) * this.payPerHour
    return parseFloat(wage.toString())
}


let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(money, employee){
        return money + allWagesFor.call(employee)
    }, 0)
}

const findEmployeeByFirstName = (employeeRecords, firstName) => {
    return employeeRecords.find(employee => {
        return employee.firstName === firstName
    })
}