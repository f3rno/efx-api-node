const { post } = require('request-promise')

module.exports = async (efx, symbol, id, token, signature) => {

  let url = efx.config.api + '/r/orders/'

  if(symbol){
    url += 't' + symbol + '/hist'
  } else {
    url += 'hist'
  }

  const protocol = '0x'

  if (!token) {
    token = ((Date.now() / 1000) + 30) + ''

    signature = await efx.sign(token.toString(16))
  }

  const data = {token, protocol, signature, id}

  return post(url, {json: data})
}
