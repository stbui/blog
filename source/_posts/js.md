title: script标签的工作原理
date: 2015-06-12 16:33:25
---

浏览器一边下载HTML网页，一边开始解析
解析过程中，发现script标签
暂停解析，网页渲染的控制权转交给JavaScript引擎
如果script标签引用了外部脚本，就下载该脚本，否则就直接执行
执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页

http://javascript.ruanyifeng.com/bom/engine.html
