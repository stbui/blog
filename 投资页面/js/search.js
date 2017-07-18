$(function(){
	$( '.tab li' ).mouseover(function(){
		$( this ).addClass( 'act' ).siblings().removeClass( 'act' );
	});
});