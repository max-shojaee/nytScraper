var makeDate = function() {
  var d = new Date();

  var formattedDate = "";

  formattedDate += (d.getSeconds()) + "_";

  formattedDate += (d.getMinutes()) + "_";

  formattedDate += (d.getMonth() + 1) + "_";
  
  formattedDate += d.getDate() + "_";
  
  formattedDate += d.getFullYear();
 
  return formattedDate;
};

module.exports = makeDate;
