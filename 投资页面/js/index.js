$(function(){
	var num = 0;
	var timer = null;

	$( '.dot li' ).click(function(){
		var index = $( this ).index();
		num = index;

		if( !$( '.banner li' ).is( ':animated' ) ){
			$( this ).addClass( 'act' ).siblings().removeClass( 'act' );
			$( '.banner li' ).eq(num).fadeIn(700).siblings().fadeOut(700);
		}
	});

	function autoplay(){
		num ++;
		
		if( num > $( '.banner li' ).length - 1 ){
			num = 0;
		}

		$( '.banner li' ).eq( num ).fadeIn( 700 ).siblings().fadeOut( 700 );
		$( '.dot li' ).eq( num ).addClass( 'act' ).siblings().removeClass( 'act' );
	}

	timer = setInterval( autoplay,3000 );

	$( '.search' ).mouseover(function(){
		clearInterval( timer );
	}).mouseout(function(){
		timer = setInterval( autoplay,3000 );
	});
});


$(function(){
	$( '.gold .side ul li' ).click(function(){
		$( this ).addClass( 'cur' ).siblings().removeClass( 'cur' );
		var index = $( this ).index();
		$( '.gold_main .main_r ul' ).eq(index).css( 'display','block' ).siblings().css( 'display','none' );
	});
});


$(function(){
	$( '.fs_main .tab li' ).mouseover(function(){
		var index = $( this ).index();
		$( this ).addClass( 'now' ).siblings().removeClass( 'now' );
		$( '.step > li' ).eq(index).css( 'display','block' ).siblings().css( 'display','none' );
	});
})