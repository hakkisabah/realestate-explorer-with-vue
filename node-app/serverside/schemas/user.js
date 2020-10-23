let Schema = require('mongoose').Schema

let users = new Schema({
    userName: { type: String, unique: true },
    userMail: { type: String, unique: true },
    employeerId: { type: String, unique: true },
    pass: { type: String },
    userPostCode: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    role: { type: String }
})

module.exports = users