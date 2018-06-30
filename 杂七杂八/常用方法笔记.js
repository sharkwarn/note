
// 获取某元素到顶部的距离
function getAbsPoint(e)
{
    var x = e.offsetLeft;
    var y = e.offsetTop;
    while(e = e.offsetParent)
    {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    return {'x': x, 'y': y};
};
