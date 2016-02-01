var Mock = require('mockjs');
module.exports = function(req, res, next) {
  var data = {
    success: true,
    data: {
      id: req.query.id,
      avatar: '/assets/img/heisencat.png',
      description: '@cparagraph',
      name: '@cname',
      crowd: '@csentence',
      images: [{
        url: '/assets/img/xw0129mjl.jpg',
        title: 'swipe1'
      }, {
        url: '/assets/img/xw0131bd.jpg',
        title: 'swipe2'
      }, {
        url: '/assets/img/xw0131jy.jpg',
        title: 'swipe3'
      }],
      effect: '@cparagraph(4,7)'
    }
  };
  data = JSON.stringify(Mock.mock(data));
  res.end(data);
}
