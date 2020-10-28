let Schema = require('mongoose').Schema

let employee = new Schema({
    employeeId: { type: 'String' },
    isActive: { type: 'Boolean', default:false },
    userMail: { type: 'String', unique:true },
    createdAt: { type: Date,default:new Date()},
})

module.exports = employee