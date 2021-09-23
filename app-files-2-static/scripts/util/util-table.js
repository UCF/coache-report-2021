/* Utils for Tabular Viz */


/* --- Helpers --- */

// ..Merge Two CSVs
function mergeTwoCSVs(csv1, csv2) {
    csv = csv1 + csv2;
    return csv;
}

// ..Convert table to CSV v2
function convertTableToCSV(table) {
    let csv = '';
    // for each row
    $(table).find("tr").each(function() {
        // instantiate row line
        let tr_line = '';
        // for each cell
        $(this).find("td").each(function() {
            // get colspan and set cell value depending on colspan
            let colspan;
            let td_val;
            td_val = $($(this).find("div > span")).text();
            td_val = td_val.replace('"', '""').replace('"', '""');
            td_val = '"' + td_val + '"';
            if ($(this).is("[colspan]") && $(this).attr("colspan") > 1) {
                colspan = parseInt($(this).attr("colspan")); //int
                td_val = td_val + ',' + '"--",'.repeat(colspan-1);
            } else {
                colspan = 1;
                td_val = td_val + ',';
            }
            // add cell value to row line
            tr_line += td_val;
        });
        // strip last ',' from row line ..add new line
        tr_line = tr_line.slice(0, -1) + '\n';
        // add line to csv
        csv += tr_line;
    });
    // return
    return csv;
}


/* --- Actions --- */

// ..Chart-Core Fixed-Label
function tableChartCoreFixedLabel(block) {
    let results = $(block).find(".body > .chart.chartCore > .results");
    let resultsTable2 = $(results).find("table.data").clone();
    // get content for fixed label
    $(resultsTable2).find("tr td").remove(".value");
    // create fixed label and add content
    $(results).after("<div class='fixedLabel'></div>");
    $(block).find(".body > .chart.chartCore > .fixedLabel").append(resultsTable2);
}

// ..Chart-Scroll
function tableChartScroll(block) {
    let chartCore = $(block).find(".body > .chart.chartCore");
    // setup
    // ..create structure
    $(chartCore).before("" +
        "<div class='chart chartScroll'>" +
            "<div class='results'>" +
                "<table class='data'></table>" +
            "</div>" +
        "</div>");
    // ..
    let chartScroll = $(block).find(".body > .chart.chartScroll");
    $(chartScroll).find(".results > .data").css({
        "width": $(chartCore).find(".results > table.data").width(), "height": "0.2em"});
    // activate
    // ..when chart scroll scrolls
    $(chartScroll).find(".results").on('scroll', function(){
        $(chartCore).find(".results").scrollLeft($(chartScroll).find(".results").scrollLeft());
    });
    // ..when chart core scrolls
    $(chartCore).find(".results").on('scroll', function() {
        $(chartScroll).find(".results").scrollLeft($(chartCore).find(".results").scrollLeft());
    });
}

// ..Chart-Head
function tableChartHead(block) {
    let chartCore = $(block).find(".body > .chart.chartCore");
    let resultsTableHead = $(chartCore).find(".results > table.data tr.head").clone();
    let resultsTableHeadLabel = $(resultsTableHead).clone();
    $(resultsTableHeadLabel).find("td").remove(".value");
    // setup
    // ..create structure
    $(chartCore).before("" +
        "<div class='chart chartHead'>" +
            "<div class='results'>" +
                "<table class='data'></table>" +
            "</div><!-- End .results -->" +
            "<div class='fixedLabel'>" +
                "<table class='data'></table>" +
            "</div><!-- End .fixedLabel -->" +
        "</div><!-- End .chart.chartHead -->");
    // ..
    let chartHead = $(block).find(".body > .chart.chartHead");
    $(chartHead).find(".results > table.data").html(resultsTableHead);
    $(chartHead).find(".fixedLabel > table.data").html(resultsTableHeadLabel);
    // activate
    // .. on window scroll
    $(window).on("scroll", function(){
        // ..
        let scrollTop = $(window).scrollTop();
        let chartCoreTop = $(chartCore).offset().top;
        let magicNum1 = scrollTop-chartCoreTop;
        // ..
        let chartCoreBottom = $(chartCore).offset().top + $(chartCore).outerHeight();
        let chartHeadHeight = $(chartHead).outerHeight();
        let magicNum2 = scrollTop-chartCoreBottom+chartHeadHeight;
        // ..get height of preceding siblings; refined magic number
        let heightOfDiv1 = $(block).find(".body > .chartExport").height() || 0;
        let heightOfDiv2 = $(block).find(".body > .chartScroll").height() || 0;
        let magicNumRef = magicNum1 + heightOfDiv1 + heightOfDiv2 + 'px'; // magic num refined
        // ..
        if (magicNum1 > 0 && magicNum2 < 0) { // show
            $(chartHead).css({
                "top":magicNumRef, "z-index":"1", "background":"#ffffff", "display": "block",
                "box-shadow": "0 3px 2px #ddd",
            });
        } else if (magicNum1 < 0 || magicNum2 > 0) { // hide
            $(chartHead).css({
                "z-index":"-1", "background":"none", "box-shadow": "none", "display": "none",
            });
        }
    });
    // ..on chart-head scroll
    $(chartHead).find(".results").on('scroll', function(){
        $(chartCore).find(".results").scrollLeft($(chartHead).find(".results").scrollLeft());
    });
    // ..on chart-core scroll
    $(chartCore).find(".results").on('scroll', function(){
        $(chartHead).find(".results").scrollLeft($(chartCore).find(".results").scrollLeft());
    });
}

// ..Chart-Export
function tableChartExport(block) {
    // setup
    // ..create chart-export structure
    $(block).children(".body").prepend(
        "<div class='chart chartExport'>" +
            "<a class=''>Download Table</a>" +
        "</div>");
    let chartExport = $(block).find(".body > .chartExport");
    // ..get table data; convert to CSV
    let chartCore = $(block).find('.body > .chartCore');
    let tableData = $(chartCore).find('.results > table.data');
    let csv = convertTableToCSV(tableData); //'him, her\n';
    // ..add data to chart-export
    csv = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    $(chartExport).find("a").attr("href", csv).attr("download", "table.csv");
}