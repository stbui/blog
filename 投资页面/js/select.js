$(function(){
	$( '.rev .sel' ).click(function(){
		$( '.rev ul' ).css( 'display','none' );
		$( this ).siblings( 'ul' ).css( 'display','block' );
		return false;
	});
	$( document ).click(function(){
		$( '.rev ul' ).css( 'display','none' );
	});
	$( '.rev ul li' ).click(function(){
		var text = $( this ).html();
		$( this ).parent().siblings( '.sel' ).html( text );
		$( this ).parent().siblings( '.sel' ).css( 'color','#333' );
		$( this ).parent( 'ul' ).css( 'display','none' );
	});
});