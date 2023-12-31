const ERROR_1 =
  '<div class="alert alert-danger" role="alert">Incomplete matrix data!</div>';
const ERROR_2 =
  '<div class="alert alert-danger" role="alert">Invalid matrix size!</div>';
const ERROR_3 =
  '<div class="alert alert-danger" role="alert">These matrices cannot be multiplied!</div>';
const ERROR_4 =
  '<div class="alert alert-danger" role="alert">Invalid constant entered!</div>';

function onCalculateClick(opt) {
  let A = getInputMatrix(1);
  let B = getInputMatrix(2);

  let output = document.getElementById("output");
  let inputError1 = document.getElementById("inputError1");
  inputError1.innerHTML = "";
  let inputError2 = document.getElementById("inputError2");
  inputError2.innerHTML = "";
  let inputError3 = document.getElementById("inputError3");
  inputError3.innerHTML = "";

  if (A == ERROR_1) {
    inputError1.innerHTML = ERROR_1;
    return;
  }
  if (B == ERROR_2) {
    inputError2.innerHTML = ERROR_1;
    return;
  }

  let outputText = "";
  switch (opt) {
    case "Multiplication":
      if (A == ERROR_1) {
        inputError1.innerHTML = ERROR_1;
        return;
      }
      if (B == ERROR_1) {
        inputError2.innerHTML = ERROR_1;
        return;
      }
      if (!canMultiply(A, B)) {
        inputError3.innerHTML = ERROR_3;
        return;
      }
      let product = multiply(A, B);
      outputText = stringFormat(product);
      break;

    case "Add":
      if (A == ERROR_1) {
        inputError1.innerHTML = ERROR_1;
        return;
      }
      if (B == ERROR_1) {
        inputError2.innerHTML = ERROR_1;
        return;
      }
      if (!sameSize(A, B)) {
        inputError3.innerHTML = ERROR_2;
        return;
      }
      let sum = add(A, B);
      outputText = stringFormat(sum);
      break;

    case "Subtract":
      if (A == ERROR_1) {
        inputError1.innerHTML = ERROR_1;
        return;
      }
      if (B == ERROR_1) {
        inputError2.innerHTML = ERROR_1;
        return;
      }
      if (!sameSize(A, B)) {
        inputError3.innerHTML = ERROR_2;
        return;
      }
      let diff = subtract(A, B);
      outputText = stringFormat(diff);
      break;
    default:
      outputText = "Invalid option";
  }
  output.innerHTML = outputText;
}

function getInputMatrix(tableNum) {
  let matrix = [];

  let tb = document.getElementById("tableBody" + tableNum);
  let children = tb.childNodes;
  for (let i = 0; i < children.length; i++) {
    matrix.push([]);
    let tRow = children[i];
    let inputs = tRow.childNodes;
    for (let j = 0; j < inputs.length; j++) {
      let input = inputs[j].firstChild;
      let strNum = input.value;
      if (strNum.includes("/")) {
        let splitFunc = strNum.split("/");
        var numFract = parseFloat(splitFunc[0] / splitFunc[1]);
        if (Number.isNaN(numFract)) {
          return ERROR_1;
        }
        console.log(numFract);
        matrix[i].push(numFract);
      } else {
        let number = parseInt(input.value);
        if (Number.isNaN(number)) {
          return ERROR_1;
        }
        matrix[i].push(number);
      }
    }
  }

  return matrix;
}

function getInputK(numInputK) {
  let kInput = document.getElementById("inputK" + numInputK);
  let k = kInput.value;
  if (k.includes("/")) {
    let splitK = k.split("/");
    let kFract = parseFloat(splitK[0] / splitK[1]);
    if (Number.isNaN(kFract)) {
      return ERROR_4;
    } else {
      return kFract;
    }
  } else {
    let kInt = parseInt(k);
    if (Number.isNaN(kInt)) {
      return ERROR_4;
    } else {
      return kInt;
    }
  }
}

function stringFormat(matrix) {
  let string = '<table class="outputMatrix"><tbody>';

  for (let row = 0; row < matrix.length; row++) {
    let rowE = "<tr>";
    for (let column = 0; column < matrix[row].length; column++) {
      let columnE = "<td>";
      let temp = parseFloat(matrix[row][column]);
      console.log(temp);

      if (temp % 1 == 0) {
        temp = parseInt(temp);
      } else {
        var f = new Fraction(temp);
        temp = f.s * f.n + " / " + f.d;
      }

      let entry = "\t" + temp.toString();
      if (column == matrix[row].length - 1) {
        entry += "\t";
      }
      columnE = columnE.concat(entry, "</td>");
      rowE = rowE.concat(columnE);
    }
    rowE = rowE.concat("</tr>");
    string = string.concat(rowE);
  }

  string = string.concat("</table></tbody>");

  return string;
}

function fractNumb(numb) {
  let num = numb;
  let f = new Fraction(num);

  if (f.d === 1) {
    num = f.s * f.n;
  } else {
    num = f.s * f.n + " / " + f.d;
  }
  return num;
}
