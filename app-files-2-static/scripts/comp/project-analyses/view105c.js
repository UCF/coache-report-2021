/* View 105: [Best/Worst] Aspects Numbers */


$("document").ready(function() {

    $(".view105c").each(function() {
        tableChartCoreFixedLabel($(this));
        tableChartExport($(this));
        tableChartScroll($(this));
        tableChartHead($(this));
    });

});
