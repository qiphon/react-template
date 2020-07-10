/**
 * @fileoverview 手机号脱敏
 * @param {string} phone 手机号
 */
export const hidePhoneNumber = (phone) => {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
/**
 * @fileoverview 获取URL中的参数
 * @param {string} url 
 */
export const urlkey = (url) => {
    // 可以用下面这个取代
    // var url = new URL('https://example.com?foo=1&bar=2'); 
    // var params = new URLSearchParams(url.search);
    let params = {};
    if (url) {
        let urls = url.split("?");
        if (urls.length > 1) {
            let arr = urls[1].split("&");
            for (let i = 0, l = arr.length; i < l; i++) {
                let a = arr[i].split("=");
                params[a[0]] = a[1];
            }
        }
    }
    return params;
}

/**
 * @fileoverview  常用数据验证
 */
export const Validate = {
    mobile: (value) => {
        if (!value || !/^1\d{10}$/.test(value)) {
            return false
        }
        return true
    },
    password: (value) => {
        var m = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (value.match(m)) {
            return true
        } else {
            return false;
        }
    },
    /**
     * @fileoverview 中文名验证
     * @param {string} name 姓名 
     */
    name: (name) => {
        let reg = /^[\u4e00-\u9fa5]{2,}$/;
        return reg.test(name.trim())
    },
    IDCard: (card) => {
        if (!card) return false;
        card = card.trim()
        let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        let reg15 = /^[1-9]\d{5}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/;
        return reg.test(card) || reg15.test(card)
    },
}
/**
 * @fileoverview  是否是iPhone X系列机型
 */
export function isIphonXSeries() {
    if (window !== 'undefined' && window && !isIphone()) return false;
    const xSeriesConfig = [
        {  //iPhone Xs（Max,Pro Max）
            devicePixelRatio: 3,
            width: 414,
            height: 896,
        },
        {  // iPhone XR（11）
            devicePixelRatio: 2,
            width: 414,
            height: 896,
        },
        {  // iPhone X（Xs,Pro）
            devicePixelRatio: 3,
            width: 375,
            height: 812,
        },
    ];
    const {
        devicePixelRatio,
        screen: {
            width, height
        }
    } = window;
    return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
}
/**
 * @fileoverview iphonex xs xr xsmax 判断
 */
export function isIphonX() {
    // iPhone X、iPhone XS
    var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
    // iPhone XS Max
    var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
    // iPhone XR
    var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
    // console.log(isIPhoneX,isIPhoneXR,isIPhoneXSMax,'机型判断')
    return isIPhoneX || isIPhoneXR || isIPhoneXSMax
}

export function isIphone() {
    return /iphone/gi.test(window.navigator.userAgent)
}
/**
 * @fileoverview  history 是否存在
 */
export function isHistory() {
    return window.history && window.history.length
}
/**
 * @fileoverview  类名拆分
 * @param  {...string} args  
 */
export function devideClass(...args) {
    return args.join(' ');
}
/**
 * @fileoverview  将金额转换为逗号分隔的金额
 * @param {number|string} val 金额
 */
export function toMoneyString(val) {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
/**
 * @fileoverview  浏览器的关闭事件
 */
function closeWindow() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        window.WeixinJSBridge.call('closeWindow'); //微信
    } else if (ua.indexOf("alipay") != -1) {
        window.AlipayJSBridge.call('closeWebview'); //支付宝
    } else if (ua.indexOf("baidu") != -1) {
        window.BLightApp.closeWindow(); //百度
    } else {
        window.close(); //普通浏览器
    }
}

// 返回时执行的函数
function _listenerFun() {
    pushHistory(window.location.href)
    popState.cb()
}

function pushHistory(url) {
    var url = url || window.location.href
    window.history.pushState({ page: 1 }, null, url);
}
/**
 *     返回监控
 *     cb   Function  成功的函数
 * 
 */
function popState(cb) {
    // console.log(cb,"cbcbcb")
    popState.cb = cb || function () { }
    pushHistory()
    window.addEventListener('popstate', _listenerFun);

}
function removeState() {
    popState.modal = null
    window.removeEventListener('popstate', _listenerFun);
}

/**
 * @fileoverview 格式化时间
 * @param {str} param 格式化形式 
 * @param {date} date 时间对象 
 */
function getNowFormatDate(param, date) {
    date = date || new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var seperator3 = '+';
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    if (m >= 1 && m <= 9) {
        m = "0" + m;
    }
    if (d >= 0 && d <= 9) {
        d = "0" + d;
    }
    if (param == 'ymd') {
        var currentdate = y + seperator1 + m + seperator1 + d;
    } else {
        var currentdate = y + seperator1 + m + seperator1 + d
            + seperator3 + h + seperator2 + i
            + seperator2 + s;
    }
    return currentdate;
}

/**
*  @fileoverview  滑动事件
*  @param  {node}   el   点击的元素
*  @param  {object} obj 事件对象集合
*  @param  {function}   obj.left     向左滑动的时候触发   
*  @param  {function}   obj.right    向右滑动的时候触发   
*  @param  {function}   obj.up       向上滑动的时候触发   
*  @param  {function}   obj.down     向下滑动的时候触发   
*  @param  {number}  offset  事件触发的值
*/
export function touchevent(el = window, fncontainer = {}, offset = 50) {
    var startX, startY,
        endX = 0,
        endY = 0,
        startT = 0;
    el.addEventListener('touchstart', function (e) {
        startT = +new Date()
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, false);
    el.addEventListener('touchmove', function (e) {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;
    }, false);
    el.addEventListener('touchend', function (e) {
        var lengthX = endX == 0 ? 0 : Math.abs(startX - endX);
        var lengthY = endY == 0 ? 0 : Math.abs(startY - endY);
        if (+new Date() - startT < 600) {
            lengthX > lengthY && lengthX >= offset &&
                ((startX - endX) > 0 ?
                    (fncontainer.left && (fncontainer.left).call(el)) :
                    (fncontainer.right && (fncontainer.right).call(el)));

            lengthY > lengthX && lengthY >= offset &&
                ((startY - endY) > 0 ?
                    (fncontainer.up && (fncontainer.up).call(el)) :
                    (fncontainer.down && (fncontainer.down).call(el)));
        }
        startX = startY = endX = endY = startT = 0
    }, false);
}
/**
 * @fileoverview  简单的节流函数
 * @param {function} cb 要执行的函数
 * @param {number} t 间隔事件
 */
export function throte(cb, t) {
    let timeout = null;
    return function (...args) {
        if (timeout) {
            return;
        }
        typeof cb === 'function' && cb(...args)
        timeout = setTimeout(function () {
            timeout = null
        }, t ? t : 1000)
    }
}

//# 图片压缩
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
/**
 * @fileoverview  图片压缩
 * @param {file} file 要压缩的图片
 * @param {string} type 文件类型
 * @param {number} wLimit 限制的文件大小
 */
function canvasPress(file, type = "image/png", wLimit = 1000) {
    var img = new Image();
    img.src = window.URL.createObjectURL(file);
    var imgWidth, imgHeight;
    return new Promise((resolve, reject) =>
        img.onload = function () {
            imgWidth = img.width;
            imgHeight = img.height;
            let ctxW, ctxH;
            if (imgWidth > imgHeight && imgWidth > wLimit) {
                ctxW = wLimit;
                ctxH = wLimit * imgHeight / imgWidth
            } else if (imgHeight > imgWidth && imgHeight > wLimit) {
                ctxH = wLimit;
                ctxW = wLimit * imgWidth / imgHeight
            } else {
                ctxW = imgWidth
                ctxH = imgHeight
            }
            var canvas = document.createElement("canvas");
            canvas.width = ctxW
            canvas.height = ctxH
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, ctxW, ctxH);
            ctx.drawImage(img, 0, 0, ctxW, ctxH);
            // let base64 = canvas.toDataURL(type, .5);
            // return dataURLtoBlob(base64)
            // console.dir(file.type);return;
            canvas.toBlob(function (Blob) {
                resolve(Blob)
            }, 'image/png', .5)
        })
}
export {
    popState,
    removeState,
    pushHistory,
    getNowFormatDate,
    canvasPress,
}
/**
 *  @fileoverview 解决微信内 苹果手机输入框失焦卡住问题
 *  @params {object}  obj  传入对象说明
 *  @params {event}  obj.ev  事件对象
 *  @params {boolean} obj.clear   是否清除滚动事件
 *  @params {number}  obj.top   滚动值
 */
export const fixIphoneScrollBug = (function () {
    let __timeoutFillinfo = null
    return function fixbubInWechat({ ev, clear, top } = { top: 200 }) {
        if (!isIphone()) return;
        if (clear) return clearTimeout(__timeoutFillinfo)
        __timeoutFillinfo = setTimeout(() => document.scrollingElement.scrollTop = top, 500)
    }
})();
/**
 *   @fileoverview 计算年龄
 *   @params  {string}  id  出生年月日 '17891231' 
 */
export function caculateAge(id) {
    id = id.toString()
    let now = new Date()
    let year = now.getFullYear() - id.slice(0, 4)
    let month = now.getMonth() + 1 - id.slice(4, 6)
    let day = now.getDate() - id.slice(6)
    let caculate = 0
    if (month === 0) {
        caculate = day >= 0 ? 0 : -1
    } else if (month < 0) {
        caculate = -1
    }
    let age = year + caculate
    return age * 1
}

/**
 * @fileoverview 月份key值对应表
 */
export const monthMap = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
};