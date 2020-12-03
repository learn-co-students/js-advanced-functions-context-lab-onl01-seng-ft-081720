/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrays){
    return arrays.map(row => createEmployeeRecord(row))
}

let  createTimeInEvent = function(date){
    let newDate = date.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(newDate[1]),
        date: newDate[0]
    })
    return this 
}

let createTimeOutEvent = function(date){
    let newDate = date.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(newDate[1]),
        date: newDate[0]
    })
    return this
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(el => el.date == date).hour
    let timeOut = this.timeOutEvents.find(el => el.date == date).hour

    return (parseInt(timeOut) - parseInt(timeIn))/100
}

let wagesEarnedOnDate =  function(date){
    let earnings = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return earnings
}


let findEmployeeByFirstName = function(array, name){
    return array.find(function(employee){return employee.firstName == name })
}

let calculatePayroll = function(array){
    return array.reduce(function(acc, cv){
        return acc + allWagesFor.call(cv)
    }, 0)
}