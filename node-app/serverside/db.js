const MongoClient = require('mongodb').MongoClient;
const tokenizer = require('../serverside/tokenizer')
let mongoose = require('mongoose')
let userSchema = require('./schemas/user')
let employeeSchema = require('./schemas/employee')
// console.log(GenerateSchema.mongoose(employee))

let mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}

const collectionsName = ['users', 'actions', 'employees', 'appointments']

let dbprocess = function () {

}

function createAdmin() {
    tokenizer.passCrypt('test').then(userpass => {
        let admin =
            {
                userName: 'hakkisabah',
                userMail: 'hakkisabah@hotmail.com.tr',
                employeeId: tokenizer.getRandomID(),
                pass: userpass,
                userPostCode: 'cm27pj',
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'admin'
            }

        let saved = dbprocess.prototype.save('users', userSchema,admin)

        saved.then((res) => {
            if ((res.code && res.code == 11000)) {
                console.log({warning: 'admin registered anyway!'})
            } else {
                console.log('admin created')
                let createdEmployeeId = dbprocess.prototype.save('employees',employeeSchema,{employeeId: admin.employeeId,userMail:admin.userMail,isActive:true})
                createdEmployeeId.then(eId=>{
                    console.log(eId)
                })
            }
        }).catch((e) => {
            console.log(e)
        })
    })
}

// When init after run collection create trigger
dbprocess.prototype.init = async function () {
    await mongoose.connect(process.env.IS_DOCKER =='DOCKER'?process.env.MONGO_DOCKER_URL:process.env.MONGO_URL, {
        ...mongoOptions,
        useCreateIndex: true,
        useFindAndModify: false
    }, function (err, db) {
        if (err) throw err;
        console.log("Connected to " + process.env.IS_DOCKER =='DOCKER'?process.env.MONGO_DOCKER_URL:process.env.MONGO_URL);
        createAdmin()
    })
    await dbprocess.prototype.collectionInit()
}

dbprocess.prototype.collectionInit = async function () {
    await MongoClient.connect(process.env.IS_DOCKER =='DOCKER'?process.env.MONGO_DOCKER_URL:process.env.MONGO_URL, mongoOptions, async function (err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        for (const e of collectionsName) {
            await dbo.createCollection(e, function (err, res) {
                // error code number 48 say collection exists
                if (err.code && err.code != 48) throw err;
                if (err.code == 48) {
                    console.log(e + ' created anyway!')
                } else {
                    console.log(e + " created!");
                }
                db.close();
            });
        }
    });
}

dbprocess.prototype.save = function (name, schema, payload) {
    return new Promise(resolve => {
        if (!payload) return resolve(false)
        let model = new mongoose.model(name, schema)(payload)
        model.save((err, doc) => {
            if (err) {
                let errCode = err.code && err.code == 11000 ? err : false
                resolve(errCode)
            } else {
                resolve(doc)
            }
        })
    })
}

dbprocess.prototype.find = function (name, schema, payload) {
    return new Promise(function (resolve, reject) {
        if (!payload) return resolve(false)
        let model = new mongoose.model(name, schema)
        model.find(payload, (err, doc) => {
            if (err) {
                resolve(false)
            } else {
                if (doc.length < 1) {
                    return resolve(false)
                }
                resolve(doc);
            }
        })
    });
}
dbprocess.prototype.findOne = function (name, schema, payload) {
    return new Promise(function (resolve, reject) {
        if (!payload) return resolve(false)
        let model = new mongoose.model(name, schema)
        model.findOne(payload, (err, doc) => {
            if (err) {
                resolve(false)
            } else {
                resolve(doc);
            }
        })
    });
}
dbprocess.prototype.findOneAndUpdate = function (name, schema, query, payload) {
    return new Promise(function (resolve, reject) {
        if (!payload) return resolve(false)
        let model = new mongoose.model(name, schema)
        model.findOneAndUpdate(query, payload,{new: true}, (err, doc) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(doc);
            }
        })
    });
}
module.exports = new dbprocess();
