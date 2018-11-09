/**
 * GitHub: https://github.com/GitHub-Laziji
 * Author: Laziji
 * Date: 2018/10/29
 */
;(function (undefined) {
    "use strict";

    let _global;

    let options;

    const SHARE = {
        sinaWeibo: {
            icon: "weibo",
            color: "crimson",
            name: "新浪微博",
            event: function () {
                openUrl({
                    url: "http://service.weibo.com/share/share.php",
                    query: {
                        title: `${options.title}\n${options.content}`,
                        pic: options.picture,
                        url: options.url || location.href,
                        appkey: options.url || location.href
                    }
                });
            }
        },
        qzone: {
            icon: "qq",
            color: "dodgerblue",
            name: "QQ空间",
            event: function () {
                openUrl({
                    url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                    query: {
                        title: options.title,
                        summary: options.content,
                        pics: options.picture,
                        url: options.url || location.href,
                        site: options.url || location.href
                    }
                });
            }
        },
        renren: {
            icon: "renren",
            color: "mediumslateblue",
            name: "人人网",
            event: function () {
                openUrl({
                    url: "http://widget.renren.com/dialog/feed",
                    query: {
                        title: options.title,
                        description: options.content,
                        link: options.url || location.href
                    }
                });
            }
        }
    };

    function openUrl(opt) {
        window.open(urlBuilder(opt), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
    }

    function urlBuilder(opt) {
        return `${opt.url}?${Object.keys(opt.query).map(k => `${k}=${encodeURIComponent(opt.query[k])}`).join("&")}`;
    }

    let plugin = {
        config: function (opt) {
            options = opt || {};
            return plugin;
        },
        createBar: function (el, opt) {
            let element = document.querySelector(el);
            let first = true;
            Object.keys(SHARE).map(k => {
                if (opt && opt[k] === false) {
                    return;
                }
                let data = SHARE[k];
                let div = document.createElement("div");
                div.setAttribute("style",
                    `
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    cursor: pointer;
                    border: 1px solid ${data.color};
                    color: ${data.color};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    margin-left: ${first ? 0 :10}px;`);
                div.setAttribute("title",`分享到${data.name}`);
                div.onclick = data.event;
                element.appendChild(div);
                let i = document.createElement("i");
                i.className = `fa fa-${data.icon}`;
                div.appendChild(i);
                first = false;
            })
        },
        share: SHARE
    };
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = plugin;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return plugin;
        });
    } else {
        !('AShare' in _global) && (_global.AShare = plugin);
    }
}());
