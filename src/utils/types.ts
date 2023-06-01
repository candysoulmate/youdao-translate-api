export interface Config {
  /** 应用ID */
  appId: string;
  /** 应用秘钥 */
  appSecret: string;
}

export interface QueryForm {
  /**
   * 待翻译文本，多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
   */
  query: string;
  /** 源语言 */
  from?: string;
  /** 目标语言 */
  to?: string;
  /** 用户上传的词典ID */
  vocabId?: string;
}

export interface YoudaoResponse {
  /** 错误返回码 */
  errorCode: string;
  /** 源语言 */
  query: string;
  /** 翻译结果 */
  translation: string[];
  /** 词义 */
  basic: string;
  /** 词义 */
  web?: string[];
  /** 源语言和目标语言 */
  l: string;
  /** 词典deeplink */
  dict?: string;
  /** webdeeplink */
  webdict?: string;
  /** 翻译结果发音地址，需要应用绑定语音合成服务才能正常播放 */
  tSpeakUrl?: string;
  /** 源语言发音地址，需要应用绑定语音合成服务才能正常播放 */
  speakUrl?: string;
  /** 单词校验后的结果 */
  returnPhrase?: string[];
}
