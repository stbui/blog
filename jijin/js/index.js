$(function(){
	$( '.text input' ).focus(function(){
		$( this ).css( 'border','1px solid #f60' );
	}).blur(function(){
		$( this ).css( 'border','1px solid #dcdcdc' );
	}); 
});




$(function(){
	$( '.choice li' ).mouseover(function(){
		// if( !$( '.choice li' ).is( ':animated' ) ){
			var index = $( this ).index();

			$( this ).stop().animate({'top':0},300,function(){
				$( '.introduction li' ).eq(index).fadeIn(400).siblings().fadeOut(400);
				$( '.list ul' ).eq(index).fadeIn(400).siblings().fadeOut(400);
			}).siblings().stop().animate({'top':20},300);
		// }
	});
});