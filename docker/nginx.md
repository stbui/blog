#### 一、环境说明

操作系统：centos 7

docker版本：1.10.3

nginx版本：latest


#### 二、安装docker

略

#### 三、拉取镜像

```
docker pull nginx
```

#### 四、
```
docker run -d -p 80:80 nginx
```

#### 五、访问
```
http://127.0.0.1
```


#### 六、volume 数据卷

```
docker run -d -p 80:80 -v /data:/usr/share/nginx/html nginx
```

#### nginx 文件目录

```
// html
/usr/share/nginx/html
// config
/etc/nginx/conf.d/nginx.conf
// log
/var/log/nginx
```

#### 从宿主机复制到容器
```
docker cp /root/stbui.stbui.com/nginx.conf ff0:/etc/nginx/conf.d/

```
