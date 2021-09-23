/* View 121: Custom Questions Closed-Ended */

$("document").ready(function() {

    $(".view121b").each(function() {
        tableChartCoreFixedLabel($(this));
        tableChartExport($(this));
        tableChartScroll($(this));
        tableChartHead($(this));
    });

});

