---
title: 在docker中搭建持续集成环境
date: 2016-11-30 18:47:28
categories: docker
tags: [docker, jenkins, git]
---

### 目标

新的提交到git服务后，持续集成系统(CI)自动在服务端重新编译、打包、发布、重启服务。

### 工具

**docker:** Docker version 1.10.3, build cb079f6-unsupported

**jenkins:** 2.19.3

**git:**

### 环境

**虚拟机：**VMware® Workstation 12 Pro
**系  统：**centos 7

### 提前准备

<!--more-->

安装 **docker**
```
yum install docker
```
```
docker -v
```
```
service docker start
```

#### 安装jenkins镜像

```bash
docker pull jenkins
```
jenkins需要java环境，通过docker安装省去了安装环境的麻烦。

#### 创建jenkins容器

```
docker run -d --name jenkins -p 8080:8080 -v ${pwd}/data:/var/jenkins_home jenkins
```

指定jenkins访问端口8080，数据卷挂载到宿主机上，浏览器访问 http://blog.stbui.com:8080
根据页面提示查找初始密码，进入刚刚运行的容器
```
docker exec -it d05 bash
```
```
cat /var/jenkins_home/secrets/initialAdminPassword
```
返回的密码是：688fb319e597471fba2ab7e4cab72e38

进入jenkins 向导页面......



#### 部署nodejs项目

插件安装
。。。
系统设置
。。。

访问docker服务器
```
cd /root/eastmoney/stock && \
docker rm -f node-stbui-stock && \
docker build -t node-stbui-stock . && \
docker run -d -p 8000:8080 --name node-stbui-stock node-stbui-stock
```
