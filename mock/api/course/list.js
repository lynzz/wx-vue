var Mock = require('mockjs');

module.exports = function(req, res, next) {
  req.setEncoding('utf8');
  var pageSize = req.query.pageSize || 5;
  var pageNo = req.query.pageNo || 1;
  var listData = [];
  for(var i = 0; i < pageSize; i++) {
    var id = (pageNo - 1) * pageSize + i + 1;
    listData.push({
      'id|+1': id,
      url: '#!/user/' + id,
      username: 'Chuck Norris ' + id
    });
  }
  var data = {
    success: true,
    data: {
      pageNo: pageNo,
      totalCount: 20,
      'listData|5': [{
        'id': '@id',
        'title': '@title(2)',
        'tags': '@cword(2),@cword(2),@cword(2)',
        'timeRange': '10:00-11:00',
        'price': '55',
        'status|1-3': 1,
        'coachAvatar': '/assets/img/heisencat.png',
        'coachId': '@id()',
        'description': '@csentence(5)'
      }]
    }
  };
  data = JSON.stringify(Mock.mock(data));
  console.log(data);
  res.end(data);
}
