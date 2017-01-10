---
title: web桌面虚拟化
date: 2016-10-20 12:54:12
categories: guacamole
tags: [nodejs,react,nw]
---

#### 一、环境说明

操作系统：centos 6.5
软件：guacamole


#### 二、安装编译和运行环境

<!--more-->

1. 关闭防火墙

```
chkconfig iptables off
service iptables stop
```
2. 修改SELinux运行模式
3. 安装GCC套件
```
yum groupinstall -y "Development Tools";
```
4. 下载JDK
5. 下载Tomcat

### 三、安装和配置Guacamole

1. 导入第三方软件源
```
rpm -Uvh http://mirrors.ustc.edu.cn/epel/6/x86_64/epel-release-6-8.noarch.rpm
```

```
rpm -Uvh http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.2-2.el6.rf.x86_64.rpm
```

修改配置文件：
```
vi /etc/yum.repos.d/epel.repo
```

```
# baseurl=http://download.fedoraproject.org/pub/epel/6/$basearch
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-6&arch=$basearch
```
改为：
```
baseurl=http://download.fedoraproject.org/pub/epel/6/$basearch
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-6&arch=$basearch
```
2. 安装Guacamole依赖软件包
```
# 安装Cairo
yum install -y cairo cairo-devel
# 安装libpng
yum install -y libpng libpng-devel
# 安装FreeRDP
yum install -y freerdp freerdp-devel
# 安装Pango
yum install -y pango pango-devel
# 安装libssh2
yum install -y libssh2 libssh2-devel
# 安装libtelnet
yum install -y libtelnet libtelnet-devel
# 安装libVNCServer
yum install -y libvncserver libvncserver-devel
# 安装libpulse
yum install -y pulseaudio pulseaudio-libs pulseaudio-libs-devel
# 安装libssl
yum install -y openssl openssl-devel
# 安装libvorbis
yum install -y libvorbis libvorbis-devel
# 安装OSSP UUID
yum install -y uuid uuid-devel
```
3. 下载Guacamole源码包
```
cd /root/Downloads
wget http://jaist.dl.sourceforge.net/project/guacamole/current/source/guacamole-server-0.9.7.tar.gz
git clone https://github.com/cmujedi/guacamole.git
```
4. 编译Guacamole
```
tar -xvzf guacamole-server-0.9.7.tar.gz
cd guacamole-server-0.9.7/
./configure --with-init-dir=/etc/init.d
make
make install
ldconfig
```
5. 配置Guacamole服务
```
chown root.root /etc/init.d/guacd
chmod 755 /etc/init.d/guacd
chkconfig --add guacd
chkconfig guacd on
```
以下四条命令可用于控制guacd服务：

```
service guacd start # 启动guacd服务
service guacd stop # 停止guacd服务
service guacd restart # 重启guacd服务
service guacd status # 查看guacd服务状态
```

6. 下载Guacamole客户端
```
cd /root/Downloads
wget http://jaist.dl.sourceforge.net/project/guacamole/current/binary/guacamole-0.9.7.war
mkdir /var/lib/guacamole
mv /root/Downloads/guacamole-0.9.7.war /var/lib/guacamole/guacamole.war
```
7. 新建Guacamole配置文件
```
mkdir /etc/guacamole
mkdir /root/.guacamole
cp /root/Downloads/guacamole/doc/example/guacamole.properties /etc/guacamole/guacamole.properties
cp /root/Downloads/guacamole/doc/example/user-mapping.xml /etc/guacamole/user-mapping.xml
ln -s /etc/guacamole/guacamole.properties /root/.guacamole/
```
8. 配置guacamole.properties文件
```
vi /etc/guacamole/guacamole.properties
```
将上述文件的basic-user-mapping属性设置为：

```
/etc/guacamole/user-mapping.xml
```
9. 配置user-mapping.xml文件
```
vi /etc/guacamole/user-mapping.xml
```
在上述XML文件的user-mapping节点内添加如下内容：

```
<authorize username="root" password="password">
 <protocol>vnc</protocol>
 <param name="hostname">localhost</param>
 <param name="port">5901</param>
 <param name="password">password</param>
 <param name="color-depth">32</param>
</authorize>
```
其中的密码值要和之前安装VNC Server时为相应用户设置的密码相同。
10. 部署Guacamole客户端
```
ln -s /var/lib/guacamole/guacamole.war /usr/local/Tomcat/webapps
```
11. 重启Tomcat
```
service tomcat restart
```
12. 启动guacd
```
service guacd start
```

### 四、验证Guacamole安装
在WEB浏览器中输入以下URL：

```
http://192.168.159.133:8080/guacamole/
```
然后，在登录页面中输入之前配置好的用户名/密码（root/password）即可通过WEB页面连接至VNC。


#### 五、问题
查看guacamole日志

```
cat /var/log/syslog
```
在使用过程中我遇到了使用rdp协议时无法播放声音问题，通过到社区http://sourceforge.net/projects/guacamole/forums查找提问的帖子解决了问题，
查看系统日志会发现问题提示：
Failed to load guacsnd plugin. Audio will not work.
Failed to load guacdr plugin. Drive redirection and printing will not work.
解决办法如下：

```
ln -s /usr/local/lib/freerdp/guacsnd.so /usr/lib/freerdp/
ln -s /usr/local/lib/freerdp/guacdr.so /usr/lib/freerdp/
```

把这两个插件软连接到rdp插件加载的文件夹下。



参考链接
- http://guacamole.incubator.apache.org/doc/gug/installing-guacamole.html
- https://github.com/cmujedi/guacamole
- http://ghoulich.xninja.org/2016/01/06/install-guacamole-in-centos/
- http://guoxiaoming.com/f2etest-install/
- http://blog.csdn.net/inuyasha1121/article/details/50262721
