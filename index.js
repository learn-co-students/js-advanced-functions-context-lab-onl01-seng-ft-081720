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


const createEmployeeRecord = function(row){
    let newEmployee = {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}


const createEmployeeRecords = function(arrayOfArrays){
    return arrayOfArrays.map(row => createEmployeeRecord(row))
}

let createTimeInEvent = function(dateStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    
    return this
}

let createTimeOutEvent = function(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    
    return this
}

// ??
// Is it strategic to use "dateStamp" as a common shared variable?
// ??


let hoursWorkedOnDate = function(dateStamp){
    let clockIn = this.timeInEvents.find(el => el.date === dateStamp).hour
    let clockOut = this.timeOutEvents.find(el => el.date === dateStamp).hour
    return (clockOut - clockIn)/100
    // console.log(this, dateStamp, this.timeInEvents.find(el => el.date === dateStamp))
}

let wagesEarnedOnDate = function(dateStamp){
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}




const findEmployeeByFirstName = function(collection, firstNameString){
     return collection.find(empRecord => empRecord.firstName === firstNameString)
}


const calculatePayroll = function(array){
    console.log(array)
    return array.map(empRecord => allWagesFor.call(empRecord)).reduce(function(sum, empWages){
        return sum + empWages
    })
}
    
