/**
 * GitHub: https://github.com/GitHub-Laziji
 * Author: Laziji
 * Date: 2018/12/4
 */

;(function () {

    class plugin {
        constructor() {
            this._iconMap = {
                "scrollTop": "angle-up",
                "image": "qrcode",
                "share": "smile-o"
            }
        }

        _newButton(opt) {
            let btn = document.createElement("button");
            this._bar.appendChild(btn);
            btn.className = opt.class || this._options.buttonClass || "btn btn-outline-success";
            btn.className += " mt-2";
            opt.title && btn.setAttribute("title", opt.title);
            let icon = document.createElement("i");
            btn.appendChild(icon);
            icon.className = "fa fa-" + (opt.icon || this._iconMap[opt.type])
            return btn;
        }

        _buttonGenerator(opt) {
            if (!opt || !opt.type) {
                return;
            }
            switch (opt.type) {
                case "scrollTop": {
                    let btn = this._newButton(opt);
                    btn.onclick = () => {
                        let element = opt.selector && document.querySelector(opt.selector) || window;
                        let param = opt.selector && 'scrollTop' || 'scrollY';
                        const scrollHeight = element[param];
                        const scrollStep = Math.PI / ((opt.scrollDuration || 500) / 15);
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
                        }, 15);
                        return;
                    }
                }
                case "image": {
                    if (!opt.imageUrl) {
                        return;
                    }
                    let btn = this._newButton(opt);
                    $(btn).popover({
                        trigger: "hover",
                        placement: "left",
                        boundary: "viewport",
                        html: true,
                        title: opt.title,
                        content: `<img class="${opt.imageClass || ""}" src="${opt.imageUrl}">`,
                    });
                    opt.title && btn.setAttribute("title", opt.title);
                    return;
                }
                case "share": {
                    let btn = this._newButton(opt);
                    let shareContent = opt.shareContent || $("meta[name='description']").attr("content") || "";
                    let urlOpt = {
                        url: "http://service.weibo.com/share/share.php",
                        query: {
                            title: `${opt.shareTitle || document.title}\n${shareContent}`,
                            pic: opt.shareImageUrl || "",
                            url: opt.shareUrl || location.href,
                            appkey: opt.shareUrl || location.href
                        }
                    };
                    let url = `${urlOpt.url}?${Object.keys(urlOpt.query).map(k => `${k}=${encodeURIComponent(urlOpt.query[k])}`).join("&")}`;
                    btn.onclick = () => {
                        open(url, '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
                    };
                    return;
                }
            }
        }

        create(options) {
            /*
            {
              rootClass: ,
              buttonClass: ,
              buttons: []
            }
            */
            if (!options || !options.buttons) {
                return;
            }
            this._options = options;
            this._root = document.createElement("div");
            document.querySelector("body").appendChild(this._root);
            this._root.className = options.rootClass || "";
            this._bar = document.createElement("div");
            this._root.appendChild(this._bar);
            this._bar.className = "d-flex flex-column";
            this._bar.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
          `;
            for (let i in options.buttons) {
                let opt = options.buttons[i];
                this._buttonGenerator(opt);
            }
        }
    }


    if (typeof module !== "undefined" && module.exports) {
        module.exports = new plugin();
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return new plugin();
        });
    } else {
        !("ExBar" in window) && (window.ExBar = new plugin());
    }
}());
