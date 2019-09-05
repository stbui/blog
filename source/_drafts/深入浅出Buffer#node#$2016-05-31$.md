> Node 中关于 Buffer 的用法

#### Buffer 的简单理解

Node 中的 Buffer 有点像数组 Array，只是它是用来操作字节的。  
Buffer 在 Node 进程启动的时候就已经被加载，并将其放在了全局对象（global）中，因此使用时无需 require。

#### Buffer 对象

Buffer 对象类似于数组，元素为 16 进制的两位数，即 00-ff，对应十进制则为 0-255 的数值。

```javascript
var str = "hello"
var buf = new Buffer(str)

// 此时buf即为
<Buffer 68 65 6c 6c 6f>

// 转化成十进制则为
104 101 108 108 111

// 可与ASCII码表对照得出字符

// 再来看看中文
str = "你好"
buf = new Buffer(str)   // *

//此处buf为
<Buffer e4 bd a0 e5 a5 bd>

// 其实上述星号注释的代码把buffer的第二个参数省略了，默认为UTF-8
// 这说明了UTF-8编码下的中文占用3个元素
// 而字母和半角标点符号占用1个字符
```

为什么说 Buffer 类似数组，因为它拥有和数组类似的取值方式

```javascript
// 1.
var buf = new Buffer(10);
console.log(buf.length); // 10

// 上述分配了一个长10个字节的Buffer对象，可以通过下标的方式获取获取值
console.loe(buf[5]); // 这个值是随机的，在0-255之间的随机值

// 我们也可以使用下标进行赋值
buf[5] = 100;

// 有一点需要注意，如果赋值如果小于0，则会将该值逐次加256直到得到一个0-255之间的值
// 如果得到大于255的值，则逐次减256直到得到一个0-255之间的值。
// 如果是一个小数，则只保留整数部分
```

#### Buffer 与 String 的转换

1. String 到 Buffer  
   `var buff = new Buffer("hello")`
2. Buffer 到 String  
   `var str = buf.toString()`

#### Buffer 的拼接

对于英文，我们可以类似如下方式进行正常的拼接

```javascript
var fs = require('fs');
var rs = fs.createReadStream('test.md');
var data = '';
rs.on('data', function(chunk) {
  data += chunk;
  // 等价于
  // data = data.toString() + chunk.toString()
});
rs.on('end', function() {
  console.log(data);
});
```

对于中文，上述方式便会出现问题

```javascript
var fs = require("fs")
var rs = fs.createReadStream("test.md", {highWaterMark: 11})
var data = ''
rs.on("data", function(chunk) {
  data += chunk
  // 等价于
  // data = data.toString() + chunk.toString()
})
rs.on("end", function(){
  console.log(data)
})

// 最终会打印出类似如下的效果
事件循���和请求���象构成了Node.js���异步I/O模型的���个基本���素，这也是典���的消费���生产者场景。
```

造成以上原因是因为我们设置了可读流每次读取 11 个字节，即一个 chunk，也即一个 buffer 中包含 11 个字节。而 UTF8 下的中文是 3 个字节为一个中文，于是便造成了第四个中文只截取了前两个字节。

当然默认的 highWaterMark 是 64KB，因此在每次读取的字节数越大的情况下，乱码的情况便会减少。

正确拼接的方式可以有如下两种  
1.设置可读流的编码

```javascript
  var fs = require("fs")
  var rs = fs.createReadStream("test.md", {highWaterMark: 11})
  rs.setEncodeing("utf8")
  ...
```

这种方式依靠了 StringDecoder 模块的作用，将被截断的字节临时保存起来，再与下一次读取到的字节合并，解决了乱码的现象。当然，它只能支持少数的编码

2.不使用+chunk 的方式

```javascript
  var iconv = require("iconv-lite")
  var fs = require("fs")
  var rs = fs.createReadStream("test.md", {highWaterMark: 11})
  var chunks = []
  var size = 0
  rs.on("data", function() {chunk} {
    chunks.push(chunk)
    size += chunk.length
  })
  rs.on("end", function(){
    var buffer = null
    // switich(chunks.length) {
    //   case 0: buffer = new Buffer(0)
    //     break;
    //   case 1: buffer = chunks[0]
    //     break;
    //   default:
    //     buffer = new Buffer(chunks.length)
        // for(var i = 0, pos = 0, l = chunks.length; i < l; i++) {
        //   var chunk = chunks[i]
        //   chunk.copy(buffer, pos)
        //   pos += chunk.length
        // }
    }
    // 可以使用Buffer的concat来代替上面代码，因为它内部便是使用了类似上面的代码
    buffer = Buffer.concat(chunks, size)
    var str = iconv.decode(buf, "utf8")
    console.log(iconv)
  })
```

#### Buffer 对象中关于 writeXXX 和 readXXX 方法的用法

Buffer 中，如果用于存储数值的话，使用这些 api 便可以大大节省空间，因为它会将数值转化为二进制进行存储。  
这些 api 可以分为两部分来说，一部分是存储类型为整型的数值，另一部分是存储类型为浮点型的数值。  
而浮点型又分为单精度和双精度浮点型。

首先我们看看整型

```javascript
读部分：
buf.readInt8(offset[, noAssert])
buf.readInt16BE(offset[, noAssert])
buf.readInt16LE(offset[, noAssert])
buf.readInt32BE(offset[, noAssert])
buf.readInt32LE(offset[, noAssert])
buf.readIntBE(offset, byteLength[, noAssert])
buf.readIntLE(offset, byteLength[, noAssert])
buf.readUInt8(offset[, noAssert])
buf.readUInt16BE(offset[, noAssert])
buf.readUInt16LE(offset[, noAssert])
buf.readUInt32BE(offset[, noAssert])
buf.readUInt32LE(offset[, noAssert])
buf.readUIntBE(offset, byteLength[, noAssert])
buf.readUIntLE(offset, byteLength[, noAssert])

写部分：
buf.writeInt8(value, offset[, noAssert])
buf.writeInt16BE(value, offset[, noAssert])
buf.writeInt16LE(value, offset[, noAssert])
buf.writeInt32BE(value, offset[, noAssert])
buf.writeInt32LE(value, offset[, noAssert])
buf.writeIntBE(value, offset, byteLength[, noAssert])
buf.writeIntLE(value, offset, byteLength[, noAssert])
buf.writeUInt8(value, offset[, noAssert])
buf.writeUInt16BE(value, offset[, noAssert])
buf.writeUInt16LE(value, offset[, noAssert])
buf.writeUInt32BE(value, offset[, noAssert])
buf.writeUInt32LE(value, offset[, noAssert])
buf.writeUIntBE(value, offset, byteLength[, noAssert])
buf.writeUIntLE(value, offset, byteLength[, noAssert])
```

可看到，它既可以读/写有符号的整型，也可以是读/写无符号的整型。  
其中 BE 和 LE 的意思则为 Big Endian 和 Little Endian。这个不在本文讨论之内，自行网上搜索吧。

int8 则说明最大读/写 8 为二进制数，int16 则为 16 位，以此类推，而像 intBE 和 intLE 这些就是最大 48 位二进制数了。

写入时，传入的 value 只要是符合规则数值即可，可以是任何进制的数值。

```javascript
var buf = new Buffer(6);
var timeStamp = 1447656645380;
buf.writeUIntBE(timeStamp, 0, 6);
// <Buffer 01 51 0f 0f 63 04>

timeStampe = buf.readUIntBE(0, 6);
// 1447656645380
```

我们只要注意，传入 Buffer 构造函数的数值是字节，1 个字节是 8 位二进制数，因此 6 个字节便是 48 位，所以需要使用 writeUIntBE 来写入  
1447656645380 的二进制为 10101000100001111000011110110001100000100  
有 41 位，也因此我们只能使用 writeUIntBE 来写。  
如果我们一开始将时间戳作为字符串写入 Buffer 中的话，则需要耗费 13 个字节进行存储。  
使用这种方式，现在只需要 6 个字节了，大大减少存储空间

浮点型数值

```javascript
读部分
buf.readDoubleBE(offset[, noAssert])
buf.readDoubleLE(offset[, noAssert])
buf.readFloatBE(offset[, noAssert])
buf.readFloatLE(offset[, noAssert])

写部分
buf.writeDoubleBE(value, offset[, noAssert])
buf.writeDoubleLE(value, offset[, noAssert])
buf.writeFloatBE(value, offset[, noAssert])
buf.writeFloatLE(value, offset[, noAssert])
```

double 为双精度，数值最大为 64 位；而 float 为单精度，数值最大为 32 位。即都支持小数。

因此我们应该充分利用这些特点来读写数据，充分利用我们的空间。

#### 6.0 开始的 Buffer

从 6.0 开始的 node，不再推荐使用`new Buffer`的这种方式来创建 Buffer 对象，这种方式会存在内存泄漏的问题。应该使用如下方式来创建：

```javascript
const buff = Buffer.alloc(10);

//相当于
const buff = new Buffer(10);
buff.fill(0);
```

alloc 即为申请 n 个字节的内存空间

同时 6.0 还提供了其他创建 Buffer 的 api。

Buffer.allocUnsafe，很明显这种方式创建的 Buffer 对象也是不安全的，数据可能是之前已经存在的旧数据。

Buffer.from 也是一种方式，可以根据创建包含指定字符串的 Buffer 对象。

这里有一篇关于读写数值的[文章](https://cnodejs.org/topic/56499568d28aa64101600fdc)值得一看  
6.0 的用户也可以看看[这篇](https://segmentfault.com/a/1190000005368752)
