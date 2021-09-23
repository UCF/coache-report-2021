/* View 117b: Dashboard of Theme Units */

$("document").ready(function() {

    $(".view117b").each(function() {
        tableChartCoreFixedLabel($(this));
        tableChartScroll($(this));
        tableChartHead($(this));
    });

});
