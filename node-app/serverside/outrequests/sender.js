let request = require('axios')

let sender = function () {

}

sender.prototype.get = function (url, param) {
    return request.get(url + param, {
        headers: {
            Accept: 'application/json',
        }
    })
        .then(result => {
            return {success: 'ok',result:result.data}
        }).catch(e => {
        return {error: 'get error', result: false}
    })
}

module.exports = new sender()