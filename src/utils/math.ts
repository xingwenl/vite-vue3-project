/**
 * 关于数字的处理方法
 */

/**
 * @description  小数点的位数
 * @param {Object} str
 */
export function pointNum(str = '') {
  if (String(str).indexOf('.') > -1) {
    return String(str).split('.')[1].length;
  }
  return 0;
}

export function toNumber(num: any) {
  const n = Number(num);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * @description 判断obj 是否为一个整数
 * @param {*} obj
 * @returns
 * @memberof floatObj
 */
function isInteger(num: number) {
  return Math.floor(num) === num;
}

/**
 * @description 将一个浮点数转成整数，返回整数和倍数。如 1.23 >> 123，倍数是 100
 *
 * @param {*} num
 */
function toInteger(floatNum: number) {
  const ret = {
    num: 0,
    times: 1,
  };

  if (isInteger(floatNum)) {
    ret.num = floatNum;
    return ret;
  }

  const strfi = `${floatNum}`;
  const dotPos = strfi.indexOf('.');
  const len = strfi.substr(dotPos + 1).length;
  const times = 10 ** len;
  const intNum = Math.floor(floatNum * times + 0.5);
  ret.times = times;
  ret.num = intNum;

  return ret;
}
function operation(a: number, b: number, op: string): number {
  const o1 = toInteger(a);
  const o2 = toInteger(b);
  const n1 = o1.num;
  const n2 = o2.num;
  const t1 = o1.times;
  const t2 = o2.times;
  const max = t1 > t2 ? t1 : t2;
  let result = null;
  switch (op) {
    case 'add':
      if (t1 === t2) {
        result = n1 + n2;
      } else if (t1 > t2) {
        result = n1 + n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) + n2;
      }
      return result / max;
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2;
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) - n2;
      }
      return result / max;
    case 'multiply':
      result = (n1 * n2) / (t1 * t2);
      return result;
    case 'divide':
      result = (n1 * t2) / (n2 * t1);
      return result;
    default:
      return 0;
  }
}

function add(a: number, b: number) {
  return operation(a, b, 'add');
}
function sub(a: number, b: number) {
  return operation(a, b, 'subtract');
}
function mul(a: number, b: number) {
  return operation(a, b, 'multiply');
}
function div(a: number, b: number) {
  return operation(a, b, 'divide');
}
export default {
  add,
  sub,
  mul,
  div,
};
// Number.prototype.add = function (arg) {
//   return add(this, arg);
// };
// Number.prototype.sub = function (arg) {
//   return sub(this, arg);
// };
// Number.prototype.mul = function (arg) {
//   return mul(this, arg);
// };
// Number.prototype.div = function (arg) {
//   return div(this, arg);
// };
