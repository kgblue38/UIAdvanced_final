define(["EventEmitter", "jquery"], function(EventEmitter, $) {
    function pagenav(selector, options) {
        this.ee = new EventEmitter();
        this.ele = $(selector);
        this.init();
    }

    pagenav.prototype.init = function() {
        this.ele.on("click", "a", $.proxy(this, "_movePageByNumber"));
        this.ele.on("click", ".left-single-arrow", $.proxy(this, "_movePageBySingleArrow"));
        this.ele.on("click", ".right-single-arrow", $.proxy(this, "_movePageBySingleArrow"));
    }

    pagenav.prototype._movePageByNumber = function(e) {
        $eTarget = $(e.target);
        var ajaxData = {
            "index": $eTarget.text(),
            "max": 3
        };
        var $li = $eTarget.closest("li");
        $li.addClass("selected");
        $li.siblings().removeClass("selected");

        var $selected = $(".selected");
        $(".left-single-arrow").removeClass("disabled");
        $(".right-single-arrow").removeClass("disabled");

        if ($selected.text() === "1") {
            $(".left-single-arrow").addClass("disabled");
        }
        if ($selected.text() === "5") {
            $(".right-single-arrow").addClass("disabled");
        }

        this.ee.emit("change", ajaxData);
    }

    pagenav.prototype._movePageBySingleArrow = function(e) {
        var $eTarget = $(e.target);
        var $selected = $(".selected");

        if ($eTarget.hasClass("disabled")) {
            return;
        }

        $selected.removeClass();
        if ($eTarget.text() === "<") {
            $selected.prev().addClass("selected");
        }
        if ($eTarget.text() === ">") {
            $selected.next().addClass("selected");
        }

        var ajaxData = {
            "index": $eTarget.text(),
            "max": 3
        };
        var $selected = $(".selected");
        $(".left-single-arrow").removeClass("disabled");
        $(".right-single-arrow").removeClass("disabled");

        if ($selected.text() === "1") {
            $(".left-single-arrow").addClass("disabled");
        }
        if ($selected.text() === "5") {
            $(".right-single-arrow").addClass("disabled");
        }
        
        this.ee.emit("change", ajaxData);
    }

    pagenav.prototype.on = function(eventName, fp) {
        this.ee.addListener(eventName, fp);
    }
    pagenav.prototype.off = function(eventName, fp) {
        this.ee.removeListener(eventName, fp);
    }
    
    return pagenav;
});