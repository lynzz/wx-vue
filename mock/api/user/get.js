module.exports = function(req, res, next) {
  var data = {
    success: true,
    data: {
      id: req.query.id,
      url: '#!/user/' + id,
      name: 'Chuck Norris ' + id 
    }
  };
  data = JSON.stringify(data);
  res.end(data);
}
