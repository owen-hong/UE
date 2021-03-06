/*
*Date: 2013-10-06
*Email:520ued.com@gmail.com
*Visit http://www.520ued.com/UE/ for more info.
*(c) 2013-2014 owenhong, http://www.520ued.com/
*github:https://github.com/owen-hong/UE
*versions:1.0.0
*/
;(function (root, factory){
    'use strict';

    var moment;

    if (typeof exports === 'object') {
        // CommonJS 模块
        // 加载 moment.js as 作为依赖
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment,window,document,undefined);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. 注册一个匿名模块.
        define(function (req)
        {
            // 加载 moment.js 作为可选依赖
            var id = 'moment';
            moment = req.defined && req.defined(id) ? req(id) : undefined;
            return factory(moment,window,document,undefined);
        });
    } else {
        root.UE = factory(root.moment,window,document,undefined);
    }

}(this, function (moment,window,document,undefined){
    'use strict';

    var hasMoment = typeof moment === 'function',

    ue = function(){

        var jsPath = typeof JS_PATH == "undefined" ? "js/" : JS_PATH,
            jsDebug = typeof JS_DEBUG == "undefined" ? true : JS_DEBUG;

        this.jsPath  = jsPath;
        this.jsDebug = jsDebug;
        this.externalPath =  jsPath + "external/";
        this.otherPath =  jsPath + "other/";
        this.modulePath = jsPath + "module/";
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
    };
    //script load JS adn CSS
    ue.prototype.Load = (function(window,document){
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
                i, 
                len, 
                node, 
                p, 
                pendingUrls, 
                url,
                minSwitch;

            env || getEnv();

            if (urls) {
              urls = typeof urls === 'string' ? [urls] : urls.concat();
              if (isCSS || env.async || env.gecko || env.opera) {

                // Load in parallel.
                queue[type].push({
                    urls    : urls ,
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

            //switch min
            if(UE.jsDebug===true){
                minSwitch = ".js";
            }else{
                minSwitch = ".min.js";
            }

            for (i = 0, len = pendingUrls.length; i < len; ++i) {
                url = pendingUrls[i];

                if(url.indexOf("jquery-")!==-1){
                    url = UE.jsPath + url;
                }else if(url.indexOf("external")!==-1||url.indexOf("other")!==-1){
                    url = url;
                }else{
                    url = UE.modulePath + url;
                }

                if (isCSS) {
                    node = env.gecko ? createNode('style') : createNode('link', {
                        href: url,
                        rel : 'stylesheet'
                    });
                } else {
                    node = createNode('script', {src: url + minSwitch });
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
    })(window,document);

    return new ue();
})
);