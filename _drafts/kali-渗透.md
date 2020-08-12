---
title: kali 渗透
date: 2015-12-10 22:41:59
tags: kali
---

### 载入无线网卡


```
ifconfig

ifconfig -a

ifconfig wlan0 up
```

### 激活无线网卡至monitor即监听模式

```
airmon-ng start wlan0
```

### 探测无线网络，抓取无线数据包

```
airodump-ng mon0
```

### 参考

http://www.aneasystone.com/archives/2016/08/wireless-analysis-one-monitoring.html

http://www.cnblogs.com/york-hust/archive/2012/07/07/2580340.html
