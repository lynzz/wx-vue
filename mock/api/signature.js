const signature = require('wx_jsapi_sign');

const APP_ID = 'wx09f7d37254dfa4d6'; // wx53f38d54c5ff7a88
const APP_SECRET = '69f7240ab7e64fd7a5653171366b1833';

module.exports = function(req, res, next) {
  var url = req.query.url;
  
  signature.getSignature({
    appId: APP_ID,
    appSecret: APP_SECRET,
    cache_json_file: __dirname + '/data',
    appToken: 'feilite'
  })(url, function(error, result) {
    if (error) {
      res.end(JSON.stringify({
          'error': error
      }));
    } else {
      res.end(JSON.stringify(result));
    }
  });
}
