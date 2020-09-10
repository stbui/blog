# grafana 安装记录

部署系统：**centos**

# 环境依赖

- git
- go > 1.13.0
- nodejs <13 >12

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

go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## nodejs
```
# 下载
wget https://nodejs.org/dist/v12.16.3/node-v12.16.3-linux-x64.tar.xz

# 解压
tar -C /usr/local -xzf node-v12.16.3-linux-x64.tar.xz

# 设置环境变量
export PATH=$PATH:/usr/local/node-v12.16.3-linux-x64/bin

# 验证成功
node -v
npm -v

# 
ln -s /usr/local/node-v12.18.3/node /usr/local/bin/node
ln -s /usr/local/node-v12.18.3/npm /usr/local/bin/npm
ln -s /usr/local/node-v12.18.3/node /usr/bin/node
ln -s /usr/local/node-v12.18.3/npm /usr/bin/npm
```

## grafana

```
git clone https://github.com/stbui/grafana --depth=1

cd grafana

# 安装yarn
npm install -g yarn

# 安装前端依赖
yarn

# 编译代码
make build

# 启动
./bin/linux-amd64/grafana-server
```

### 其他
```
# 前端
yarn build
```
