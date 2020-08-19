# grafana 前端开发记录

### 插件机制

grafana 功能通过插件方式来扩展不同客户的需求

#### 内置插件运行机制

#### 外置插件运作原理

## 二次开发

了解整个项目目录结构，通过修改前端源代码实现特定需求，构建部署前端代码

### 目标

开发内置插件

### 环境

- 版本：7.2.0
- 主要依赖包
  - [x] React v16.12.0
  - [x] Angular v1.6.9
  - [x] jquery v3.5.1
  - [x] d3 v5.15.0
  - [x] typescript v3.9.3
  - [x] webpack v4.41.5

### 目录结构

grafana 集成了多个框架，大部分以 Angular 实现

> 所用插件导入导出入口:

https://github.com/stbui/grafana/blob/60e186ae635dcf715ba8f095de749cd18a2a39a2/public/app/features/plugins/built_in_plugins.ts

> 内置插件文件目录

public/app/plugins/datasource
