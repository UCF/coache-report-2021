/**
 * Created by noa139 on 7/9/2017.
 */

$(document).ready(function(){

    /* --- View109b Legend Interaction --- */

    $(".view109b").each(function() {

        // prelim
        $(this).find(".control.controlBlock").css({"display": "none", "position": "absolute"});

        // define
        // ..base
        var body = $(this).find(".body.bodyBlock");
        var control = $(this).find(".control.controlBlock");
        var tbar = $(this).find(".tbar.tbarBlock");
        // ..get tbar/control attributes
        var tbar_attrs = {
            "main": {
                "pos": tbar.position(),
                "height": tbar.height()},
            "control": {
                "pos": tbar.find(".link.control").position(),
                "height": tbar.find(".link.control").height(),
                "heightO": tbar.find(".link.control").outerHeight(),
                "widthO": tbar.find(".link.control").outerWidth()}};
        var control_attrs = {
            "widthO": control.outerWidth()};
        // test
        console.log(tbar_attrs.main.pos.top, tbar_attrs.main.heightO, tbar_attrs.control.heightO);

        // action
        // ..on click tbar-control
        tbar.find(".link.control").on('click', function () {
            // re-get tbar/control attributes
            tbar_attrs.main.pos = tbar.position();
            tbar_attrs.main.height =  tbar.height();
            tbar_attrs.control.pos = tbar.find(".link.control").position();
            tbar_attrs.control.height = tbar.find(".link.control").height();
            tbar_attrs.control.heightO = tbar.find(".link.control").outerHeight();
            tbar_attrs.control.widthO = tbar.find(".link.control").outerWidth();
            control_attrs.widthO = control.outerWidth();
            // ..set control attributes
            var controlPosTop = tbar_attrs.main.pos.top + tbar_attrs.control.pos.top + tbar_attrs.control.height;
            var controlPosLeft = (tbar_attrs.control.pos.left + tbar_attrs.control.widthO) - control_attrs.widthO;
            // ..change
            if (control.is(":hidden")) {
                control.css({"display": "block", "top": controlPosTop, "left": controlPosLeft, "z-index": "1001"});
                $(this).find("span > b").html("X");
            } else {
                control.css({"display": "none"});
                $(this).find("span > b").html("&dArr;");
            }
            // test
            //console.log(controlPosTop);
        });
        // ..on window resize
        $(window).resize(function() {
            // re-get tbar/control attributes
            tbar_attrs.main.pos = tbar.position();
            tbar_attrs.main.height =  tbar.height();
            tbar_attrs.control.pos = tbar.find(".link.control").position();
            tbar_attrs.control.height = tbar.find(".link.control").height();
            tbar_attrs.control.heightO = tbar.find(".link.control").outerHeight();
            tbar_attrs.control.widthO = tbar.find(".link.control").outerWidth();
            control_attrs.widthO = control.outerWidth();
            // re-set control attributes
            var controlPosTop = tbar_attrs.main.pos.top + tbar_attrs.control.pos.top + tbar_attrs.control.height;
            var controlPosLeft = (tbar_attrs.control.pos.left + tbar_attrs.control.widthO) - control_attrs.widthO;
            // change control position
            control.css({"top": controlPosTop, "left": controlPosLeft});
            // test
            console.log(tbar_attrs.control.pos);
        });

        // ..on change control checkall checkbox
        control.find(".checkall input").change(function(){
            if (this.checked) {
                // check all; display all responses
                control.find("ul input").prop('checked', true);
                body.find(".chart.chartCore .list ul li").css('display', 'block');
            } else {
                // uncheck all; hide all responses
                control.find("ul input").prop('checked', false);
                body.find(".chart.chartCore .list ul li").css('display', 'none');
            }
        });
        // ..on change control other checkboxes
        control.find("ul li input").change(function(){
            // Legend: Get value of ao_code attr of parent (a list)
            var ao_code = $(this).parent('li.ao').attr('ao_code');
            // Conditional
            if (this.checked) {
                // display response
                body.find(".chart.chartCore .list ul li." + ao_code).css('display', 'block');
            } else {
                // hide response
                body.find(".chart.chartCore .list ul li." + ao_code).css('display', 'none');
            }
        });

        // test
        //console.log(controlPosTop);

    });

});
