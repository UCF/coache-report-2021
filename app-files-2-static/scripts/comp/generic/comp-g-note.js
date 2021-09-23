/* Guide Note */

$(document).ready(function(){

	$('a.modal.note').click(function() {
		// ..Locate note component
		let note_id = $(this).attr('data-note-id');
		let note_comp_class = `div.comp-g-note-${note_id}`;
		let note_comp = $(note_comp_class).clone();
		// ..Insert note component in modal and display it
		$('#modal div.content > div.body').append(note_comp);
		$(`#modal div.content > div.body ${note_comp_class}`).css('display', 'block');
	});

	// ..
  $('#modal .close').click(function () {
      $('#modal div.comp-g-note').remove();
  });

});

