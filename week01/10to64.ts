/**
 * 获取数字整数和小数部分
 * @param num
 * @returns
 */
function numberSplit(num: string): [string, string];
function numberSplit(num: number): [number, number];
function numberSplit(num: string | number): any {
  const numArr = String(num).split(".");
  const int = numArr[0];
  const decimal = numArr.length > 1 ? "0." + numArr[1] : "0";

  if (typeof num === "number") {
    return [Number(int), Number(decimal)];
  }

  return [int, decimal];
}

function getCharCode(num: number) {
  return num >= 10 ? String.fromCharCode(65 + num - 10) : num;
}

/**
 * 10进制转64进制，小数位取10位
 */
function decode64(source: number) {
  const [int, decimal] = numberSplit(source);

  const intArr = [];
  let quotient = int;

  while (quotient >= 64) {
    intArr.push(quotient % 64);
    quotient = Math.floor(quotient / 64);
  }
  intArr.push(quotient);

  const decimalArr = [];
  let remain = decimal;
  while (remain && decimalArr.length < 10) {
    const num = remain * 64;
    if (num >= 1) {
      decimalArr.push(Math.floor(num));
      [, remain] = numberSplit(num);
    } else {
      decimalArr.push(0);
      remain = num;
    }
  }

  let result = intArr
    .reverse()
    .map((num) => getCharCode(num))
    .join("")
    .replace(/0+$/, "");

  if (decimalArr.length) {
    result += ".";
    result += decimalArr.map((num) => getCharCode(num)).join("");
  }

  return result;
}

function getCharNum(num: string) {
  if (/[0-9]/.test(num)) {
    return Number(num);
  }

  return num.charCodeAt(0) - 65 + 10;
}

/**
 * 64进制转10进制
 */
function encode64(source: string) {
  const [int, decimal] = numberSplit(source);

  let sum = 0;

  int
    .split("")
    .reverse()
    .forEach((item, i) => {
      sum += getCharNum(item) * Math.pow(64, i);
    });

  if (decimal) {
    const decimalArr = decimal.split("");
    decimalArr.splice(0, 2);
    decimalArr.forEach((item, i) => {
      sum += getCharNum(item) * Math.pow(64, (i + 1) * -1);
    });
  }

  return sum;
}
