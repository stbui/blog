---
title: wifidog认证服务开发 - nodejs
date: 2017-01-13 21:03:35
tags: [nodejs, wifidog]
---

### 概述
wifidog是搭建无线热点认证系统的解决方案之一，他比nocat更适合互联网营销思路。目前支持openwrt系统，他实现了路由器和认证服 务器的数据交互，在路由器方是用C语言代码，通过wifidog程序和linux iptables防火墙实现接入用户的认证跳转和控制，在认证服务器方 是通过php实现用户的认证流程和管理。
`优点：`有开源代码，可以很方便的搭建认证系统。
`缺点：`标准协议是通过iptables方式实现，性能比较差，整体拉低了路由器的数据包处理速度，协议比较繁琐，对认证服务器的造成性能损耗比较大，在安全方面都是明文传输，有一定的安全隐患。

### 原理

### 网关心跳协议
wiﬁdog将ping协议作为心跳机制向认证服务器发送当前状态信息。实现认证服务器 和每个节点的状态双向健康监测的机制。

请求信息：
```
 http://192.168.1.165/ping/?
    gw_id=%s
    sys_load=%lu
    sys_memfree=%u
    sys_load=%.2f
    wiﬁdog_uptime=%lu
    wmac=               路由器mac地址
    gw_address=         路由器网关地址
    router_type=        路由器型号
    sv＝                 路由固件版本
```
回复内容：
```
Pong
```

例子：
```

```

### 用户状态上报协议
请求格式： 
```       
    http://auth_server/auth/?
    stage=
    ip=
    mac=
    token=
    incoming=
    outgoing=
    gw_id=          路由器授权码
```
注意：
    ip，mac，token为⽤用户的基本信息
    incoming，outgoing为⽤用户的连接计数信息。
    stage为请求类别，值为 counter/ login/ logout，分别表⽰示：已认证/新认证⽤用户 /超时删除的⽤用户。

回复内容：
Auth: 状态码   (注意 中间冒号和状态码之间有个空格)

    状态码为：
    0   认证失败
    1   认证成功

例子：


### 跳转协议
对于新连接⽤用户，路由器将其产⽣生的任意url请求通过302重定向到认证平台。
请求格式：
    http://auth_server/login/?
    gw_id=
    gw_address=
    gw_port=
    mac=
    url=
    gw_mac=     路由器mac地址

例子：

### 用户注册协议
用户在平台申请注册，开通互联网权限。由平台将⽤用户请求重定向到路由器， 完成注册。

请求格式：
    http://gw_ip/wiﬁdog/auth?
    token=

例子：

注册请求成功，以307的⽅方式跳转平台的 portal/?gw_id=

### 注册结果确认协议
 认证流程⾛走完，路由器会⽤用307跳转⽅方式，将⽤用户请求重新跳转到认证平台。

请求格式：
    http://auth_server/portal/?
    gw_id=
    auth_result=   认证结果

    auth_result 为 successed表⽰示⽤用户在路由器注册成功，failed表⽰示⽤用户在路由器注册失败。

例子：

### 路由器在线升级协议
认证流程⾛走完，路由器会⽤用307跳转⽅方式，将⽤用户请求重新跳转到认证平台。

请求格式：
    http://auth_server/upgrade/?
    sv=
    rmac=
    router_type=

响应格式：
    upgrade:md5=cc5ce6c4f7147bbdb1babfc32a44338b#url=http:// 192.168.81.55/static/nolimit_wiﬁdog.trx#ver=4.1.1080
    md5   为固件的md5值
    Url   为固件下载地址
    Ver   为固件版本

例子：



### 接口
LoginScriptPathFragment
```
login/?
```
PortalScriptPathFragment
```
portal/?
```
MsgScriptPathFragment
```
gw_message.php?
```
PingScriptPathFragment
```
ping/?
```
AuthScriptPathFragment
```
auth/?
```


### 服务
```
http://192.168.1.1:2060/wifidog/status
```


login/?gw_address=&gw_port=&gw_id=&ip=&mac=&url=
### 实现步骤

### 源代码
```

```

### 问题

在wifidog中默认使用php作为开发语言，在配置中默认写死了接口 gw_message
```
gw_message.php?message=denied
```
使用其他语言开发，需去掉.php
```
gw_message?message=denied
```


### 参考资料


http://www.cnrouter.com/
