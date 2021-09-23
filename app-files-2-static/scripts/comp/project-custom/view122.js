/* View 122: Custom Questions Open-Ended Responses */


$("document").ready(function() {

  /* Control: Filter display */
  // ..
  let view122 = $('div.view122');
  // ..Hide responses
  view122.find('div.body div.resps').css({'display': 'none'});
  // ..Display on radio check
  view122.find('div.control input').change(function () {
    if ( $(this).is(':checked') ) {
      // ..suppress all
      view122.find('div.control label').css({'font-weight': '100'});
      view122.find('div.body div.resps').css({'display': 'none'});
      // ..display target
      $(this).siblings('label').css({'font-weight': '700'});
      view122.find(`div.body div.resps.${$(this).val()}`).css({'display': 'block'});
    }
  });

});
