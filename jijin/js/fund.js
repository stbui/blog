$(function(){
	$( '.list .type li' ).mouseover(function(){
		var index = $( this ).index();
			
		$( '.underline' ).stop().animate({'left':index*128},400);
		
	});
});