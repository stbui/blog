---
title: raspberry-系统安装
date: 2016-05-09 11:24:44
categories: raspberry
tags:
---

在淘宝买的最新`raspberry Pi 3`

### 烧录镜像

<!--more-->


### 系统优化

###### 替换源为国内源
```
cp /etc/apt/sources.list /etc/apt/sources.list.bak

vi /etc/apt/sources.list
```

```
# 清华
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi

# 东软信息学院
deb http://mirrors.neusoft.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi
deb-src http://mirrors.neusoft.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi

# 中国科学技术大学
deb http://mirrors.ustc.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi
deb-src http://mirrors.ustc.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi

```

然后更新软件
```
apt-get update
apt-get upgrade
```


### 参考资料
官网系统下载地址：http://www.raspberrypi.org/downloads/
Centos7 for Raspberry Pi：
http://mirror.centos.org/altarch/7/isos/armhfp/

让你的docker(只能跑基于ARM的镜像)跑在树莓派上的系统
http://blog.hypriot.com/downloads/

Hypriot系统的安装教程
http://blog.hypriot.com/getting-started-with-docker-and-mac-on-the-raspberry-pi/

Hypriot的docker hub
https://hub.docker.com/u/hypriot/
