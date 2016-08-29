window.onload=function(){
	//自适应改变fontSize;
    (function(win,doc){
        function change(){
            doc.documentElement.style.fontSize=doc.documentElement.clientWidth/16+'px';
        }
        change();
        win.addEventListener('resize',change,false);
    })(window,document);
	//adv轮播
	(function(){
		var mySwiper = new Swiper('.swiper-container',{
			loop: true,
			autoplay: 1000,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
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