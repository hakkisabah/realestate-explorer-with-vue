let user = require('./userProcess')
const message = require('./messages');
const fakeAdminData = {
    userName: 'admin',
    pass: '123123123'
}

let postrequest = function (req, res) {

}

postrequest.prototype.analyze = (req, res) => {
    if (req.originalUrl.split('/')[2]) return res.json({error: message.errors.url.valid})
    let isPost = req.originalUrl.split('/')[1]
    if (isPost && postrequest.prototype.hasOwnProperty(isPost)) {
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
    if (!req.token){
        return res.json({error:'token not find',result:false})
    }
    let loginResult = user.userarea(req.token)
    loginResult.then(response=>{
        if (response.result.data){
            delete response.result.data.pass
        }
        console.log(response)
        return res.json(response)

    })

}
postrequest.prototype.authorization = async function (req, res, next) {
    let isPost = req.originalUrl.split('/')[1]
    if ((isPost !== 'login') && (isPost !== 'register')) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            // Forbidden
            return res.json({error: 'token error'});
        }
    } else {
        next();
    }

}
module.exports = new postrequest();
