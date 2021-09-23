/* Guide Video */

$(document).ready(function(){

	// ..
  const ratioVideoWidth = () => {
  	/* Make video iframe height half of width */
		// ...Get video comp
		const video_comp = $('div.comp-g-video');
		// ...Ratio the width
		if ((video_comp).is(':visible')) {
			let ratio = 2
			video_comp.find('iframe').height( $(video_comp).width() / ratio );
		}
	}

  // ..Ratio video width on-load and on-window-resize
	ratioVideoWidth()
	$(window).resize(function(){
		ratioVideoWidth()
	});

	// ..When opening modal for video
	$('a.modal.video').click(function() {
		// ..Locate video component
		let video_id = $(this).attr('data-video-id');
		let video_comp_class = `div.comp-g-video-${video_id}`;
		let video_comp = $(video_comp_class).clone();
		// ..Insert video component in modal and display it
		$('#modal div.content > div.body').append(video_comp);
		$(`#modal div.content > div.body ${video_comp_class}`).css('display', 'block');
	});

	// ..When closing modal video
  $('#modal .close').click(function () {
      $('#modal div.comp-g-video').remove();
  });

});

