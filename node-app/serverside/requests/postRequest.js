let tokenizer = require('../tokenizer')
let user = require('../process/userProcess')
let employeeProcess = require('../process/employeeProcess')
let postCodeProcess = require('../process/postCodeProcess')
const message = require('../messages');

let postrequest = function (req, res) {

}

postrequest.prototype.analyze = (req, res) => {
    if (req.originalUrl.split('/')[2]) return res.json({error: message.errors.url.valid})
    let isPost = req.originalUrl.split('/')[1]
    if (isPost && postrequest.prototype.hasOwnProperty(isPost) && isPost !== 'authorization') {
        return postrequest.prototype[isPost](req, res)
    } else {
        return res.end()
    }
}
postrequest.prototype.login = async function (req, res) {
    let loginResult = user.login(req.body)
    loginResult.then(result=>{
        return res.json(result)
    })

}
postrequest.prototype.userarea = async function (req, res) {
    let loginResult = user.userarea(req.token)
    loginResult.then(response=>{
        if (response.result.data){
            delete response.result.data.pass
        }
        return res.json(response)
    })
}

postrequest.prototype.postcode = async function (req,res){
    if (req.body.userPostCode){
        let result = await postCodeProcess.lookup(req.body.userPostCode)
        return res.json(result)
    }else{
        return res.json({error:'parameters error',result:false})
    }

}

postrequest.prototype.updateuser = async function(req,res){
    let isUpdated = await user.updateuser(req.token,req.body)
    return res.json(isUpdated)
}

postrequest.prototype.employeeprocess = async function(req,res){
    let employees = await employeeProcess.getEmployees(req.token)
    return res.json(employees)
}
postrequest.prototype.checkemployee = function (req,res){
    return res.json({success:'OK'})
}
postrequest.prototype.createemployeeid = async function(req,res){
    if (req.body.userMail){
        let createdEmployeeId = await employeeProcess.generateId(req.body)
        console.log(createdEmployeeId)
        return res.json(createdEmployeeId);
    }else{
        return res.json({error:'Params not allowed',result:false})
    }

}

postrequest.prototype.authorization = async function (req, res, next) {
    let isPost = req.originalUrl.split('/')[1]
    if ((isPost !== 'login') && (isPost !== 'register') && (isPost !== 'checkemployee')) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            if (!bearerToken) return res.json({error: 'token error',result:false,token:false});
            let isCorrectToken = await tokenizer.verify(bearerToken)
            if (isCorrectToken.result === false) return res.json({error: 'token error',result:false,token:false});
            req.token = bearerToken;
            next();
        } else {
            // Forbidden
            return res.json({error: 'token error',result:false,token:false});
        }
    } else {
        next();
    }

}
module.exports = new postrequest();
