import isEmpty from '../actions/isEmpty';
const XLS = window.XLS;

const getJsonFromExcel = (excelFile, callback) => {
  if (excelFile === null) {
    return callback({});
  }

  var reader = new FileReader();
  let newJson = [];
  reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLS.CFB.read(data, { type: 'binary' });
    var wb = XLS.parse_xlscfb(cfb);
    wb.SheetNames.forEach(function(sheetName) {
      var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
      oJS.forEach(json_row => {
        if (!isEmpty(json_row)) {
          newJson.push(json_row);
        }
      });
    });
    callback(newJson);
  };
  reader.readAsBinaryString(excelFile);
};

export default getJsonFromExcel;
