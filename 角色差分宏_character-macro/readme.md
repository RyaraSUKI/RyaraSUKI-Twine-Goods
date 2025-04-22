# 角色差分宏

⭐  **这个宏主要是自用目的，是对if功能的简单封装**

⭐  **主要功能&目的：根据角色变量`$char`状态差异显示不同内容，多角色变量同时存在，将添加卡片样式显示对应不同角色内容，增加代码可读性**

⭐  **适用于 SugarCube2**

## 示例&使用
### 这里举个例子：
这是代码
```
<<ryara>>
这是梢的视角。
<</ryara>>
<br>
<<suki>>
这是匿名者的视角。
<</suki>>
```
当`$ryara = true`时，将会只显示第一部分

当`$ryara and $suki = true`时，两个部分都将会显示，并添加如图的卡片样式

还提供了一个`<<nochar>>`宏，用于显示没有任何角色变量时的内容

### 配置
在**JavaScript**里定义变量名，同样定义style类名
```
const styleMap = {
        ryara: "char-ryara",
        suki: "char-suki",
    };
```
在**CSS**里定义对应类名背景等
```
.char-ryara {
    background-color: #25917C;
}

.char-suki {
    background-color: #3388bb;
}
```

**你同样可以使用其他变量，但请注意，不要把变量设置成临时或已有的宏，将不会起效果！**