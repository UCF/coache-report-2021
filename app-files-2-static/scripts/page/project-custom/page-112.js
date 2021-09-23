/* Project - Custom - Closed-Ended Responses */


$("document").ready(function() {

    /* --- View 121 Body: Open "please specify" comments (i.e. view123) --- */
    $("#view121b").find(".open").click(function(){
        var item_id = $(this).attr("item_id");
        // display view123
        $("#view123").find(".control .control4Items input[value=" + item_id + "]").prop("checked", true);
        $("#view123").find(".body .resps").css('display', 'none');
        $("#view123").find(".body .resps." + item_id).css('display', 'block');
        // $("#view123").dialog("open");
    });

    // /* --- View 123 --- */
    // $("#view123").dialog({
    //     autoOpen : false, modal : true,
    //     show : "blind", hide : "blind",
    //     width: 500, maxWidth: 800, height: 500
    // });

    /* --- View 123 Head --- */
    $("#view123").find(".head .buttons .print").click(function(){
        var item_id = $("#view123").find(".control .control4Items input[name='item_ts']:checked").val();
        var win = window.open("", "", "width=800,height=800");
        var html = $("#view123").find(".body .resps." + item_id).html();
        $(win.document.body).html(html);
    });

    /* --- View  123 Control --- */
    $("#view123").find(".control .control4Items input[name='item_ts']").change(function(){
        var item_id = $(this).val();
        $("#view123").find(".body .resps").css('display', 'none');
        $("#view123").find(".body .resps." + item_id).css('display', 'block');
    });
    // // UI
    // $("#view123").find(".control .control4Items input[name='item_ts']").checkboxradio({
    //     icon: false
    // });
    // $("#view123").find(".control .control4Items .controlgroup").controlgroup({
    //     direction: "vertical"
    // });

});
