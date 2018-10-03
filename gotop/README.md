## gotop.js

### 依赖
无

### 简介
原生js实现, 一个固定在网页下方, 点击返回顶部的按钮

#### 使用
##### 静态引人
```
<script src="gotop.js"></script>

<script>
  //default
  gotop.createButton()
  
  gotop.createButton({
    selector:window, //scroll容器
    scrollDuration:500, //滚动持续时间
    class:"my-class", //button class
    iconClass:"fa fa-caret-up" //icon class 默认使用font-awesome 的caret-up 图标, 可自行改变
  })
</script>
```
##### 模块引人
```
import gotop from "gotop"

gotop.createButton(options)
```
