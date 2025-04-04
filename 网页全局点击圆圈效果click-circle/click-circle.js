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