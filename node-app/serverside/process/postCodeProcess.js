let sender = require('../outrequests/sender')

let postCodeRequest = function () {

}

postCodeRequest.prototype.lookup = async function (payload) {
    let findedLookup = await sender.get(process.env.POST_CODE_API_URL + '/postcodes/', payload)
    return findedLookup


}

module.exports = new postCodeRequest()