/* eslint-disable func-names */
export function setHrefQuery(obj: any) {
  let returnValue = '';
  Object.keys(obj).forEach((key: string) => {
    const value = obj[key];
    returnValue += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  });
  return returnValue.slice(0, returnValue.length - 1);
}

export function getHrefQuery(url: string) {
  if (!url) return {};
  let after = url.split('?');
  if (!after[1]) return {};
  after = after[1].split('&');
  const obj: any = {};
  for (let i = 0; i < after.length; i += 1) {
    const pair = after[i].split('=');
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return obj;
}

export function getOrigin() {
  const { location } = window;
  if (!location.origin) {
    return `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
  }
  return location.origin;
}
export function loadScript(src: string, cb?: Function) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const script: any = document.createElement('script');

  script.type = 'text/javascript';
  script.charset = 'utf8';
  script.async = true;
  script.src = src;

  if (!('onload' in script)) {
    // eslint-disable-ts
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
      this.onreadystatechange = null;
      if (cb) {
        cb(null, script); // there is no way to catch loading errors in IE8
      }
    };
  }
  script.onload = function () {
    this.onerror = null;
    this.onload = null;
    if (cb) {
      cb(null, script); // there is no way to catch loading errors in IE8
    }
  };
  script.onerror = function () {
    // because even IE9 works not like others
    this.onerror = null;
    this.onload = null;
    const msg = `Failed to load ${this.src}`;
    if (cb) {
      cb(new Error(msg), script); // there is no way to catch loading errors in IE8
    }
  };

  head.appendChild(script);
}
