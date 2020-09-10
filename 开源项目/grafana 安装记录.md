# grafana 安装记录


- git
- go > 1.13.0
- nodejs@12

## centos
```
yum update
```

## git
```
yum install git
```

## go
```
# 下载
wget https://golang.google.cn/dl/go1.14.9.linux-amd64.tar.gz

# 解压
tar -C /usr/local -xzf go1.14.9.linux-amd64.tar.gz

# 设置环境变量
export PATH=$PATH:/usr/local/go/bin

# 验证成功
go version

# 查看环境变量
go env
```

## nodejs
```
```
