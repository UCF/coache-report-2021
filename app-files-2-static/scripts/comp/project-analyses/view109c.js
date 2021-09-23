/* View 109: How to Improve - In Text */


$(document).ready(function(){

    /* --- View109c Legend Interaction --- */

    $(".view109c").each(function() {

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
                "height": tbar.height()},
            "control": {
                "pos": tbar.find(".link.control").position(),
                "height": tbar.find(".link.control").height(),
                "heightO": tbar.find(".link.control").outerHeight(),
                "widthO": tbar.find(".link.control").outerWidth()}};
        let control_attrs = {
            "widthO": control.outerWidth()};

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
            let controlPosTop = tbar_attrs.main.pos.top + tbar_attrs.control.pos.top + tbar_attrs.control.height;
            let controlPosLeft = (tbar_attrs.control.pos.left + tbar_attrs.control.widthO) - control_attrs.widthO;
            // ..change
            if (control.is(":hidden")) {
                control.css({"display": "block", "top": controlPosTop, "left": controlPosLeft, "z-index": "1"});
                $(this).find("a > b").html("&times;");
            } else {
                control.css({"display": "none"});
                $(this).find("a > b").html("&#9662;");
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
            let controlPosTop = tbar_attrs.main.pos.top + tbar_attrs.control.pos.top + tbar_attrs.control.height;
            let controlPosLeft = (tbar_attrs.control.pos.left + tbar_attrs.control.widthO) - control_attrs.widthO;
            // change control position
            control.css({"top": controlPosTop, "left": controlPosLeft});
            // test
            //console.log(tbar_attrs.control.pos);
        });
        // ..on change radio-buttons
        control.find("input[type=radio][name=label]").change(function(){
            if (this.value === 'ao_all') {
                body.find(".chart.chartCore .list ul li").css('display', 'block');
            } else {
							  body.find(".chart.chartCore .list ul li").css('display', 'none');
                body.find(".chart.chartCore .list ul li." + this.value).css('display', 'block');
            }
            // test
					  //console.log(this.value);
        });


    });

});
