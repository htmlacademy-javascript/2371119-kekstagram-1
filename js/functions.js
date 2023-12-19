function isPalindrome(string) {
  if (typeof string !== 'string') {
    return 'Не строка';
  }
  string = string.toLowerCase().replace(/\W/g, '');
  if (string.split('').reverse().join('') === string) {
    return true;
  } else {
    return false;
  }
}

function numberFromString(string) {
  if (typeof string !== 'string' && typeof string !== 'number') {
    return NaN;
  }
  if (typeof string === 'number') {
    string = string.toString();
  }
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      newString += string[i];
    }
  }
  return newString;
}

function minLength(initial, target, additional) {
  if (typeof initial !== 'string' || typeof additional !== 'string' || typeof target !== 'number') {
    return NaN;
  }
  while (initial.length < target) {
    if (additional + initial <= target) {
      initial = additional + initial;
    } else {
      initial = additional.slice(0, target - initial.length) + initial;
    }
  }
  return initial;
}

function isLessThanMax(string, maxLength) {
  return string.length <= maxLength;
}

isPalindrome();
numberFromString();
minLength();
isLessThanMax();
