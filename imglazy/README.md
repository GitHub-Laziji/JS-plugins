## imglazy.js

### 依赖
jQuery

### 简介
图片懒加载

#### 使用
##### 静态引人
```
// data-src 存放真实图片地址
<img class="lazy" data-src="./image.png" src="./blank.png">
<script src="imglazy.js"></script>

<script>
  imglazy.config({class:"lazy"}).listen()
</script>
```
##### 模块引人
```
import imglazy from "imglazy"
```
