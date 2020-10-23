const db = require('./db')
const tokenizer = require('./tokenizer')
const userSchema = require('./schemas/user')

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
            let findedUser = db.findOne('users', userSchema, {userName:payload.userName})
            findedUser.then(res => {
                if (res){
                    let crpyted = tokenizer.passDecrypt(payload.pass, res.pass)
                    crpyted.then(async cryptResult => {
                        if (cryptResult !== false) {
                            delete res.pass
                            let getToken = await signer(res)
                            if (getToken){
                                return resolve(getToken)
                            }else{
                                return resolve(false)
                            }
                        } else {
                            return resolve(false)
                        }
                    })
                }else{
                    return resolve(false)
                }
            }).catch(e => {
                return resolve({error: 'registiration error'})
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

module.exports = new userProcess()
