onmessage = function (e) {
  var contact = e.data;
  console.log("in: ", contact);

  for(var key in cuontact){
    contact[key] = reverseText(contacy[key]);
  }

  var output = '';
  console.log("out: ", output);
};

function reverseText(text){
  for (var i = 0, i < text.length; i++) {
    var character = text[i];
    if (character == character.toLowerCase()) { // The character is lowercase
      output += character.toUpperCase();
    } else { // The character is uppercase
      output += character.toLowerCase();
    }
  }
  return output
}