---
title: nginx在docker中应用
date: 2017-02-17 09:47:28
categories: docker
tags: [nginx, docker]
---

```
docker build -t stbui.stbui.com .

docker run -d -p 80:80 stbui.stbui.com
docker run -d -p 80:80 --name stbui.stbui.com stbui.stbui.com
```

docker cp /root/stbui.stbui.com/nginx.conf ff0:/etc/nginx/conf.d/


### 数据持久化


```
docker run -p 80:80 -v /nginx/conf.d:/etc/nginx/conf.d -d nginx
docker run -d -p 80:80 -v `pwd`/ngin/conf.d:/etc/nginx/conf.d stbui.stbui.com
```

如果需要持久化日记数据
```
docker run -it -p 80:80  -v `pwd`/logs:/var/log/nginx nginx
```
在当前目录下创建logs目录，存放access.log和error.log


```
docker exec -it e86 /bin/bash

```

Dockerfile

```
FROM nginx:latest

COPY . /usr/share/nginx/html

EXPOSE 80
```