$(function(){
	var page_width = 0;
	// num = $( '.page li' ).innerWidth();
	$( '.page li' ).each(function(i,item){
		page_width = page_width + $( '.page li' ).eq(i).outerWidth(true);
	});
	$( '.page' ).css( 'width',page_width );
});

$(function(){
	$( '.count dt' ).mouseenter(function(){
		var count = $('<p class="formula_n">收益计算公式</p>');
		$( this ).append(count);
	}).mouseleave(function(){
		$( '.formula_n' ).remove();
	});
});