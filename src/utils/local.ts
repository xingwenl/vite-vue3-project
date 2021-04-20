interface ILocalData {
  expires: number;
  data: any;
}
interface stringObj {
  [key: string]: any;
}

// 是否到期
function isExpires(expires: number) {
  if (expires === 0) return false;
  return expires < new Date().getTime();
}

function jsonParse(jsonStr: string): any {
  try {
    const val = JSON.parse(jsonStr);
    return val;
  } catch (error) {
    return jsonStr;
  }
}

class Local {
  cacheLevel = 0;

  key: string = '';

  constructor(key?: string) {
    this.key = key || 'LOCAL_';
  }

  getKey(key: string) {
    return this.key + key;
  }

  getAll(): stringObj {
    const storage: stringObj = {};
    Object.keys(localStorage).forEach(key => {
      storage[key] = this.get(key);
    });
    return storage;
  }

  get(key: string): any | null {
    let valString = localStorage.getItem(this.getKey(key));
    if (valString) {
      const val: ILocalData = jsonParse(valString);
      // 如果本来就是字符串 直接返回
      if (typeof val === 'string') return valString;
      if (isExpires(val.expires)) {
        this.remove(key);
        return null;
      }
      valString = val.data;
      return valString;
    }
    return localStorage.getItem(key);
  }

  set(key: string, val: string, cachetime?: number) {
    const now = new Date().getTime();
    const expires = cachetime ? new Date(now + cachetime * 1000).getTime() : 0;
    try {
      localStorage.setItem(
        this.getKey(key),
        JSON.stringify({
          data: val,
          expires,
        }),
      );
    } catch (error) {
      if (this.cacheLevel === 1) {
        this.removeNotExpires();
      } else {
        this.removeExpires();
      }
      this.set(key, val, cachetime);
      console.error('存储失败');
    }
    return this;
  }

  remove(key: string) {
    localStorage.removeItem(this.getKey(key));
    return this;
  }

  /**
   * @description 清除时间过期的数据
   * @memberof Local
   */
  removeExpires() {
    this.getAll();
    this.cacheLevel = 1;
    return this;
  }

  /**
   * @description 清除时间过期的数据 和 即将过期的数据 10条
   * @memberof Local
   */
  removeNotExpires() {
    const storage = localStorage;
    let keys = Object.keys(storage);
    keys = keys.filter(a => a.indexOf(this.key) !== -1 || typeof this.get(a) !== 'string');
    keys = keys.sort((k1, k2) => localStorage[k1].expires - localStorage[k2].expires);
    const s = Math.floor(keys.length / 3);
    const removeKeys = keys.splice(0, s);
    removeKeys.forEach(key => {
      this.remove(key);
    });
    return this;
  }
}
export default new Local();
