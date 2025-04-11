# 点击效果(Click-Circle)

⭐  主要功能：为网页添加随机颜色/指定颜色组的扩散圆圈点击效果

⭐  [跳转到下载引用部分](#使用)，请确保css和js都完整引入！

## 简介

**这个效果只在passage和uibar元素中显示！若要更进一步，请调整z-index**

一个简单实现的网页全局性圆圈扩散点击效果，其实是从常见的网页爱心点击效果里改出来的，支持随机颜色或自定义颜色数组

---

按道理来说，还可以添加在原生方糖设置里启用开关，祥见set.js这一个示例

## 思路
定义颜色数组函数，监听click事件，生成点击圆圈效果 `<div>` 标签，绘制散动画，定时移除

## 源码
**JavaScript：**

```
// click-circle.js, for SugarCube 2, by RyaraSUKI
(function clickCircle(event) {
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    /* 上面是随机颜色，也可以自己定义，比如换成这个，定义一个颜色数组供取色
    const colors = ['#ffdd88', '#ff8899', '#77bbdd', '#7777aa', '#77dd77']; */

    $(document).on('click', function(event) {
        const $circle = $('<div class="click-circle"></div>');
        $circle.css({
            left: `${event.clientX - 5}px`,
            top: `${event.clientY - 5}px`,
            borderColor: getRandomColor(),
            /* 若要自定义颜色，换成这个，取色方式改为从定义的颜色数组里选
        circle.style.borderColor = colors[Math.floor(Math.random() * colors.length)]; */
        });
        $('body').append($circle);

        requestAnimationFrame(() => {
            $circle.css({
                transform: 'scale(6)',
                opacity: '0'
            });
        });

        setTimeout(() => {
            $circle.remove();
        }, 600);
    });
})();
```

**Css：**
 
```
/* 点击圆圈部分，可自己定义动画和边框宽度大小等 */
.click-circle {
    position: fixed;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid;
    opacity: 1;
    transform: scale(1);
    transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    pointer-events: none;
    z-index: 9999;
    /* 保证圆圈显示在最顶层 */
}
```

## 使用

⭐  Sugarcube2专用！

⭐  请确保css与js都完整的引入！

⭐  [GitHub仓库](https://github.com/RyaraSUKI/RyaraSUKI-Twine-Goods)

附件内，.min.js为压缩版本，可以有效减小体积

用法：直接添加到Style与Script中，在非调试模式中运行效果更佳