/* View 104: Benchmarks by Divisions */


$(document).ready(function(){

    /* --- View104 Legend Interaction --- */

    $(".view104b").each(function() {
        // prelim
        $(this).find(".control.controlBlock").css({"display": "none", "position": "absolute"});
        // define
        // ..base
        let body = $(this).find(".body.bodyBlock");
        let control = $(this).find(".control.controlBlock");
        let tbar = $(this).find(".tbar.tbarBlock");
        // ..get tbar/control attributes
        let tbar_attrs = {
            "main": {
                "pos": tbar.position(),
                "heightO": tbar.outerHeight()},
            "control": {
                "pos": tbar.find(".link.control").position(),
                "widthO": tbar.find(".link.control").outerWidth()}};
        let control_attrs = {
            "widthO": control.outerWidth()};
        // action
        // ..on click tbar-control
        tbar.find(".link.control").on('click', function () {
            // re-get tbar/control attributes
            tbar_attrs.main.pos = tbar.position();
            tbar_attrs.main.heightO =  tbar.outerHeight();
            tbar_attrs.control.pos = tbar.find(".link.control").position();
            tbar_attrs.control.widthO = tbar.find(".link.control").outerWidth();
            control_attrs.widthO = control.outerWidth();
            // ..set control attributes
            let controlPosTop = tbar_attrs.main.pos.top + tbar_attrs.main.heightO;
            let controlPosLeft = (tbar_attrs.control.pos.left + tbar_attrs.control.widthO) - control_attrs.widthO;
            // ..change
            if (control.is(":hidden")) {
                control.css({
                    "display": "block", "top": controlPosTop,
                    "left": controlPosLeft, "z-index": "3"
                });
                $(this).find("a > b").html("&times;");
            } else {
                control.css({"display": "none"});
                $(this).find("a > b").html("&#9662;");
            }
        });
        // ..on window resize
        $(window).resize(function() {
            // re-get tbar/control attributes
            tbar_attrs.main.pos = tbar.position();
            tbar_attrs.main.heightO =  tbar.outerHeight();
            tbar_attrs.control.pos = tbar.find(".link.control").position();
            tbar_attrs.control.widthO = tbar.find(".link.control").outerWidth();
            control_attrs.widthO = control.outerWidth();
            // re-set control attributes
            let controlPosTop = tbar_attrs.main.pos.top + tbar_attrs.main.heightO;
            let controlPosLeft = (tbar_attrs.control.pos.left + tbar_attrs.control.widthO) - control_attrs.widthO;
            // change control position
            control.css({"top": controlPosTop, "left": controlPosLeft});
        });

        // ..on change control checkall checkbox
        control.find(".checkall input").change(function(){
            if (this.checked) {
                // check all
                control.find(".divn input").prop('checked', true);
                body.find(".chart.chartCore .values .divn")
                  .css({'opacity': 1, 'font-weight': 100});
            } else {
                // uncheck all
                control.find(".divn input").prop('checked', false);
                body.find(".chart.chartCore .values .divn")
                  .css('opacity', 0.2);
            }
        });
        // ..on change control divn checkbox
        control.find(".divn input").change(function(){
            // Legend: Get value of data-divn-id attr of parent divn
            let divn_name = $(this).parent('.divn').attr('data-divn-id');
            // Conditional
            if (this.checked) {
                // highlight
                body.find(".chart.chartCore .values span[data-divn-id='" + divn_name + "']")
                  .css({'opacity': 1, 'font-weight': 'bold'});
            } else {
                // dim
                body.find(".chart.chartCore .values span[data-divn-id='" + divn_name + "']")
                  .css('opacity', 0.2);
            }
        });

    });

});
