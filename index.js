let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(arr){
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(arr){
    return arr.map(x => createEmployeeRecord(x))
}

function createTimeInEvent(str){
    let dateArr = str.split(" ") 
    let newEvent = {
        type: "TimeIn",
        hour: parseInt(dateArr[1], 10),
        date: dateArr[0]
    }
    this.timeInEvents.push(newEvent)
    return this
}

function createTimeOutEvent(str){
    let arr = str.split(" ")
    let event = {
        type: "TimeOut",
        hour: parseInt(arr[1], 10),
        date: arr[0]
    }
    this.timeOutEvents.push(event)
    return this
}

function hoursWorkedOnDate(str){
    let ins = this.timeInEvents.find(x => x.date === str)
    let out = this.timeOutEvents.find(x => x.date === str)
    return (out.hour/100) - (ins.hour/100)
}

function wagesEarnedOnDate(str){
    return this.payPerHour * hoursWorkedOnDate.call(this, str)
}

function calculatePayroll(arr){
    return arr.map(x => allWagesFor.call(x)).reduce((x,y) => x += y)
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(x => x.firstName === firstNameString)
}