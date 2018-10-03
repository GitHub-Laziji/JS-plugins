/**
 * GitHub: https://github.com/GitHub-Laziji
 * Author: Laziji
 * Date: 2018/10/3
 */
;(function (undefined) {
    "use strict";
    let _global;
    let plugin = {
        create:function (options) {
            options = options||{};
            let json = [{
                name: options.prevLabel || "上一页",
                disabled: options.page === 0,
                page: options.page - 1
            }];
            let pageSize = parseInt((options.count + options.limit - 1) / options.limit);
            for (let i = 0; i < pageSize; i++) {
                if (i > 3) {
                    if (options.page - i > 3) {
                        continue;
                    } else if (options.page - i === 3) {
                        json.push({name: "..."});
                        continue;
                    }
                }
                if (i < pageSize - 3) {
                    if (i - options.page > 3) {
                        continue;
                    } else if (i - options.page === 3) {
                        json.push({name: "..."});
                        continue;
                    }
                }
                json.push({
                    name: "" + (i + 1),
                    active: i === options.page,
                    page: i
                })
            }
            json.push({
                name: options.nextLabel || "下一页",
                disabled: options.page === pageSize - 1,
                page: options.page + 1
            });

            let root = options.el&&document.querySelector(options.el) || document.querySelector("body");
            let nav = document.createElement("nav");
            root.appendChild(nav);
            let ul = document.createElement("ul");
            ul.className = "pagination";
            nav.appendChild(ul);

            for (let i = 0; i < json.length; i++) {
                let item = json[i];
                let li = document.createElement("li");
                let className = "page-item ";
                item.disabled && (className += "disabled ");
                item.active && (className += "active ");
                li.className = className;
                let a = document.createElement("a");
                a.className = "page-link";
                item.page !== undefined && a.setAttribute("href", options.link(item.page));
                a.innerHTML = item.name;
                li.appendChild(a);
                ul.appendChild(li)
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
        !('pagination' in _global) && (_global.pagination = plugin);
    }
}());
