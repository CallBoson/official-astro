// fetch签名
import qs from "qs";
import { md5 } from "js-md5";

// 获取URL参数并生成签名
export const getRequestAndSign = (urlStr) => {
  const [url, queryStr] = urlStr.split("?");
  const params = {};
  if (queryStr) {
    const pairs = queryStr.split("&");
    for (let pair of pairs) {
      const [key, value] = pair.split("=");
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  params.t = parseInt(Date.now() / 1000); // 添加时间戳
  const keys = Object.keys(params)
    .filter((k) => k !== "sign")
    .sort();
  const pairs = keys.map((k) => `${k}=${params[k]}`);
  pairs.push("appkey=yZXBV5LVtNU3BrTxB1VQqFqn4KLjSux"); // 添加appkey
  const signStr = pairs.join("&");
  const sign = md5(signStr).toUpperCase(); // 生成签名
  params.sign = sign; // 添加签名到参数

  return { url, query: params };
};

// 生成带签名的GET请求URL
export const generateGetUrl = (url) => {
  const { url: baseURL, query } = getRequestAndSign(url);
  return `${baseURL}?${qs.stringify(query)}`; // 使用qs库转换参数为URL字符串
};
