## share.js

![screenshot](screentshot1.png)
### 依赖
Font Awesome
```
<link href="http://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
```

### 简介
原生实现分享页面到微博, QQ, 人人...

#### 使用
##### 静态引人
```
<script src="share.js"></script>

//自动生成
<div id="bar"></div>

//直接调用
<button onclick="AShare.share.sinaWeibo.event()">分享到微博</button>

<script>
  AShare.config({
    title:"app",
    content:"sssshare",
    picture:"i.png",
    
    url: null, //选填  默认当前页面
  })
  
  //自动生成全部
  AShare.createBar("#el")
  
  //选择生成
  AShare.createBar("#el", {
    sinaWeibo:true,
    qzone:true,
    renren:true
  })
</script>
```
##### 模块引人
```
import AShare from "share"

AShare.config({
  title:"app",
  content:"sssshare",
  picture:"i.png",
}).createBar("#el")
```
