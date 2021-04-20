// import { message } from 'antd';
export function requestSuccessFunc(requestObj: any) {
  // 拦截发送成功请求
  // console.log('/*********************/ start')
  // console.log(requestObj.url, requestObj.method === 'get' ? requestObj.params : requestObj.data)
  // console.log('/*********************/ end')
  return requestObj;
}

export function requestFailFunc(requestError: any) {
  console.error('拦截发送失败： 断网', requestError);
  //   Toast.fail('发送失败： 可能断网')
  return Promise.reject(requestError);
}

export function responseSuccessFunc(responseObj: any) {
  console.log('/*********************/ start');
  console.log(
    responseObj.config.url,
    responseObj.config.method === 'get' ? responseObj.config.params : responseObj.config.data,
  );
  console.log(responseObj.data);
  console.log('/*********************/ end');
  if (responseObj.data.HasError) {
    // message.error(`出错啦: ${responseObj.data.Message}`);
    return Promise.reject(responseObj);
  }
  return Promise.resolve(responseObj);
}
export function responseFailFunc(responseError: any) {
  console.log('响应失败', responseError);
  // Toast.fail('响应失败')
  let data = { code: 500, msg: '响应失败' };
  try {
    const { response } = responseError;
    if (response) {
      switch (response.status) {
        case 500:
          data = {
            code: 500,
            msg: '加载中',
          };
          break;
        default:
          data = {
            code: 9999,
            msg: `未知错误${response.status}`,
          };
          break;
      }
    }
  } catch (error) {
    data = {
      code: 9999,
      msg: '前端未知错误',
    };
  }
  //   Toast.success('加载中')
  return Promise.reject(new Error(data.msg));
  // return Promise.reject(responseError);
}
