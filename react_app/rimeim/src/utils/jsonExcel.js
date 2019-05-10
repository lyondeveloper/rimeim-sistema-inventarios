import isEmpty from "../actions/isEmpty";
const XLS = window.XLS;

export const getJsonFromExcel = (excelFile, callback) => {
  if (excelFile === null) {
    return callback([]);
  }

  var reader = new FileReader();
  let newJson = [];

  try {
    reader.onload = function(e) {
      try {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, { type: "binary" });
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
      } catch (e) {
        callback(newJson);
      }
    };
    reader.readAsBinaryString(excelFile);
  } catch (e) {
    callback([]);
  }
};

export const jsonToExcel = (jsonArray, headers, fileName) => {
  // format the data
  const itemsFormatted = [];

  jsonArray.forEach(item => {
    for (var key in item) {
      item[key] = removeCommas(item[key]);
      item[key] = removeWhiteLines(item[key]);
    }
    itemsFormatted.push(item);
  });
  exportCSVFile(headers, itemsFormatted, fileName);
};

function removeCommas(value) {
  return value.replace(/,/g, "");
}

function removeWhiteLines(value) {
  return value.replace(/(\r\n|\n|\r)/g, "");
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);
  var csv = convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + ".csv" || "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function convertToCSV(objArray) {
  var array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}
