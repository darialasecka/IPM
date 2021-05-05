onmessage = function (e) {
  var data = JSON.parse(e.data);
  console.log(data);

  for (var i = 0, len = data.length; i < len; i++) {
    var character = data[i];
    if (character == character.toLowerCase()) {
      // The character is lowercase
      output = output + character.toUpperCase();
    } else {
      // The character is uppercase
      output = output + character.toLowerCase();
    }
  }
  var output = '';
  console.log(output)
};