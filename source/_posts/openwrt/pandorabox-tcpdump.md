
title: pandorabox tcpdump抓包
date: 2017-01-09 09:24:59
categories: openwrt
tags: [tcpdump, openwrt,pandorabox,hc5861]
---


### 目的

路由器上安装tcpdump抓包


### 安装命令


```
opkg install http://downloads.pandorabox.com.cn/pandorabox/packages/mt7620/packages/base/libpcap_1.5.3-1_ralink.ipk

opkg install http://downloads.pandorabox.com.cn/pandorabox/packages/mt7620/packages/base/tcpdump_4.5.1-4_ralink.ipk
```


### tcpdump

抓取HTTP包

```
tcpdump -XvvennSs 0 -i eth0 tcp[20:2]=0x4745 or tcp[20:2]=0x4854

tcpdump -XvvennSs 0 tcp[20:2]=0x4745 or tcp[20:2]=0x4854 -c 2000 -w http.cap

```

抓取HTTP Request Headers
```
tcpdump -n -S -s 0 -A 'tcp dst port 80' | grep -B3 -A10 "GET /"
```


### 源

http://downloads.pandorabox.com.cn/pandorabox/packages/mt7620/packages/base/libpcap_1.5.3-1_ralink.ipk

http://downloads.pandorabox.com.cn/pandorabox/packages/mt7620/packages/base/tcpdump_4.5.1-4_ralink.ipk


### 扩展

http://linuxwiki.github.io/NetTools/tcpdump.html

http://www.cnblogs.com/beer/p/4932146.html

http://www.cnblogs.com/beer/p/4938427.html

http://www.cnblogs.com/beer/p/4921066.html
