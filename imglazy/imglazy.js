/**
 * GitHub: https://github.com/GitHub-Laziji
 * Author: Laziji
 * Date: 2018/10/3
 */

;(function () {
    let _global;
    let listened = false;
    let plugin = {
        listen: function () {
            if (listened) {
                return;
            }
            $(document).ready(plugin.handleScroll);
            $(window).scroll(plugin.handleScroll);
            listened = true;
        },
        handleScroll: function () {
            let bodyScrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
            let windowHeight = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
            let imgs = $("img[data-src]");
            if(!imgs||!imgs.length){
                $(window).unbind("scroll",plugin.handleScroll);
                return;
            }
            for (let i = 0; i < imgs.length; i++) {
                let imgHeight = $(imgs[i]).offset().top;
                if (imgHeight <= windowHeight + bodyScrollHeight && imgHeight >= bodyScrollHeight) {
                    imgs[i].src = imgs[i].getAttribute('data-src');
                    imgs[i].removeAttribute('data-src');
                    imgs[i].onload=function(){
                        $(imgs[i]).css("opacity","1");
                    }
                }
            }
        }
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
        !('imglazy' in _global) && (_global.imglazy = plugin);
    }
}());
