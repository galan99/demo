(function (window, document) {
    window.leDouSdK = window.leDouSdK || {
        leDouGsdUrl: "*",
        getParentUrl: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.parent.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        },
        formatParams: function (data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return arr.join('&');
        },
        login: function () {
            parent.window.postMessage({
                type: 'login'
            }, this.leDouGsdUrl);
        },
        pay: function (json) {
            if (!json['product_id']) {
                alert('缺少道具id！')
                return false;
            }
            if (!json['open_id']) {
                alert('缺少open_id！')
                return false;
            }
            parent.window.postMessage({
                type: 'pay',
                data: json
            }, this.leDouGsdUrl);
        },
        payCallback: function(callback) {
            window.addEventListener("message", function(e) {
                var n = e.data;
                switch (n.event) {
                    case "onPay":
                        callback && callback(n.data)
                    break;
                }
            }, false)
        }
    }
})(window, document);