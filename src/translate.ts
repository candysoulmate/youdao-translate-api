import fetch from "node-fetch";
import CryptoJS from "crypto-js";
import { truncate } from "./utils/index.js";
import qs from "qs";
import { Config, QueryForm, YoudaoResponse } from "./utils/types.js";

export class Translate {
  private config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * 获取翻译结果
   */
  run(queryForm: QueryForm): Promise<YoudaoResponse> {
    const { query, from = "auto", to = "auto", vocabId } = queryForm;
    const { appId, appSecret } = this.config;
    let salt = new Date().getTime();
    let curtime = Math.round(new Date().getTime() / 1000);

    let str1 = appId + truncate(query) + salt + curtime + appSecret;

    const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
    const qsStr = qs.stringify({
      to,
      from,
      sign,
      salt,
      vocabId,
      curtime,
      signType: "v3",
      q: query,
      appKey: appId,
    });

    return fetch(`http://openapi.youdao.com/api?${qsStr}`, {
      method: "post",
    }).then(async (res) => {
      const json = await res.json();
      return json as YoudaoResponse;
    });
  }
}
