/* Dashboard of Benchmarks */

$("document").ready(function() {

    $(".view101b").each(function() {
        tableChartCoreFixedLabel($(this));
        tableChartScroll($(this));
        tableChartHead($(this));
    });

});
