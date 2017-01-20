---
title: 在树莓派3(raspberry Pi 3)上刷openwrt实现路由器
date: 2017-01-17 13:04:05
tags: [opentwrt, respberry]
---

### 硬件配置

 CPU: 1.2GHz 四核 Broadcom BCM2837 64 位 ARMv8 处理器
 WiFi功能：板载 BCM43143 WiFi
 蓝牙功能：板载低功耗蓝牙4.0功能 (BLE)
 内存：1GB RAM
 4 个 USB 2 端口
 40引脚扩展GPIO
 HDMI 和 RCA 视频输出
 4路立体声输出和复合视频端口
 全尺寸HDMI

### 工具

win32 Disk Imager
Xshell

### 固件地址

https://downloads.lede-project.org/snapshots/targets/brcm2708/bcm2710

https://downloads.lede-project.org/snapshots/targets/brcm2708/bcm2710/lede-brcm2708-bcm2710-rpi-3-ext4-sdcard.img.gz

### 配置

##### 网络

```
/etc/config/network
```
```
config interface 'loopback'
	option ifname 'lo'
	option proto 'static'
	option ipaddr '127.0.0.1'
	option netmask '255.0.0.0'

config globals 'globals'
	option ula_prefix 'fdf7:af39:fdc2::/48'

config interface 'lan'
	option type 'bridge'
#	option ifname 'eth0'
	option proto 'static'
	option ipaddr '192.168.1.1'
	option netmask '255.255.255.0'
	option ip6assign '60'

#config interface 'wan'
#	option proto 'dhcp'
#	option ifname 'eth0'

config interface 'wan'
	option ifname 'eth0'
	option proto 'static'
	option ipaddr '172.31.32.200'
	option netmask '255.255.255.0'
	option gateway '172.31.32.1'
	option dns '202.96.209.133'
```

```
/etc/config/wireless
```
```
config wifi-device 'radio0'
	option type 'mac80211'
	option channel '11'
	option hwmode '11g'
	option path 'platform/soc/3f300000.mmc/mmc_host/mmc1/mmc1:0001/mmc1:0001:1'
	option htmode 'HT20'
	option disabled '0'

config wifi-iface 'default_radio0'
	option device 'radio0'
	option network 'lan'
	option mode 'ap'
	option ssid 'stbui'
	option encryption 'none'
#	option encryption psk2
#	option key '12345678'
```

```
/etc/config/firewall
```

##### 安装luci界面

```
opkg update
opkg install luci
```

```
/etc/init.d/uhttpd start
/etc/init.d/uhttpd enable
```

### 验证

### 参考
LEDE:
https://lede-project.org/
