title: HTTP访问控制(CORS)
date: 2015-12-10 22:41:59
tags: http
---
跨站 HTTP 请求(Cross-site HTTP request)是指发起请求的资源所在域不同于该请求所指向资源所在的域的 HTTP 请求。比如说，域名A(http://domaina.example)的某 Web 应用程序中通过<img>标签引入了域名B(http://domainb.foo)站点的某图片资源(http://domainb.foo/image.jpg)，域名A的那 Web 应用就会导致浏览器发起一个跨站 HTTP 请求。在当今的 Web 开发中，使用跨站 HTTP 请求加载各类资源（包括CSS、图片、JavaScript 脚本以及其它类资源），已经成为了一种普遍且流行的方式。
<!-- more -->
正如大家所知，出于安全考虑，浏览器会限制脚本中发起的跨站请求。比如，使用 XMLHttpRequest 对象发起 HTTP 请求就必须遵守同源策略（same-origin policy）。 具体而言，Web 应用程序能且只能使用 XMLHttpRequest 对象向其加载的源域名发起 HTTP 请求，而不能向任何其它域名发起请求。为了能开发出更强大、更丰富、更安全的Web应用程序，开发人员渴望着在不丢失安全的前提下，Web 应用技术能越来越强大、越来越丰富。比如，可以使用 XMLHttpRequest 发起跨站 HTTP 请求。（这段描述跨域不准确，跨域并非浏览器限制了发起跨站请求，而是跨站请求可以正常发起，但是返回结果被浏览器拦截了。最好的例子是crsf跨站攻击原理，请求是发送到了后端服务器无论是否跨域！注意：有些浏览器不允许从HTTPS的域跨域访问HTTP，比如Chrome和Firefox，这些浏览器在请求还未发出的时候就会拦截请求，这是一个特例。）

隶属于 W3C 的 Web 应用工作组( Web Applications Working Group )推荐了一种新的机制，即跨源资源共享（Cross-Origin Resource Sharing (CORS)）。这种机制让Web应用服务器能支持跨站访问控制，从而使得安全地进行跨站数据传输成为可能。需要特别注意的是，这个规范是针对API容器的。比如说，要使得 XMLHttpRequest 在现代浏览器中可以发起跨域请求。浏览器必须能支持跨源共享带来的新的组件，包括请求头和策略执行。同样，服务器端则需要解析这些新的请求头，并按照策略返回相应的响应头以及所请求的资源。这篇文章适用于网站管理员、服务器端程序开发人员以及前端开发人员。对于服务器端程序开发人员，还可以阅读补充材料 cross-origin sharing from a server perspective (with PHP code snippets) 。

跨源资源共享标准( cross-origin sharing standard ) 使得以下场景可以使用跨站 HTTP 请求：

* 如上所述，使用 XMLHttpRequest 发起跨站 HTTP 请求。
* Web 字体 (CSS 中通过 @font-face 使用跨站字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
* WebGL 贴图
* 使用 drawImage API 在 canvas 上画图
* 接下来的文章，会对跨源资源共享做一个总览，并介绍下在 Firefox 3.5 中已实现的跨源资源共享所使用的 HTTP 头。

## 概述
跨源资源共享标准通过新增一系列 HTTP 头，让服务器能声明那些来源可以通过浏览器访问该服务器上的资源。另外，对那些会对服务器数据造成破坏性影响的 HTTP 请求方法（特别是 GET 以外的 HTTP 方法，或者搭配某些MIME类型的POST请求），标准强烈要求浏览器必须先以 OPTIONS 请求方式发送一个预请求(preflight request)，从而获知服务器端对跨源请求所支持 HTTP 方法。在确认服务器允许该跨源请求的情况下，以实际的 HTTP 请求方法发送那个真正的请求。服务器端也可以通知客户端，是不是需要随同请求一起发送信用信息（包括 Cookies 和 HTTP 认证相关数据）。

随后的章节，将对相关情景及用到的 HTTP 请求进行讨论。

## 一些访问控制场景
在此，我们会用三个场景来解释跨源共享是怎么运行的。其中，所有的跨站请求都是通过 XMLHttpRequest 对象发起。

如果对以下章节中的 JavaScript 代码片段感兴趣，可以访问这儿。在所有支持跨站 XMLHttpRequest 请求的浏览中，可以看到实际运行效果。而如果想继续了解服务器端对跨源请求的处理，则可以访问这儿。

### 简单请求
所谓的简单，是指：

* 只使用 GET, HEAD 或者 POST 请求方法。如果使用 POST 向服务器端传送数据，则数据类型(Content-Type)只能是 application/x-www-form-urlencoded, multipart/form-data 或 text/plain中的一种。
* 不会使用自定义请求头（类似于 X-Modified 这种）。

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS