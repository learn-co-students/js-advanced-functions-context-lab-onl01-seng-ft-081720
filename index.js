/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 function createEmployeeRecord(worker) {
    return {
        firstName: worker[0],
        familyName: worker[1],
        title: worker[2],
        payPerHour: worker[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(workers) {
    return workers.map(function(worker) {
        return createEmployeeRecord(worker);
    });
};

function createTimeInEvent(time) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    };

    this.timeInEvents.push(timeIn);
    return this;
};

function createTimeOutEvent(time) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    };

    this.timeOutEvents.push(timeOut);
    return this;
};

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === date
    });

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === date
    });

    return (timeOut.hour - timeIn.hour) / 100;
};

function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(worker => worker.firstName === firstName);
};

function calculatePayroll(records) {
    return records.reduce(function(acc, curr){
        return acc + allWagesFor.call(curr)
    }, 0)
};