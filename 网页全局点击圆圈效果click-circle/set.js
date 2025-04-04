// 请先看readme
Setting.addHeader("视觉效果");
var settingclickCircle = function() {

    // 先移除之前的事件监听器，防止重复绑定
    $(document).off('click', clickCircleHandler);

    // 如果开启了点击效果，则绑定事件
    if (settings.clickcircle) {
        $(document).on('click', clickCircleHandler);
    }
};

function clickCircleHandler(event) {
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const $circle = $('<div class="click-circle"></div>');

    $circle.css({
        left: `${event.clientX - 5}px`,
        top: `${event.clientY - 5}px`,
        borderColor: getRandomColor()
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
}

Setting.addToggle("clickcircle", {
    label: "点击效果",
    desc: "在这里开启点击圆圈扩散效果",
    default: true,
    onInit: settingclickCircle,
    onChange: settingclickCircle
});