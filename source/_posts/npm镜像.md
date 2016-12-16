title: npm镜像
date: 2016-11-09 12:33:25
---

## 国内优秀npm镜像

### 淘宝npm镜像

- 搜索地址：http://npm.taobao.org/
- registry地址：http://registry.npm.taobao.org/

### cnpmjs镜像

- 搜索地址：http://cnpmjs.org/
- registry地址：http://r.cnpmjs.org/

## 如何使用

### 临时使用
```
npm --registry https://registry.npm.taobao.org install stbui
```

### 持久使用
```
npm config set registry https://registry.npm.taobao.org

// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info stbui
```

### 通过cnpm使用
```
npm install -g cnpm --registry=https://registry.npm.taobao.org

// 使用
cnpm install stbui
```