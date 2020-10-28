const db = require('../db')
const tokenizer = require('../tokenizer')
const userSchema = require('../schemas/user')

let userProcess = function () {

}

async function verifier(payload) {
    try {
        let isVerified = await tokenizer.verify(payload)
        return isVerified
    } catch (e) {
        return e
    }
}

async function signer(payload) {
    try {
        let isVerified = await tokenizer.sign(payload)
        return isVerified
    } catch (e) {
        return e
    }
}

userProcess.prototype.login = function (payload) {
    return new Promise(async resolve => {
        if (!payload.userName) {
            return resolve(await verifier(payload.token))
        } else {
            let findedUser = db.findOne('users', userSchema, {userName: payload.userName})
            findedUser.then(res => {
                if (res) {
                    let crpyted = tokenizer.passDecrypt(payload.pass, res.pass)
                    crpyted.then(async cryptResult => {
                        if (cryptResult !== false) {
                            delete res.pass
                            let getToken = await signer(res)
                            if (getToken) {
                                return resolve(getToken)
                            } else {
                                return resolve({error: 'token error',result:false})
                            }
                        } else {
                            return resolve({error: 'pass error',result:false})
                        }
                    })
                } else {
                    return resolve({error: 'user error',result:false})
                }
            }).catch(e => {
                return resolve({error: 'login error',result:false})
            })
        }
    })

}
userProcess.prototype.register = async function (payload) {
    if (!payload.userName) {
        return await verifier(payload.token)
    } else {
        payload.pass = await tokenizer.passCrypt(payload.pass)
        payload.employeerId = tokenizer.getRandomID()
        let registerResult = await db.save('users', userSchema, payload)
        return registerResult;
    }
}

userProcess.prototype.userarea = async function (token) {
    let isAdmin = await verifier(token)
    return isAdmin
}

userProcess.prototype.updateuser = async function (token, payload) {
    // we need extra check for payload
    let updating = {}
    if (payload.pass) {
        let passPattern = /^[a-zA-Z0-9]*$/
        if (passPattern.test(payload.pass) === false) return {error: 'pass error', result: false}
        updating.pass = await tokenizer.passCrypt(payload.pass)
    }
    if (payload.userPostCode) {
        updating.userPostCode = payload.userPostCode
    }
    updating.updatedAt = new Date()
    let verifyToken = await verifier(token)
    let query = {userName: verifyToken.result.data.userName}
    let isUpdate = await db.findOneAndUpdate('users', userSchema, query, updating)
    if (isUpdate) {
        // we must manipulate response
        isUpdate = isUpdate.toObject()
        delete isUpdate.pass
        console.log(isUpdate)
        let token = await signer(isUpdate)
        return {success: 'ok', result: {updatedToken: token, isUpdate}}
    } else {
        return {error: 'update error', result: false}
    }
}

module.exports = new userProcess()
