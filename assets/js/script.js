document.addEventListener("DOMContentLoaded", function () {
	var $videoElems = $('video');
 	var videos = {};
 	var loaded = [];
 	$videoElems.each(function(i, elem) {
 		var $video = Popcorn(elem);
 		var id = $(elem).attr('id');
 		videos[id] = $video;
		$video.on('canplaythrough', function() {
			loaded.push(id);
			if(loaded.length == $videoElems.length) {
				var activeId = $videoElems.filter('.active').attr('id');
				var $activeVideo = videos[activeId];
				$activeVideo.play();
			}
		});

 		$(elem).on('click', function() {
 			var thisId = $(this).attr('id');
 			var $thisVideo = videos[thisId];
 			var activeId = $videoElems.filter('.active').attr('id');
			var $activeVideo = videos[activeId];
			var activeTime = $activeVideo.currentTime();
			$thisVideo.on('play', function() {
				this.currentTime(activeTime);
			});
			$thisVideo.play();
 		});

 		$video.load();
 	});
}, false);
