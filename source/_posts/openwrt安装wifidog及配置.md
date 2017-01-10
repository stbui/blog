---
title: openwrt安装wifidog及配置
date: 2017-01-09 14:17:01
tags:
---

### 实现目标

手机连接路由器wifi上网，需要授权

### 硬件设备

路由器：极路由3(智能双频路由器)
型号：HC5861

### 软件信息

固件版本：
wifidog版本：wifidog_1.2.1-1


### 安装wifidog

<!--more-->

```
opkg install wifidog
```

### 配置wifi

/etc/wifidog.conf
```
GatewayID 583135531878
GatewayInterface br-lan
ExternalInterface eth0.2
AuthServer {
     Hostname wificnnet.duapp.com
     HTTPPort 80
     Path /index.php/
    }

CheckInterval 60
ClientTimeout 5
TrustedMACList

FirewallRuleSet validating-users {
    FirewallRule allow to 0.0.0.0/0
}

FirewallRuleSet known-users {
    FirewallRule allow to 0.0.0.0/0
}

FirewallRuleSet global {
    FirewallRule allow tcp to 111.26.136.0/24
    FirewallRule allow tcp to 117.135.171.0/24
}
FirewallRuleSet unknown-users {
    FirewallRule allow udp port 53
    FirewallRule allow tcp port 53
    FirewallRule allow udp port 67
    FirewallRule allow tcp port 67
}

FirewallRuleSet locked-users {
    FirewallRule block to 0.0.0.0/0
}
```

```
/etc/init.d/wifidog start
```

### 验证


### 参考资料

https://downloads.openwrt.org/chaos_calmer/15.05.1/ramips/mt7620/packages/packages/wifidog_1.2.1-1_ramips_24kec.ipk

http://downloads.openwrt.io/vendors/gee/ralink/packages/wifidog_1.2.1-2_ralink.ipk



### 附
```
#网关ID
GatewayID default
#外部网卡
ExternalInterface eth0
#无线网卡
GatewayInterface eth0
#无线IP
GatewayAddress 192.168.1.1
#路由状态HTML
HtmlMessageFile wifidog-msg.html
#验证服务器
#AuthServer {
#    Hostname                 (Mandatory; Default: NONE)
#    SSLAvailable             (Optional; Default: no; Possible values: yes, no)
#    SSLPort                  (Optional; Default: 443)
#    HTTPPort                 (Optional; Default: 80)
#    Path                     (Optional; Default: /wifidog/ Note:  The path must be both prefixed and suffixed by /.  Use a single / for server root.)
#   LoginScriptPathFragment  (Optional; Default: login/? Note:  未用户登录重定向地址.)
#   PortalScriptPathFragment (Optional; Default: portal/? Note:  登录成功后重定向地址.)
#   MsgScriptPathFragment    (Optional; Default: gw_message.php? Note:  退出登录后重定向地址.)
#   PingScriptPathFragment    (Optional; Default: ping/? Note:  路由状态心跳地址.)
#   AuthScriptPathFragment    (Optional; Default: auth/? Note:  路由请求服务器验证地址 and 验证心跳地址(stage=counters).)
#}

AuthServer {
    Hostname auth.com
    #SSLAvailable yes
    Path /
}

# 是否后台进程
# Daemon 1
#默认网关端口
# Default: 2060
GatewayPort 80

# HTTP进程名
# HTTPDName WiFiDog

# HTTP最大连接数
# Default: 10
# HTTPDMaxConn 10

# WEB页面加密码后显示名
# Default: WiFiDog
# HTTPDRealm WiFiDog

# WEB加验证
# HTTPDUserName admin
# HTTPDPassword secret

# 心跳间隔时间
# Default: 60
CheckInterval 60

# 心跳间隔次数 验证超时数等于 CheckInterval*ClientTimeout
ClientTimeout 2

# 信任的MAC地址,加入信任列表将不用登录可访问
#TrustedMACList 00:00:DE:AD:BE:AF,00:00:C0:1D:F0:0D

#其他防火墙设置

#全局
FirewallRuleSet global {
    ## To block SMTP out, as it's a tech support nightmare, and a legal liability
    #FirewallRule block tcp port 25

    ## Use the following if you don't want clients to be able to access machines on
    ## the private LAN that gives internet access to wifidog.  Note that this is not
    ## client isolation;  The laptops will still be able to talk to one another, as
    ## well as to any machine bridged to the wifi of the router.
    # FirewallRule block to 192.168.0.0/16
    # FirewallRule block to 172.16.0.0/12
    # FirewallRule block to 10.0.0.0/8

    ## This is an example ruleset for the Teliphone service.
    #FirewallRule allow udp to 69.90.89.192/27
    #FirewallRule allow udp to 69.90.85.0/27
    #FirewallRule allow tcp port 80 to 69.90.89.205
}

# 新验证用户
FirewallRuleSet validating-users {
    FirewallRule allow to 0.0.0.0/0
}

#正常用户
FirewallRuleSet known-users {
    FirewallRule allow to 0.0.0.0/0
}

#未知用户
FirewallRuleSet unknown-users {
#域名已修改源码实现,直接下载的不行的...
    FirewallRule allow to baidu.com
    FirewallRule allow udp port 53
    FirewallRule allow tcp port 53
    FirewallRule allow udp port 67
    FirewallRule allow tcp port 67
}

#锁住用户
FirewallRuleSet locked-users {
    FirewallRule block to 0.0.0.0/0
}
```
