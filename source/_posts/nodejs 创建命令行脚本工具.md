---
title: nodejs 创建命令行脚本工具
date: 2016-12-02 08:34:23
tags: nodejs
---

### 环境

系统：windows 10
node: v6.9.1
npm: v3.9.1

### 前提准备

安装 nodejs

### 新建项目

```
npm init
```
在我们项目中会创建一个新的package.josn文件
根据引导初始化项目配置

### 添加入口脚本
```
#!/usr/bin/env node
console.log('hi stbui');
```

```
"bin":{
	"stbui":"index.js"
}
```

### 调试
```
npm link
```

### 发布

```
npm publish
```


## 解析命令行参数

```
npm install --save commander
```

```
#!/usr/bin/env node
var program = require('commander');
program
    .version(pkg.version, '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);
```


## 终端输出彩色化
```
npm install --save chalk
```