## imglazy.js

### 依赖
jQuery

### 简介
图片懒加载

#### 使用
##### 静态引人
```
// data-src 存放真实图片地址
<img data-src="./image.png" src="./blank.png">
<script src="imglazy.js"></script>
<script>
  imglazy.listen()
</script>
```

```
// 添加动画 style添加 opacity: 0;transition: 1s;  给图片加上淡入效果
<img data-src="./image.png" src="./blank.png" style="opacity: 0;transition: 1s;">
<script src="imglazy.js"></script>
<script>
  imglazy.listen()
</script>
```
##### 模块引人
```
import imglazy from "imglazy"
```
