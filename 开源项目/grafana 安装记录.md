# grafana 安装记录


- git
- go > 1.13.0
- nodejs@12

## centos
```
yum update
yum install gcc gcc-c++
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
wget https://nodejs.org/dist/v12.18.3/node-v12.18.3.tar.gz

tar -zvxf node-v6.2.0.tar.gz

cd node-v6.2.0.tar.gz

ln -s /usr/local/node-v6.2.0.tar.gz/node /usr/local/bin/node
ln -s /usr/local/node-v6.2.0.tar.gz/npm /usr/local/bin/npm
ln -s /usr/local/node-v6.2.0.tar.gz/node /usr/bin/node
ln -s /usr/local/node-v6.2.0.tar.gz/npm /usr/bin/npm
```
