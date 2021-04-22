/**
 * @description 时间格式化
 * @param @{Number} time
 * @param @{String} fmt = [YYYYMMDDhhmmss] 可选值
 */
export function formatDate(time, fmt) {
  const now = new Date();
  let date = new Date(time);
  if (date === 'Invalid Date') {
    date = now;
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  // eslint-disable-next-line no-param-reassign
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
  return fmt;
}

export function momentsDate(publishTime, options = {}) {
  const timeNow = Math.floor(new Date().getTime() / 1000); // 1000
  const date = new Date(publishTime); // 1000
  const Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let H = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  // 小于10的在前面补0
  if (M < 10) {
    M = `0${M}`;
  }
  if (D < 10) {
    D = `0${D}`;
  }
  if (H < 10) {
    H = `0${H}`;
  }
  if (m < 10) {
    m = `0${m}`;
  }
  if (s < 10) {
    s = `0${s}`;
  }

  const d = timeNow - Math.floor(publishTime / 1000);
  const dDays = Math.floor(d / 86400);
  const dHours = Math.floor(d / 3600);
  const dMinutes = Math.floor(d / 60);
  const dSeconds = Math.floor(d);
  if (options.day) {
    return `${D} ${H}:${m}`;
  }

  if (dDays > 0 && dDays < 3) {
    return `${dDays}天前`;
  }
  if (dDays <= 0 && dHours > 0) {
    return `${dHours}小时前`;
  }
  if (dHours <= 0 && dMinutes > 0) {
    return `${dMinutes}分钟前`;
  }
  if (dSeconds < 60) {
    if (dSeconds <= 0) {
      return '刚刚发表';
    }
    return `${dSeconds}秒前`;
  }
  if (dDays >= 3 && dDays < 30) {
    return `${M}-${D} ${H}:${m}`;
  }
  if (dDays >= 30) {
    return `${Y}-${M}-${D} ${H}:${m}`;
  }
  return `${Y}-${M}-${D} ${H}:${m}`;
}

/**
 *
 *
 * @export
 * @param {*} startTime 开始时间 时间戳
 * @param {*} endTime 结束时间 时间戳
 * @param {*} cur 当前时间 时间戳
 */
export function checkStatus(startTime, endTime, cur) {
  const now = cur || new Date().getTime();
  let status = 0; // 0 未开始 1 正在 2 结束
  let remainTime = '';
  if (!startTime || !endTime) {
    // 如果两个有一个是没值的 全都是正在进行
    remainTime = endTime - now;
    status = 1; // 正在进行
  } else if (now < startTime) {
    remainTime = startTime - now;
    status = 0; // 还未开始
  } else if (now > startTime && now < endTime) {
    remainTime = endTime - now;
    status = 1; // 正在进行
  } else if (now > endTime) {
    remainTime = now - endTime;
    status = 2; // 已结束
  }

  return {
    status,
    remainTime,
  };
}
