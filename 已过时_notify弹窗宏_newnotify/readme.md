# 新通知宏(new Notify)

⭐  主要功能：并行向下堆叠通知弹窗、通知宏和弹窗一一对应、完整弹出收回队列上滑动画

⭐  [跳转到下载引用部分](#使用)，请确保css和js都完整引入！

⭐  这是基于Chapel大佬的[自定义通知宏](https://twinelab.net/custom-macros-for-sugarcube-2/#/notify-macro)改造的分支，感谢[ChapelR](https://github.com/ChapelR)的贡献！

## 介绍

原版的通知宏提供了一个名为 `<<notify>>` 的宏部件，用于生成一条从界面右上角向左弹出按一定时间显示后收回的通知弹窗
但是，原版只是简单的生成了一个通知的div标签，这就导致了多条 `<<notify>>` 同时生效时，弹窗重叠的问题
下面是原版文档中的提示：
> [!DANGER] Note that giving the player unlimited control over these notifications, or trying to show several at once or right after each other will cause them to trip over themselves as they try to animate, so try to keep them spaced out, and don't assign them to links or buttons you expect the player to press repeatedly.<br>
[!注意]让玩家无限制地控制这些通知，或者尝试同时或彼此紧接地显示多个通知，都会导致弹窗在尝试生成动画时被自己重叠，所以尽量让每个通知保持间隔，不要将它们分配给你希望玩家反复按下的链接或按钮。

## 更改思路

- 通过创建一个容器，将通知弹窗分为单独的元素，“装在”容器内，实现多条通知不重叠
- 引入通知队列，为每条通知弹窗事件添加队列延时，从而支持多条通知同时管理，依次展示，避免多个 `<<notify>>` 同时存在时弹窗元素合并。
- 进一步增强动画， ~~找GPT问思路后~~ 在css上新增入场/退场动画，并添加元素上滑动画，使得通知弹窗流畅顺滑~
- 新美化了原版css样式，增加圆角和边框，可以自行修改

## 源码

尽量写了注释，希望容易理解，你可以扔进AI工具让它帮你进一步解析~

**JavaScript：**

```
/* 原型:Chapel's Notify Macro，RyaraSUKI改造分支 */

(function() {
    var DEFAULT_TIME = 2000; // 通知显示时间（毫秒）
    var isCssTime = /\d+m?s$/; // 判断css时间格式（分钟/秒）
    var QUEUE_DELAY = 150; // 每条通知弹出的间隔（毫秒）

/* 通知队列部分 */
    // 用来保存等待弹出的通知消息，并非空值
    var notifyQueue = [];
    // 标记当前是否有通知正在显示中（避免重复执行队列）
    var isNotifying = false;

/* 通知主体部分 */
    // 创建通知容器
    $(document.body).append("<div id='notify-container'></div>");

    // 处理通知队列，逐条显示通知
    function processQueue() {
        // 队列为空时停止显示
        if (notifyQueue.length === 0) {
            isNotifying = false;
            return;
        }

        isNotifying = true;
        var ev = notifyQueue.shift(); // 有通知则取出队列中第一条通知显示

        // 通知样式类名
        var classList = 'macro-notify ';
        if (ev.class) {
            if (typeof ev.class === 'string') {
                classList += ev.class;
            } else if (Array.isArray(ev.class)) {
                classList += ev.class.join(' ');
            }
        }

        // 检查并设置通知显示时间
        ev.delay = (typeof ev.delay === 'number' && !Number.isNaN(ev.delay)) ? ev.delay : DEFAULT_TIME;

        // 创建通知元素并设置内容与样式
        var $newNotify = $('<div class="notify-item"></div>')
            .addClass(classList)
            .wiki(ev.message);

        // 添加通知元素到容器里面
        $('#notify-container').append($newNotify);

        // 确保入场动画效果生效，这里利用了GPT帮忙（
        void $newNotify[0].offsetWidth;

        // 入场动画
        setTimeout(() => {
            $newNotify.addClass('open');
        }, 20);

        // 退场动画
        setTimeout(function() {
            $newNotify.addClass('close');
            setTimeout(function() {
                // 退场动画结束后向上滑动
                $newNotify.slideUp(300, function() {
                    $(this).remove();
                });
            }, 500);
        }, ev.delay);

        // 设置下一个通知的弹出时间
        setTimeout(processQueue, QUEUE_DELAY);
    }

    // 监听:notify事件，添加通知到队列中
    $(document).on(':notify', function(ev) {
        if (ev.message && typeof ev.message === 'string') {
            ev.message = ev.message.trim(); // 除掉空格
            notifyQueue.push(ev); // 添加到队列
            if (!isNotifying) {
                processQueue(); // 如果没有正在进行的通知，则开始处理队列
            }
        }
    });

    // 通知触发函数，拿来调用
    function notify(message, time, classes) {
        if (typeof message !== 'string') return;
        if (typeof time !== 'number') time = false;

        // 触发:notify事件
        $(document).trigger({
            type: ':notify',
            message: message,
            delay: time,
            class: classes || ''
        });
    }

/* SugarCube2宏配置部分 */
    // 用法：<<notify 持续时间，单位s>> 内容 <</notify>>
    Macro.add('notify', {
        tags: null,
        handler: function() {
            var msg = this.payload[0].contents,
                time = false,
                classes = false;

            if (this.args.length > 0) {
                var cssTime = isCssTime.test(this.args[0]);
                if (typeof this.args[0] === 'number' || cssTime) {
                    time = cssTime ? Util.fromCssTime(this.args[0]) : this.args[0];
                    classes = (this.args.length > 1) ? this.args.slice(1).flat(Infinity) : false;
                } else {
                    classes = this.args.flat(Infinity).join(' ');
                }
            }

            notify(msg, time, classes);
        }
    });

    setup.notify = notify;
})();
```

**Css：**

```
/* 通知弹窗宏部分 */
#notify-container {
    position: fixed;
    top: 2em;
    right: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    max-width: 20em;
}

/*通知元素部分，可自行修改边框、配色*/
.notify-item {
    display: block;
    width: 16em;
    padding: 0.5em;
    border: 3px solid;
    border-radius: 4px;
    color: #e0e0e0;
    background-color: #505050;
    border-color: #b0b0b0;
    position: relative;
    right: -20em;
    opacity: 0;
    transition: right 0.5s ease-in-out, opacity 0.5s;
}

/* 入场动画 */
.notify-item.open {
    right: 0;
    opacity: 1;
}

/* 退出动画 */
.notify-item.close {
    right: -20em;
    opacity: 0;
}
```

## 使用

⭐  Sugarcube2专用！

⭐  请确保css与js都完整的引入！

⭐  [GitHub仓库](https://github.com/RyaraSUKI/RyaraSUKI-Twine-Goods)

附件内，.min.js为压缩版本，可以有效减小体积

用法：

```
<<notify 停留时间（单位s）>> 内容 <</notify>>
```

**记得加闭合标签** !

