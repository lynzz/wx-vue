const wx = require('wx');
const jsSHA = require('jssha');

const APP_ID = 'wx09f7d37254dfa4d6';

const createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

const createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

const raw = function (args) {
  let keys = Object.keys(args);
  keys = keys.sort()
  let newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  let string = '';
  for (let k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

let timestamp = createTimestamp();
let nonceStr = createNonceStr();

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
const sign = function (jsapi_ticket, url) {
  let ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url
  };

  let shaObj = new jsSHA(raw(ret), 'TEXT');

  ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret;
};

function wxConfig(ticket) {
  wx.config({
    appId: APP_ID, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: sign(ticket, location.href.split('#')[0]),// 必填，签名，见附录1
    jsApiList: [
      'chooseImage',
      'uploadImage',
      'downloadImage',
      'openLocation',
      'getLocation',
      'chooseWXPay',
      'addCard',
      'chooseCard',
      'openCard',
      'closeWindow'
    ] 
  });
}

export default {
  init(Vue) {
    Vue.http.get('/api/signature', {url: location.href.split('#')[0]}).then(res => {
      let data = res.data;

      wx.config({
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: [
          'chooseImage',
          'uploadImage',
          'downloadImage',
          'openLocation',
          'getLocation',
          'chooseWXPay',
          'addCard',
          'chooseCard',
          'openCard',
          'closeWindow'
        ] 
      });
    });
  }
}

