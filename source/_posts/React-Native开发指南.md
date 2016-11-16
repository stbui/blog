title: React-Native开发指南
date: 2015-12-07 22:38:48
tags: ReactNative
---
### 一、前言
介绍ReactNative开发整个流程步骤

### 二、环境配置
（1）电脑：一台Mac（OSX）
（2）调试工具：Xcode，建议在Xcode 6.3以上版本
（3）安装node.js：https://nodejs.org/download/
（4）安装brew：
（4.1）安装watchman
（4.2）安装flow
安装上述步骤，环境已经配置好了。
<!-- more -->
### 三、Hello, React-Native
现在我们需要创建项目，按照下面的步骤：
打开终端
安装命令行工具：
``` bash
sudo npm install -g react-native-cli
```
创建新项目：
``` bash
react-native init HelloWorld
```
找到刚创建的HelloWorld项目文件夹，双击HelloWorld.xcodeproj将会在Xcode中打开项目。（xcodeproj是Xocde的项目文件）
在Xcode中，使用快捷键cmd＋R即可启动项目。
启动完成后，你会看到IOS模拟器，具体效果如下，说明你创建项目成功了。
![HelloWorld](pic/1.png)

### 四、修改HelloWorld

### 五、恭喜你