onmessage = function (e) {
  console.log('Worker started');
  var contact = e.data;

  for(var key in contact){
    contact[key] = reverseText(contact[key]);
  }

  console.log('Worker finished');
  postMessage(contact);
};

function reverseText(text) {
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