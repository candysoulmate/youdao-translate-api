import qs from "qs";
import fetch from "node-fetch";
import { getSigns } from "./utils/index.js";
import {
  Config,
  QueryForm,
  YoudaoResponse,
  YoudaoBatchResponse,
  BatchQueryForm,
} from "./utils/types.js";

export class Translate {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * 获取翻译结果
   */
  async run(queryForm: QueryForm): Promise<YoudaoResponse> {
    const { query, from = "auto", to = "auto", vocabId } = queryForm;
    const { appId, appSecret } = this.config;

    const { salt, sign, curtime } = getSigns(query, appId, appSecret);

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

    const res = await fetch(`http://openapi.youdao.com/api?${qsStr}`);
    const json = await res.json();
    return await (json as YoudaoResponse);
  }

  /** 批量获取翻译结果 */
  async runBatch(queryForm: BatchQueryForm) {
    const { query, from = "auto", to = "auto", vocabId } = queryForm;
    const { appId, appSecret } = this.config;

    const { salt, sign, curtime } = getSigns(query.join(""), appId, appSecret);

    const qsStr = qs.stringify(
      {
        q: query,
        appKey: appId,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        vocabId: vocabId,
      },
      { indices: false }
    );

    const res = await fetch(`https://openapi.youdao.com/v2/api?${qsStr}`);
    const json = await res.json();
    return await (json as YoudaoBatchResponse);
  }
}
