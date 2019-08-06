function getResponseMetaData(statusCode, statusDesc) {
  var jsonResponse = {};
  jsonResponse.statusCode = statusCode;
  jsonResponse.statusDesc = statusDesc;
  return JSON.parse(JSON.stringify(jsonResponse, null, 2));
}

module.exports = {
  getResponseMetaData: getResponseMetaData
};
