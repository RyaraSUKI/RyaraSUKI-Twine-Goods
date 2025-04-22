# Popout-Macro v1.0.3 By RyaraSUKI

⭐  合并了改造版的Chapel's notify macro, 原notify作为popour的"side"属性，但原notify的的宏和接口仍可使用

## 图示

## popout宏
     - popout 宏定义（统一接口setup.popout）
     - 用法：<<popout 停滞时间（单位毫秒ms） "位置（top/bottom/side）" "点击JavaScript脚本字符串">> 内容 <</popout>>
     - 属性参数可乱序：停滞时间、位置（top/bottom/side）、点击脚本（JavaScript字符串）
     - 例子 <<popout 3000 "top" "UIbar.unstow()">>顶部弹下停滞3000毫秒点击展开侧边栏<</popout>>
     - 记得闭合！
     
## notify宏
     - notify 宏定义（保留用于兼容，没优化过数值获取方法，接口setup.notify）
     - 用法：<<notify 停滞时间 "JavaScript脚本">> 内容 <</notify>>
     
## API
```
    setup.notify(message, duration, classes, clickScript);
    setup.popout(message, duration, position, clickScript)
```
     - {string} message - 内容文本
     - {number} duration - 停滞时间
     - {string} position - 显示位置 "top"/"bottom"
     - {string} clickScript - 点击时执行获取的JavaScript
     - [notify] {string} classes - 样式

使用示例
```
<<script>>
setup.popout("顶部弹窗", 3000, "top", "UIBar.stow()");
setup.notify("notify弹窗", 3000, "notify-item", "UIBar.unstow()");
<</script>>
```