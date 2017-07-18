$(function(){
	$( '.type li' ).click(function(){
		var color = $( this ).attr( 'value' );
		var index = $( this ).index();
		$( this ).addClass( 'act' ).siblings().removeClass( 'act' );
		$( this ).parent( 'ul' ).css( 'border-color',color );
		$( '.list .c_color' ).eq(index).css( 'display','block' ).siblings().css( 'display','none' );
	});
});