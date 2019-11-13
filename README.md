# jQuery pagination

* [jQuery pagination](#jquery-pagination)
  * [介绍](#%E4%BB%8B%E7%BB%8D)
  * [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
    * [script标签引入](#script%E6%A0%87%E7%AD%BE%E5%BC%95%E5%85%A5)
    * [AMD方式引入](#amd%E6%96%B9%E5%BC%8F%E5%BC%95%E5%85%A5)
    * [Node平台CommonJS方式引入](#node%E5%B9%B3%E5%8F%B0commonjs%E6%96%B9%E5%BC%8F%E5%BC%95%E5%85%A5)

## 介绍

pagination是基于jQuery开发的分页插件。

它支持自定义页面总数、显示数以及切换页面回调函数。

## 使用方法

**注：样式文件`jquery.pagination.css`要手动引入；img文件夹（包含图片）要和`jquery.pagination.js`放在同级目录**

### script标签引入

   ```html
<!--class="page-switch"是固定的，因为要加载默认样式-->
<div class="page-switch" id="pageSwitch"></div>

<script src="jquery.js"></script>
<script src="jquery.pagination.js"></script>
   ```

   使用：

   ```js
$.pagination({
    totalPage:50,//告知分页总页数
    selector:'#pageSwitch',//传入分页元素id
    showNum:12,//设定分页要展示出的数字数目
    callback:function () {//页面切换后的回调
        console.log('gogogo')
    }
});
   ```

   

### AMD方式引入
```html
<!--class="page-switch"是固定的，因为要加载默认样式-->
<div class="page-switch" id="pageSwitch"></div>
```

   ```js
//requirejs按如下配置jQuery：
require.config({
    paths: {
        "jquery": "lib/jquery.min",
    }
});
   ```

   使用：

   ```js
require(['lib/jquery.pagination'],function(){
    $.pagination({
        totalPage:50,//告知分页总页数
        selector:'#pageSwitch',//传入分页元素id
        showNum:12,//设定分页要展示出的数字数目
        callback:function () {//页面切换后的回调
            console.log('gogogo')
        }
    });
})
   ```

### Node平台CommonJS方式引入

```html
<!--class="page-switch"是固定的，因为要加载默认样式-->
<div class="page-switch" id="pageSwitch"></div>
```

   ```bash
npm install jquery.pagination
   ```

使用：

   ```js
require("jquery.pagination");
$.pagination({
    totalPage:50,//告知分页总页数
    selector:'#pageSwitch',//传入分页元素id
    showNum:12,//设定分页要展示出的数字数目
    callback:function () {//页面切换后的回调
        console.log('gogogo')
    }
});
   ```

   

