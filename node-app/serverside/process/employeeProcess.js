const db = require('../db')
const tokenizer = require('../tokenizer')
const employeeSchema = require('../schemas/employee')
const mailer = require('../mail/transporter')


let employeeProcess = function () {

}

employeeProcess.prototype.generateId = async function (payload) {
    return new Promise(resolve => {
        let employee = {
            employeeId: tokenizer.getRandomID(),
            userMail: payload.userMail
        }
        let saved = db.save('employees', employeeSchema, employee)
        saved.then(async (res) => {
            if (res.code && res.code === 11000) {
                return resolve({error: 'its mail recorded anyway', result: false})
            } else {
                let mailResult = await mailer.send(payload.userMail, employee.employeeId)
                let successMsg = 'employee id created and sent to ' + payload.userMail
                if (mailResult.error) {
                    successMsg = 'employee id created but not sended to ' + payload.userMail
                }
                return resolve({success: successMsg, result: employee})
            }
        }).catch((e) => {
            console.log(e)
            return resolve({error: 'employee id create error', result: false})
        })
    })

}
employeeProcess.prototype.getEmployees = async function (token) {
    let findedEmployees = await db.find('employees', employeeSchema, {})
    let userInfo = await tokenizer.verify(token)
    if (findedEmployees) {
        userInfo = userInfo.result.data
        delete userInfo.pass
        userInfo.employees = findedEmployees
        return {success: 'ok', result:{data:userInfo}}
    } else {
        return {error: 'employees get error', result: false}
    }
}

module.exports = new employeeProcess()