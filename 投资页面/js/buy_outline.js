$(function(){
	$( '.reserve .wrap980 .close' ).click(function(){
		$( '.reserve' ).css( 'display','none' );
	});
});

$(function(){
	var height = $( '.product_r' ).height();
	if( height > 280 ){
		$( '.product_r' ).addClass( 'shadow' );
	}
});