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


const createEmployeeRecord = (array) =>{
    let info = {}
    info["firstName"] = array[0]
    info["familyName"] = array[1]
    info["title"] = array[2]
    info["payPerHour"] = array[3]
    info["timeInEvents"] = []
    info["timeOutEvents"] = []
    return info
}

const createEmployeeRecords = (array) => {
    return array.map (arr =>createEmployeeRecord(arr))
} 

function createTimeInEvent(date) {
    let obj = {
        type : "TimeIn",
        date : date.split(" ")[0],
        hour : parseInt(date.split(" ")[1])
    }
    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent(date) {
    let obj = {
        type : "TimeOut",
        date : date.split(" ")[0],
        hour : parseInt(date.split(" ")[1])
    }
    this.timeOutEvents.push(obj)
    return this
}

function hoursWorkedOnDate(date) {
    let start = this.timeInEvents.find(e => e.date === date)
    let end = this.timeOutEvents.find(e => e.date === date)
    return (end.hour - start.hour)/100 
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this,date) * this.payPerHour
}

function findEmployeeByFirstName(array, name) {
    return array.find(emp => emp.firstName === name)
 }
 
function calculatePayroll (array) {
    let total = 0
    array.forEach(emp => {
        total += allWagesFor.call(emp)
    })
    return total
}
 