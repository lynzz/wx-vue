module.exports = function(req, res, next) {
  var pageSize = req.query.pageSize || 5;
  var pageNo = req.query.pageNo || 1;
  var listData = [];
  for(var i = 0; i < 5; i++) {
    var id = (pageNo - 1) * pageSize + i + 1;
    listData.push({
      id: id,
      name: 'Chuck Norris ' + id,
      power: 1000 + id
    });
  }
  var data = {
    data: {
      pageNo: pageNo,
      totalCount: 10,
      listData: listData
    }
  };
  data = JSON.stringify(data);
  res.end(data);
}
