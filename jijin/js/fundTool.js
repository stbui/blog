$(function() {
	var fundTypeItem = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]

	$('.card').on('click', '.card-item', function() {
		var self = $(this);

		var step = getQueryStringByName('type') || 0;
		var index = self.index();

		if (fundTypeItem[step][index] == 0) {
			fundTypeItem[step][index] = 1;
			self.find('.icon-select').css('backgroundImage', 'url(img/icon_select.png)');
		} else {
			fundTypeItem[step][index] = 0;
			self.find('.icon-select').css('backgroundImage', 'url(img/icon_unselect.png)');
		}
	});



	$('#next').click(function() {
		var step = getQueryStringByName('type');

		if (step == 0 || step == '') {
			fundType(1);

		} else if (step == 1) {
			fundType(2);
		} else if (step == 2) {
			fundType(3);
		} else if (step == 3) {
			// finish
		} else {
			console.log('这是个意外');
		}
	});

	$('#back').click(function(e) {
		e.preventDefault();

		var step = getQueryStringByName('type');

		if (step == 0) {
			fundType(0);
		} else if (step == 1) {
			fundType(0);
		} else if (step == 2) {
			fundType(1);
		} else if (step == 3) {
			fundType(2);
		} 
	});

	$('#jump').click(function(){
		// 跳过操作
	});

	function fundType(index) {
		window.location.hash = 'type='+index;

		var foundType = $('.card');
		foundType.hide();
		foundType[index].style.display = 'block';

		// title 
		fundTypeTitle(index);

		isShowBack(index);
	}

	function fundTypeTitle(index){
		var text = ['<h1 class="page-title-24">选择您的风险偏好</h1>我们会根据您的风险偏好为您推荐基金<br>请谨记：风险与收入成正比',
			'<h1 class="page-title-24">选择晨星评级</h1>国家权威评级结构，为投资者提供专业的基金评级数据，您可以选择评级较高的基金',
			'<h1 class="page-title-24">选择基金主题</h1>紧跟实时热点，跟着新闻联播买基金',
			'<h1 class="page-title-24">选择基金主风格</h1>代表不同基金经理投资风格及策略，选择最适合您的那一款'
			]
			$('.page-title').html(text[index]);
	}

	function isShowBack(state){
		// 显示上一步
		if(state == 0) {
			$('#back').css('visibility','hidden');
		} else {
			$('#back').css('visibility','visible');
		}
		
	}

	function getQueryStringByName(name) {
		var url = location.href;
		var search = "#" + url.split("#")[1];
		var result = search.match(new RegExp("[\?\&\#]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return "";
		}
		return result[1];
	}

	// 若在选择基金流程中刷新页面，记录没有被临时保存
	var refresPage = getQueryStringByName('type') || 0;
	if(refresPage !=0) {
		fundType(refresPage);
	}

});