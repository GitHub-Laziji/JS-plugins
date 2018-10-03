## imglazy.js

### 依赖
jQuery

### 简介
图片懒加载

#### 使用
##### 静态引人
```
<img class="lazy" data-src="http://...}" src="./blank">
<script src="imglazy.js"></script>

<script>
  imglazy.config({class:"lazy"}).listen()
</script>
```
##### 模块引人
```
import imglazy from "imglazy"
```
