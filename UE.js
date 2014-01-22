/*
*Date: 2013-10-06
*Email:520ued.com@gmail.com
*Visit http://www.520ued.com/UE/ for more info.
*(c) 2013-2014 owenhong, http://www.520ued.com/
*versions:1.0.0
*/

;(function (root, factory){
    'use strict';

    var moment;

    if (typeof exports === 'object') {
        // CommonJS 模块
        // 加载 moment.js as 作为依赖
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. 注册一个匿名模块.
        define(function (req)
        {
            // 加载 moment.js 作为可选依赖
            var id = 'moment';
            moment = req.defined && req.defined(id) ? req(id) : undefined;
            return factory(moment);
        });
    } else {
        root.ue = factory(root.moment);
    }

}(this, function (moment){
    'use strict';

    var hasMoment = typeof moment === 'function',

    ue = function(){

        var jsPath = typeof JS_PATH == "undefined" ? "js/" : JS_PATH;

        this.jsPath  = jsPath;
        this.externalPath =  jsPath + "external/";
        this.otherPath =  jsPath + "other/";
        this.modulePath = jsPath + "module/"

    };

    ue.prototype = {
        //set root init
        init : function(options){

            var ops = options || {};

            this.jsPath = ops.jsPath || this.jsPath;
            this.externalPath = ops.externalPath || this.externalPath;
            this.otherPath = ops.otherPath || this.otherPath;
            this.module = ops.modulePath || this.modulePath;
        },
    }
    //script load JS adn CSS
    ue.prototype.Load = (function(){
        var env,
            doc = document,
            head,
            pending = {},
            pollCount = 0,
            queue = {css: [], js: []},
            styleSheets = doc.styleSheets;

        function createNode(name, attrs) {
            var node = doc.createElement(name), attr;

            for (attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    node.setAttribute(attr, attrs[attr]);
                }
            }
            return node;
        }

        function finish(type) {
            var p = pending[type],
                callback,
                urls;

            if (p) {
                callback = p.callback;
                urls     = p.urls;

                urls.shift();

                pollCount = 0;

                if (!urls.length) {
                    callback && callback.call(p.context, p.obj);
                    pending[type] = null;
                    queue[type].length && load(type);
                }
            }
        }

        function getEnv() {
            var ua = navigator.userAgent;

            env = {
              async: doc.createElement('script').async === true
            };

            (env.webkit = /AppleWebKit\//.test(ua))
              || (env.ie = /MSIE|Trident/.test(ua))
              || (env.opera = /Opera/.test(ua))
              || (env.gecko = /Gecko\//.test(ua))
              || (env.unknown = true);
        }

        function load(type, urls, callback, obj, context) {
            var _finish = function () { finish(type); },
                isCSS   = type === 'css',
                nodes   = [],
                i, len, node, p, pendingUrls, url;

            env || getEnv();

            if (urls) {
              urls = typeof urls === 'string' ? [urls] : urls.concat();
              if (isCSS || env.async || env.gecko || env.opera) {
                // Load in parallel.
                queue[type].push({
                    urls    : urls,
                    callback: callback,
                    obj     : obj,
                    context : context
                });
              } else {
                // Load sequentially.
                for (i = 0, len = urls.length; i < len; ++i) {
                    queue[type].push({
                        urls    : [urls[i]],
                        callback: i === len - 1 ? callback : null, // callback is only added to the last URL
                        obj     : obj,
                        context : context
                    });
                }
              }
            }

            if (pending[type] || !(p = pending[type] = queue[type].shift())) {
                return;
            }

            head || (head = doc.head || doc.getElementsByTagName('head')[0]);
            pendingUrls = p.urls;

            for (i = 0, len = pendingUrls.length; i < len; ++i) {
                url = pendingUrls[i];

                if (isCSS) {
                    node = env.gecko ? createNode('style') : createNode('link', {
                        href: url,
                        rel : 'stylesheet'
                    });
                } else {
                    node = createNode('script', {src: url});
                    node.async = false;
                }

                node.className = '520UED';
                node.setAttribute('charset', 'utf-8');

                if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
                    node.onreadystatechange = function () {
                        if (/loaded|complete/.test(node.readyState)) {
                            node.onreadystatechange = null;
                            _finish();
                        }
                    };
                } else if (isCSS && (env.gecko || env.webkit)) {
                    // Gecko and WebKit don't support the onload event on link nodes.
                    if (env.webkit) {
                        p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
                        pollWebKit();
                    } else {
                        node.innerHTML = '@import "' + url + '";';
                        pollGecko(node);
                    }
                } else {
                    node.onload = node.onerror = _finish;
                }

                nodes.push(node);
            }

            for (i = 0, len = nodes.length; i < len; ++i) {
                head.appendChild(nodes[i]);
            }
          }

        function pollGecko(node) {
            var hasRules;

            try {
                hasRules = !!node.sheet.cssRules;
            } catch (ex) {
                pollCount += 1;

                if (pollCount < 200) {
                    setTimeout(function () { pollGecko(node); }, 50);
                } else {
                    hasRules && finish('css');
                }
                return;
            }
            finish('css');
        }

        function pollWebKit() {
            var css = pending.css, i;

            if (css) {
                i = styleSheets.length;

                // Look for a stylesheet matching the pending URL.
                while (--i >= 0) {
                    if (styleSheets[i].href === css.urls[0]) {
                        finish('css');
                        break;
                    }
                }

                pollCount += 1;

                if (css) {
                    if (pollCount < 200) {
                        setTimeout(pollWebKit, 50);
                    } else {
                        finish('css');
                    }
                }
            }
        }

        return {
            css: function (urls, callback, obj, context) {
                load('css', urls, callback, obj, context);
            },

            js: function (urls, callback, obj, context) {
                load('js', urls, callback, obj, context);
            }
        }
    })();

    return ue;
})
);
var UE = new ue();

//选择数量
UE.Quantity = function(options){
    var ops = options || {};

    $(ops.minus).click(function(){
        var $num = parseInt($(this).siblings(ops.num).text());
        if($num > 1){
            $num -= 1;
            $(this).siblings(ops.num).text($num);
        }
    });
    
    $(ops.plus).click(function(){
        var $num = parseInt($(this).siblings(ops.num).text());
        $num += 1;
        $(this).siblings(ops.num).text($num);
    });
}

//置顶
UE.ScrollTop = function(options){
    'use strict';
    var ops = options || {},
        doc = document,
        lastTime,
        $top = 0;

    $(doc).scroll(function(event) {

        var $cur_time = $(doc).scrollTop();

        $(ops.divWrap).removeClass(ops.class);

        lastTime = event.timeStamp;
        setTimeout(function(){ 
            if(lastTime - event.timeStamp == 0){
                var $new_top = $(doc).scrollTop();

                if($new_top <= $top){
                    if($cur_time > 500){
                        $(ops.divWrap).addClass(ops.class).css({
                            top: '0px',
                        });
                    }
                }

                $top = $(doc).scrollTop();
            }
        },300);
    });
};
//置尾
UE.ScrollBottom = function(options){

    'use strict';

    var ops = options || {},
        doc = document,
        win = window,
        $scrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop(),
        $stop = $("footer").height() + $(ops).outerHeight(true) + 20;


    if($scrollBottom<$stop){
        $(ops).removeClass("bottom_fixed");
    }

    $(doc).scroll(function(event) {
        var $scrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();

        if($scrollBottom < 180){
            $(ops).removeClass("bottom_fixed");
        }else{
            $(ops).addClass('bottom_fixed');
        }
    });

};
//切换选项
UE.changeTab = function(options){
    'use strict';
    var ops = options || {};
    ops.event = ops.event || "click";
    ops.class = ops.class || "cur";

    $(ops.tabId).on(ops.event,function(){
        var $idx = $(this).index();
        $(this).addClass(ops.class).siblings().removeClass(ops.class);
        $(ops.contentId).children(ops.contentChild).eq($idx).show().siblings().hide();
    });
};
