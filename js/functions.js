function isPalindrome(string) {
  string = (string || '').toLowerCase().replace(/\W/g, '');
  const stringArray = [...string];
  const newArray = [];
  stringArray.forEach((index) => {
    newArray.unshift(index);
  });
  const reversedString = newArray.join('');
  return string === reversedString;
}

function numberFromString(string) {
  string = (string || '');
  const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const stringArray = [...string];
  const newArray = [];
  stringArray.forEach((element) => {
    if (numbersArray.includes(element)) {
      newArray.push(element);
    }
  });
  return parseInt(newArray.join(''), 10);
}

function minLength(initial, target, additional) {
  initial = (initial || '');
  additional = (additional || '');
  if (initial.length >= target) {
    return initial;
  }
  let current = initial;
  if (additional.length > target) {
    current = additional.slice(0, target - current.length) + current;
    return current;
  }
  while (target > current.length) {
    if (target - current.length >= additional.length) {
      current = additional + current;
    } else {
      current = additional[0] + current;
    }
  }
  return current;
}

function stringLength(string, maxLength) {
  string = (string || '');
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

isPalindrome();
numberFromString();
minLength();
stringLength();
