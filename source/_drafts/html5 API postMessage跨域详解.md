# html5 API postMessage 跨域详解

地址：http://blog.xieliqun.com/2016/08/25/postMessage-cross-domain/

> window.postMessage(message,targetOrigin) 方法是 html5 新引进的特性，可以使用它来向其它的 window 对象发送消息，无论这个 window 对象是属于同源或不同源，目前 IE8+、FireFox、Chrome、Opera 等浏览器都已经支持 window.postMessage 方法。

---

### 准备

跨域是什么，我就不详细解释了，我相信你在看这篇文章前就已经了解的差不多了。现在我就直接进入实战阶段。

**两个服务器**：

- http://127.0.0.1:8080
- http://127.0.0.1:9090

先建立两个不同域的测试环境。我用 http-server（一个 node 服务器插件）建立了两个不同端口的本地服务器。

**两个页面**：

- a.html
- b.html

在http://127.0.0.1:8080中新建a.html，在http://127.0.0.1:9090中新建b.html。

### 数据发送

postMessage 允许用户在两个窗口或 frame 之间传递数据，无论这个 window 对象是不是同源都能发送。

首先我们先在 a.html 中建立一个 iframe。

```javascript
<iframe
  src="http://127.0.0.1:9090/b.html"
  frameborder="0"
  id="ifra"
  name="postIframe"
  onload="messageLoad()"
></iframe>
```

当 iframe 加载完时，发送数据

```javascript
function messageLoad() {
  var url = 'http://127.0.0.1:9090';

  window.postIframe.postMessage('给我tsort的信息', url);
}
```

postMessage 包括两个参数 data 和 url，data 为发送的数据，url 为发送地址。

### 数据接收

html5 新增了 onmessage 事件，它和 onclick 之类用法差不多。当窗口或 frame 接收到 postMessage 发送过来的数据时，将触发 onmessage 事件。

```javascript
window.onmessage = function(e) {
  e = e || event;
  alert(e.data);
};
```

该事件接收一个 event 对象，这个对象有三个属性，分别为 source，origin，data。

**source**： 消息源，消息的发送窗口/iframe。
**origin**：消息源的 URI(可能包含协议、域名和端口)，用来验证数据源。
**data**：发送方发送给接收方的数据。

### 完整例子

这个例子是这样的，a 页面中有一个 iframe，这个 iframe 是另一个域的 b 页面。当 b 加载完的时候，让它去给 iframe 里的页面发送一条信息。然后里面的页面立即回复已经接收到信息，然后再等三秒，回复 a 所请求的数据。

a.html

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

<iframe src="http://127.0.0.1:9090/b.html" name="postIframe" onload="messageLoad()"></iframe>

<script>
	function messageLoad(){
		var url = "http://127.0.0.1:9090";
		window.postIframe.postMessage("给我tsort的信息",url); //发送数据
	}

	window.onmessage = function(e){
		e = e || event;
		console.log(e.data); //接收b返回的数据，在控制台有两次输出
	}
</script>
</body>
</html>
```

b.html

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<script>
	window.onmessage = function(e){
		e = e || event;
		alert(e.data); //立即弹出a发送过来的数据
		e.source.postMessage("好的，请稍等三秒！",e.origin); //立即回复a

		var postData = {name:"tsrot",age:24};
		var strData = JSON.stringify(postData); //json对象转化为字符串
		setTimeout(function(){
			e.source.postMessage(strData,e.origin);
		},3000); //3秒后向a发送数据
	}
</script>
</body>
</html>
```
