requirejs.config({
    baseUrl: "/Users/leedhcf92/jwp-workspace/webUI-workspace/UIAdvanced_final/js/",
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'handlebars': '../node_modules/handlebars/dist/handlebars.amd',
        'EventEmitter': '../bower_components/eventEmitter/EventEmitter',
    }    
});

require(["component", "ajax", "view"], function(pagenav, ajax, view) {
    ajax.getItems({index:1, max: 3}).done(view.renderItems);
    var pagenav = new pagenav(".center-block");
    pagenav.on("change", function(e){
        ajax.getItems(e).done(view.renderItems);
    });
});