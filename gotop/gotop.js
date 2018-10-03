/**
 * GitHub: https://github.com/GitHub-Laziji
 * Author: Laziji
 * Date: 2018/10/3
 */
;(function (undefined) {
    "use strict";
    const animated = `
            .animated {
              -webkit-animation-duration: 1s;
              animation-duration: 1s;
              -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
            }
            @-webkit-keyframes fadeInDown {
              from {
                opacity: 0;
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
              }
            
              to {
                opacity: 1;
                -webkit-transform: none;
                transform: none;
              }
            }
            
            @keyframes fadeInDown {
              from {
                opacity: 0;
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
              }
            
              to {
                opacity: 1;
                -webkit-transform: none;
                transform: none;
              }
            }
            
            .fadeInDown {
              -webkit-animation-name: fadeInDown;
              animation-name: fadeInDown;
            }
            
            @-webkit-keyframes fadeInDownBig {
              from {
                opacity: 0;
                -webkit-transform: translate3d(0, -2000px, 0);
                transform: translate3d(0, -2000px, 0);
              }
            
              to {
                opacity: 1;
                -webkit-transform: none;
                transform: none;
              }
            }
            @-webkit-keyframes fadeOutUp {
              from {
                opacity: 1;
              }
            
              to {
                opacity: 0;
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
              }
            }
            
            @keyframes fadeOutUp {
              from {
                opacity: 1;
              }
            
              to {
                opacity: 0;
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
              }
            }
            
            .fadeOutUp {
              -webkit-animation-name: fadeOutUp;
              animation-name: fadeOutUp;
            }
            
            @-webkit-keyframes fadeOutUpBig {
              from {
                opacity: 1;
              }
            
              to {
                opacity: 0;
                -webkit-transform: translate3d(0, -2000px, 0);
                transform: translate3d(0, -2000px, 0);
              }
            }
            
            @keyframes fadeOutUpBig {
              from {
                opacity: 1;
              }
            
              to {
                opacity: 0;
                -webkit-transform: translate3d(0, -2000px, 0);
                transform: translate3d(0, -2000px, 0);
              }
            }`
    const css = `
            background-color: #fff;
            position: fixed;
            right: 100px;
            bottom: 150px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            cursor: pointer;
            transition: .3s;
            box-shadow: 0 0 6px rgba(0, 0, 0, .22);
            z-index: 1030;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            font-variant: normal;
            text-transform: none;
            color: #409eff;
            opacity:0;`

    let _global;

    let button;
    let created = false;
    let plugin = {
        createButton: function (options) {
            if (created) {
                console.log("Button created")
                return;
            }
            options = options || {};
            let style = document.createElement('style');
            style.innerHTML = animated;
            document.querySelector('head').appendChild(style);

            button = document.createElement("div");
            button.style.cssText = css;
            button.className = (options.class || "") + " animated";
            let scrollDuration = options.scrollDuration || 500;
            let selector = options.selector;
            button.onclick = function () {
                plugin.scrollToTop(selector, scrollDuration);
            };
            let i = document.createElement("i");
            i.className = options.iconClass || "fa fa-caret-up";
            button.appendChild(i);
            document.querySelector("body").appendChild(button);
            plugin.addListener()
            created = true;
        },
        scrollToTop: function (selector, scrollDuration) {
            let element = selector && document.querySelector(selector) || window;
            let param = selector && 'scrollTop' || 'scrollY';
            const scrollHeight = element[param];
            const scrollStep = Math.PI / (scrollDuration / 15);
            const cosParameter = scrollHeight / 2;
            let scrollCount = 0;
            let scrollMargin;
            let scrollInterval = setInterval(() => {
                if (element[param] !== 0) {
                    scrollCount = scrollCount + 1;
                    scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                    element.scrollTo(0, (scrollHeight - scrollMargin))
                } else {
                    clearInterval(scrollInterval)
                }
            }, 15)
        },
        addListener: function () {
            let func = window.onscroll;
            window.onscroll = function () {
                if (typeof func === 'function') {
                    func()
                }
                plugin.handleScroll()
            };
        },
        handleScroll: function () {
            if (!button) {
                return;
            }
            let bodyScrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
            let windowHeight = window.innerHeight;
            if (bodyScrollHeight > windowHeight / 2) {
                if (button.className.indexOf("fadeInDown") === -1) {
                    button.className = button.className.replace(/\s*fadeOutUp\s*/, "") + " fadeInDown";
                }
            } else {
                if (button.className.indexOf("fadeInDown") >=0) {
                    button.className = button.className.replace(/\s*fadeInDown\s*/, "") + " fadeOutUp";
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
        !('gotop' in _global) && (_global.gotop = plugin);
    }
}());

