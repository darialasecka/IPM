onmessage = function (e) {
  console.log('Worker started working');
  var contact = e.data;

  for(var key in contact){
    contact[key] = reverseText(contact[key]);
  }

  console.log('Worker finished working');
  postMessage(contact);
};

function reverseText(text) {
  var output = '';
  for (var i = 0; i < text.length; i++) {
    var character = text[i];
    if (character == character.toLowerCase()) { // The character is lowercase
      output += character.toUpperCase();
    } else { // The character is uppercase
      output += character.toLowerCase();
    }
  }
  return output;
}