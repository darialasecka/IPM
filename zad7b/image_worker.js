onmessage = function(e) {
    console.log('Worker started working');
    var contact = e.data;
    var form_sum = 0;
    var form_string = '';

    for (var key in contact) {
        form_string += getStringWithoutSpecialCharacters(contact[key]);
        form_sum += addLetters(contact[key]);
    }

    console.log(gigaString);
    postMessage({
        'r': form_sum % 255,
        'g': 255 - (form_sum % 255),
        'b': ((0.5 * (form_sum % 255)) > 125) ? 99 : 199
    });

    console.log('Worker finished working');
}

function getStringWithoutSpecialCharacters(str) {
    new_str = '';
    for (i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) // only ASCII letters
            new_str += str[i];
    }
    return new_str;
}

function addLetters(str) {
  var sum = 0;
  var i = 0;
  while (i++ < str.length) {
    var c = str.charCodeAt(i);
    if (c >= 97 && c <= 122) // lowercase
      sum += c - 96;
    else if (c >= 65 && c <= 90) // uppercase
      sum += c - 64 + 30;
  }
  return sum;
}