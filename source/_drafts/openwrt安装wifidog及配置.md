---
title: openwrt安装wifidog及配置
date: 2017-01-09 14:17:01
tags:
---

### 实现目标
在路由器上安装wifidog搭建无线热点认证系统，终端设备联网没有授权将无法上网

### 硬件设备

路由器：极路由3(智能双频路由器)
型号：HC5861

### 软件信息

固件版本：
wifidog版本：wifidog_1.2.1-2


### 安装wifidog

<!--more-->

```
opkg install wifidog
```
或者
```
opkg install http://downloads.openwrt.io/vendors/gee/ralink/packages/wifidog_1.2.1-2_ralink.ipk
```

### 配置wifi

/etc/wifidog.conf
```
# $Id$
# WiFiDog 配置文件
# *******************************************************

# *******************************************************
# 设备编号ID
# Parameter: GatewayID
# Default: default
GatewayID stbui
# 在身份验证服务器上将此设置为节点 ID
# 用于批量部署设备监测/统计目的。如果没有提供，则超时将使
# 用 GatewayInterface 接口的 mac 地作为ID : separators
# *******************************************************


# *******************************************************
# 外部接口
# Parameter: ExternalInterface
# Default: br-lan
# Optional
# 将此设置为外部接口，出现多级NAT网络配置时或更多复杂NAT环
# 境下,或子网VLAN，接口 eth0 ，认证ppp0 ！否则为自动检测
ExternalInterface eth0.2
# *******************************************************


# *******************************************************
# 内网接口
# Parameter: GatewayInterface
# Default: br-lan
# Mandatory
# 通常为内网群体，接口常以网桥br-lan， 交换机Switch ，
# 接口eth1，ath0 可以得到此 ifconfig 命令，查看相关配置信息
GatewayInterface br-lan
# *******************************************************


# *******************************************************
# 网关设置
# Parameter: GatewayAddress
# Default: 从接口查询GatewayInterface
# 内网IP网关，出现多DHCP服务时请指定，通常不需要。
GatewayAddress 192.168.1.1
# *******************************************************


# *******************************************************
# 认证页面
# Parameter: HtmlMessageFile
# Default: wifidog-msg.html
# 这允许您指定一个自定义 HTML 文件，它由网关触发。
# 该文件内的“标题 $title、错误信息 $message 错误 $node”是
# 需要被替换的内容，可看做此为模板文件。
# HtmlMessageFile /etc/wifidog-msg.html
# *******************************************************


# *******************************************************
# 验证服务
# Parameter: AuthServer
# Default: NONE
# Mandatory, repeatable
# 这允许您配置您的身份验证服务 可多个 顺序响应直到收到应答。
# 需要配置:主机名 Hostname 路径，协议等 强制性Mandatory
AuthServer {
  Hostname 192.168.1.165
  SSLAvailable no                   # yes,no 默认 no
  SSLPort 443                       # 默认为 443
  HTTPPort 80                       # 默认为 80
  Path /                            # 默认为空白
}

# 如果启用了 SSLAvailable，客户端将被重定向到HTTPS端口上的
# 身份验证守护进程。如果 Wifidog启用SSL加密连接，
# 其Wifidog也需使用HTTPS协议，而不非HTTP协议进行身份验证服务。
# *******************************************************


# *******************************************************
# 多种认证时，继续如下配置
# AuthServer {
# Hostname ecvit.com
# SSLAvailable yes
# Path /
# }
# *******************************************************


# *******************************************************
# 后台运行
# Parameter: Daemon
# Default: 1 # 1 允许 0 拒绝
# Daemon 1
# *******************************************************


# *******************************************************
# 网关侦听端口
# Parameter: GatewayPort
# Default: 2060
# Optional
# GatewayPort 2060
# *******************************************************


# *******************************************************
# 代理端口
# Parameter: ProxyPort
# Default: 0 (或者 disable ，1 为启用或 enable)
# 重定向http流量到本地代理端口，透明代理用户
# ProxyPort 0
# *******************************************************


# *******************************************************
# 指定唤醒
# Parameter: HTTPDName
# Default: WiFiDog
# HTTPDName:cnweaks
# 定义什么名字 HTTPD 服务将响应调起 HTTPDName WiFiDog
# *******************************************************


# *******************************************************
# 最大连接
# Parameter: HTTPDMaxConn
# Default: 10
# HTTPDMaxConn 100
# 指定接入用户的最大数量
# *******************************************************


# *******************************************************
# 自身防护
# Parameter: HTTPDRealm
# Default: WiFiDog
# HTTP域身份试图访问受保护的WiFiDog内部内容时，禁止访问
# 更多请参阅 HTTPUserName。
# HTTPDRealm wifidog
# *******************************************************


# *******************************************************
# 账户密码保护
# Parameter: HTTPDUserName / HTTPDPassword
# Default: unset
# 网关会广播某些信息，如用户名和密码，这使得可被任意接收。
# 您可通过 HTTPDUserName HTTPDPassword 设置需要保护的参数。
# HTTPDUserName admin
# HTTPDPassword 847676
# *******************************************************


# *******************************************************
# 流量计数器
# Parameter: CheckInterval
# Default: 60
# 一般用于统计用户上网时长或流量统计使用，过频繁会使网关压力
# 加大，指向到其他辅助服务器不太现实，基本无用处
# CheckInterval 60
# *******************************************************


# *******************************************************
# 状态过期注销
# Parameter: ClientTimeout
# Default: 5
# 此配置将使接入客户端在指定的时间后，将其注销活动状态，
# 注销后用户将处在“网络连接超时”状态
# ClientTimeout 30
# *******************************************************


# *******************************************************
# SSL证书配置
# Parameter: SSLPeerVerification
# Default: yes
# 启用 SSL/TLS 身份验证服务时，同时应配置验证证书。
# 如果你不想安装 ca 证书。禁用此项是有必要的，若启用yes，
# 则需要使用 SSLCertPath 指定其证书路劲

# 此设置要求 WifiDog 编译 SSL 支持。 否则它将被忽略了。
# 若完全出于测试目的请禁用 SSL
# SSLAvailable 为禁用时，此处却启用，将导致身份验证问题。
# 这会使得已经通过HTTPS验证的用户再次重定向到验证
# SSLPeerVerification no
# *******************************************************


# *******************************************************
# SSL证书路径
# Parameter: SSLCertPath
# Default: /etc/ssl/certs/
# 前提是SSLAvailable是启用状态才会有效，
# 此目录中的证书必须由其哈希值命名。对于认证交换的
# 您需要一个 ca 证书包比什么运屏障断路器
# 参见 https://dev.openwrt.org/ticket/16537
# 此设置要求 WifiDog 编译SSL支持。否则它将被忽略了。
# SSLCertPath /etc/ssl/certs/
# *******************************************************


# *******************************************************
# 证书加密算法
# Parameter: SSLAllowedCipherList
# Default: all ciphers supported
# 允许使用密码加密证书 请注意 CyaSSL证书将忽略加密，
# 由此会导致证书出现 *WITH ERRORS IN THEIR NAMES*错误
# 请参阅 CyaSSL 文档允许值
# SSLAllowedCipherList ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:ECDH-ECDSA-AES128-GCM-SHA256:ECDH-ECDSA-AES256-GCM-SHA384:ECDH-RSA-AES128-GCM-SHA256:ECDH-RSA-AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:ECDH-ECDSA-AES128-SHA:ECDH-ECDSA-AES256-SHA:ECDH-RSA-AES128-SHA:ECDH-RSA-AES256-SHA:AES128-SHA:AES256-SHA
# *******************************************************


# *******************************************************
# 跳过验证
# Parameter: TrustedMACList
# Default: none
# 多个主机请使用英文逗号分隔，允许指定的MAC不进行验证。
# 提示: 安全薄弱，因为 MAC 地址很容易被修改。
# TrustedMACList 00:00:DE:AD:BE:AF,00:00:C0:1D:F0:0D
# *******************************************************


# *******************************************************
# 防火墙配置
# Parameter: FirewallRuleSet
# Default: none # 参数 强制性 Mandatory 无 none 调用FirewallRule规则
# 同 FirewallRule 策略一起被调用，
# 其通常用于某些情况下，系统无法辨别用户时，配置其可能发生的策略
# 或进行重新验证等办法核实用户
# *******************************************************


# *******************************************************
# 防火墙规则
# Parameter: FirewallRule
# Default: none
# Rule Set: global
# FirewallRuleSet global {
# FirewallRule syntax:
# FirewallRule (block|drop|allow|log|ulog) [(tcp|udp|icmp) [port X or port-range X:Y]] [to IP/CIDR]

# 要阻止 SMTP邮件服务 因为是明文传输的，如下
# FirewallRule block tcp port 25

# 如果您需要限制某网段用户上网或单主机
# FirewallRule block to 192.168.0.0/16
# FirewallRule block to 172.16.0.0/12
# FirewallRule block to 10.0.0.0/8
# 请注意，这不是客户端隔离，因为是依据IP或网段的，
# 客户端依然可以通过桥接等方式继续使用

# 这是防止Teliphone软件的规则。
# FirewallRule allow udp to 69.90.89.192/27
# FirewallRule allow udp to 69.90.85.0/27
# FirewallRule allow tcp port 80 to 69.90.89.205


# 这是依据域名的策略配置
FirewallRule allow tcp to *.stbui.com
FirewallRule allow tcp to *.baidu.com
FirewallRule allow tcp to *.weixin.qq.com

# 苹果 iOS 7 客户的问题
# 参见如下地址的第7条和第14条办法处理:
# https://github.com/wifidog/wifidog-gateway/issues/
# FirewallRule allow tcp to apple.com
# FirewallRule allow tcp to icloud.com


# 使用 Log 或 ulog 进行允许或禁止某些端口内容
# 如 OPENWRT: 使用这些功能需要依赖项
# iptables-mod-extra 和 iptables-mod-ulog （基于 linux 发行版）。
# 规则你想 match.for 交换机︰
# 如：允许流量在 ip 69.90.89.205 端口 80:上通过
# FirewallRule log tcp port 80 to 69.90.89.205
# FirewallRule allow tcp port 80 to 69.90.89.205


# 你想要知道特定内容时，您可采用本办法:
# FirewallRule log to 0.0.0.0/0
# FirewallRule block to 0.0.0.0/0
# }
# *******************************************************


# *******************************************************
# 无条件阻止
# Rule Set: validating-users
# FirewallRuleSet validating-users {
# FirewallRule block to 0.0.0.0/0
# }
# *******************************************************


# *******************************************************
# 无条件允许
# Rule Set: known-users
# FirewallRuleSet known-users {
# FirewallRule allow to wifi.ecvit.com
# FirewallRule allow to weixin.qq.com
# }
# *******************************************************


# *******************************************************
# 验证发生错误
# Rule Set: auth-is-down
# FirewallRuleSet auth-is-down {
# FirewallRule allow to 0.0.0.0/0
# }
# *******************************************************


# *******************************************************
# 非法访问
# Rule Set: unknown-users
# 用于未经验证的用户，这是获取重定向的规则集
# FirewallRuleSet unknown-users {
# 使用到 ipset 来阻止或允许外部指定的主机。
# 例如，如果您的身份验证服务器要求用户登录 facebook，
# 使用 ipset 功能内置到 dnsmasq 来短暂允许Facebook验证所使用的各种 IPs。
# FirewallRule allow to-ipset fb
# FirewallRule allow udp port 53
# FirewallRule allow tcp port 53
# FirewallRule allow udp port 67
# FirewallRule allow tcp port 67
# }
# *******************************************************


# *******************************************************
# 禁止连接的客户端
# Rule Set: locked-users
# FirewallRuleSet locked-users {
# FirewallRule block to 0.0.0.0/0
# }
```


启动服务
```
/etc/init.d/wifidog start
```

开机自启
```
/etc/init.d/wifidog enable
```


### 验证

{% post_link wifidog认证服务开发 %}


### 问题

如果路由器中配置了 `mwan3` ，即使 wifidog 授权成功也无法上网，需要停止mwan3
```
状态 -> 系统进程 -> 找到“mwan3track”相关的关键字 -> 关闭
```


### 参考资料
wifidog包：
https://downloads.openwrt.org/chaos_calmer/15.05.1/ramips/mt7620/packages/packages/wifidog_1.2.1-1_ramips_24kec.ipk

http://downloads.openwrt.io/vendors/gee/ralink/packages/wifidog_1.2.1-2_ralink.ipk

源代码：
https://github.com/wifidog/wifidog-gateway

微信接口文档
http://mp.weixin.qq.com/wiki/2/55f1e301f4558846d2bf0dd51543e252.html

https://blog.fliaping.com/the-implements-of-weixin-wifi-by-using-wifidog-gateway/

http://blog.csdn.net/just_young/article/details/38003015

http://www.cnblogs.com/tolimit/p/4223644.html


https://github.com/liudf0716/apfree_wifidog


### 附 操作命令

```
opkg install http://downloads.openwrt.io/vendors/gee/ralink/packages/wifidog_1.2.1-2_ralink.ipk
vi /etc/wifidog.conf

// 编辑配置文件
// GatewayID default
// ExternalInterface eth0
// GatewayAddress 192.168.1.1
// AUthServer {
//    Hostname 192.168.1.165
//    SSLAvailable no
//    Path /
// }
// FirewallRule allow tcp to www.baidu.com

/etc/init.d/wifidog start
```