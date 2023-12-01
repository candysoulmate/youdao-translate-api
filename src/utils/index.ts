import CryptoJS from "crypto-js";

const truncate = (q: string) => {
  let len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
};

/**
 * 获取签名、当前时间、salt
 */
export const getSigns = (input: string, appId: string, appSecret: string) => {
  let salt = new Date().getTime();
  let curtime = Math.round(new Date().getTime() / 1000);

  let str1 = appId + truncate(input) + salt + curtime + appSecret;

  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

  return {
    sign,
    salt,
    curtime,
  };
};
