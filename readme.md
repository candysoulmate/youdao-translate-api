# youdao-translate-api

基于 [有道智云·AI 开放平台](https://ai.youdao.com/) 的文本翻译。需注册申请 API,注册免费赠送￥ 50 体验金额。

# 安装

```
npm install youdao-translate-api
```

# 用法

翻译时自动识别源语言以及目标语言。

```js
const translate = new Translate({
  appId: "应用ID",
  appSecret: "应用秘钥",
});

translate.run({
  query: "测试",
});
```

通过指定源语言`from`和目标语言`to`来进行翻译。

```js
const translate = new Translate({
  appId: "应用ID",
  appSecret: "应用秘钥",
});

translate.run({
  query: "测试",
  from: "zh-CHS",
  to: "fr", // 法文
});
```

# 文档

响应码、支持语言等更多信息请参考文档：

https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html
