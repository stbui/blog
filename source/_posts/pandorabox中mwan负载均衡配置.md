---
title: pandorabox中mwan负载均衡配置
date: 2017-01-09 11:24:44
categories: openwrt
tags: [openwrt,pandorabox,hc5861]
---

### 设备环境

路由器：极路由3(智能双频路由器)
型号：HC5861
主机型号：MediaTek MT7620A Evaluation Board
固件版本：PandoraBox 16.11 R4-3 Mod By LEAN / LuCI Master (git-16.274.06460-a91d7ee)
内核版本：3.14.79

### 实验目标
在公司局域网中一般做了网络限速，通过创建多个虚拟wan获取不同IP地址，然后配置mwan达到网速提速效果。

### 固件&工具

ssh: xshell
固件：


### 刷机

{% post_link 极路由3刷机过程 %}


### 配置

<!-- more -->

#### 接口添加

选择“网络” “接口” “添加新接口”

![](/images/201701091216.jpg)

设置IP地址
![](/images/2017-01-09_122138.jpg)

设置活跃点
![](/images/2017-01-09_122234.jpg)

分配防火墙
![](/images/2017-01-09_122308.jpg)

#### mwan添加

选择“网络” “负载均衡”

![](/images/201701091218.jpg)

成员设置

![](/images/2017-01-09_122359.jpg)

策略设置

![](/images/2017-01-09_122435.jpg)

规则设置

![](/images/2017-01-09_122457.jpg)

设置成功

![](/images/2017-01-09_122944.jpg)


### 参考资料
