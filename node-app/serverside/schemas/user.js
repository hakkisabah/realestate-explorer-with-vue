let Schema = require('mongoose').Schema

let user = new Schema({
    userName: { type: String, unique: true },
    userMail: { type: String, unique: true },
    employeeId: { type: String, unique: true },
    pass: { type: String },
    userPostCode: { type: String },
    createdAt: { type: Date,default:new Date()},
    updatedAt: { type: Date,default:new Date() },
    role: { type: String }
})

module.exports = user