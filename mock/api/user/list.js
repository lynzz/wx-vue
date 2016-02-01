module.exports = function(req, res, next) {
  var pageSize = req.query.pageSize || 5;
  var pageNo = req.query.pageNo || 1;
  var listData = [];
  for(var i = 0; i < pageSize; i++) {
    var id = (pageNo - 1) * pageSize + i + 1;
    listData.push({
      id: id,
      url: '#!/user/' + id,
      username: 'Chuck Norris ' + id
    });
  }
  var data = {
    success: true,
    data: {
      pageNo: pageNo,
      totalCount: 20,
      listData: listData
    }
  };
  data = JSON.stringify(data);
  res.end(data);
}
