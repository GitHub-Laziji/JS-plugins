## page.js

### 依赖
bootstrap.css

### 简介
动态生成bootstrap分页, 用"..."隐藏过多的页

#### 使用
##### 静态引人
```
<div class"..." id="page"></div>
<script src="page.js"></script>

<script>
  pagination.create({
    el:"#page",
    count:100,
    page:2,
    limit:10,
    link:(page)=>`/list?page=${page}`
  })
</script>
```
##### 模块引人
```
import pagination from "page"
```
