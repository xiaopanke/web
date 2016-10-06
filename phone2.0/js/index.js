window.onload=function(){
	window.addEventListener('resize',change,false);
	//adv轮播
	(function(){
		var mySwiper = new Swiper('.swiper-container',{
			loop: true,
			autoplay: 1000,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
		  });	
	})();
	(function(){
		var mySwiper = new Swiper('.swiper-container2',{
			loop: true,
			autoplay: 1000,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
			pagination : '.swiper-pagination',
			paginationClickable: true,
  paginationBulletRender: function (index, className) {
      return '<span class="' + className + '"><img src="./img/man_btn'+(index + 1)+'.png" /></span>';
  }
		  });	
	})();
	/*tab*/
	(function(){
		var oTab=document.getElementById('tab');
		var aBtn=oTab.getElementsByTagName('span');
		var aP=oTab.getElementsByTagName('p');
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].index=i;
			aBtn[i].onclick=function(){
				for(var i=0;i<aBtn.length;i++){
					aBtn[i].className='';	
					aP[i].className='';
				}
				this.className='cur';
				aP[this.index].className='show';	
			}	
		}
		
	})();

};
