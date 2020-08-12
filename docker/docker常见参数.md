# docker 常见参数

## docker 查询容器、镜像、日志

```sh
docker top <container> #显示容器内运行的进程
docker images #查询所有的镜像，默认是最近创建的排在最上。
docker ps #查看正在运行的容器
docker ps -l #查看最后退出的容器的ID
docker ps -a #查看所有的容器，包括退出的。
docker logs {容器ID|容器名称} #查询某个容器的所有操作记录。
docker logs -f {容器ID|容器名称} #实时查看容易的操作记录。
```

## docker 删除容器与镜像

```sh
docker rm $(docker ps -a -q)  #删除所有容器
docker rm id  #删除单个容器
docker rmi id #删除单个容器
docker rmi $(docker images | grep none | awk '${print $3}' | sort -r) #删除所有镜像
```

## 启动停止容器

```sh
docker stop <容器名or ID> #停止某个容器
docker start <容器名or ID> #启动某个容器
docker kill <容器名or ID> #杀掉某个容器
```
