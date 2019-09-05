---
title: raspberry-系统安装
date: 2016-05-09 11:24:44
categories: raspberry
tags:
---

在淘宝买的最新`raspberry Pi 3`

### 硬件配置

CPU 和 GPU： Broadcom BCM2835
内存：1024 MB(LPDDR2)
视频输入： 15-针头 MIPI 相机 (CSI) 界面，可被树莓派相机或树莓派相机(无红外线版)使用
视频输出： HDMI 可接入大多数通用 HDMI 接口的显示设备
音源输入：I²S
音源输出：HDMI 电子输出或I²S
板载存储：MicroSD 卡插槽
板载网卡：10/100Mbps 以太网接口（RJ45接口），支持802.11n无线网络及蓝牙4.1
通用外设：14 个 GPIO
电源输入：5V 电压 (通过 MicroUSB 或经 GPIO 输入)

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
