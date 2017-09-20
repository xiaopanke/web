//by blue@ZNS	2016-11-3

function addTouch(obj, json)
{
	if(!addTouch.idList)addTouch.idList=[];
	var id=0;
	var ret={};
	if(!json)json={};

	if(json.click)obj.onclick=json.click;

	//手机
	(function (){
		myAddEvent(obj, 'touchstart', fnStart);
		function fnStart(ev)
		{
			if(json.down)json.down(ev.touches[0].pageX, ev.touches[0].pageY);

			for(var i=0;i<ev.touches.length;i++)
			{
				if(-1==addTouch.idList.indexOf(ev.touches[i].identifier))id=ev.touches[i].identifier;
			}
			addTouch.idList.push(id);

//			document.getElementById('debug').innerHTML+=id+' start<br/>';

			myAddEvent(document, 'touchmove', fnMove);
			function fnMove(ev)
			{
				for(var i=0;i<ev.touches.length;i++)
				{
					if(ev.touches[i].identifier==id)
					{
						var touch=ev.touches[i];

						if(json.move)json.move(ev.touches[0].pageX, ev.touches[0].pageY);
						return;
					}
				}
			}
			myAddEvent(document, 'touchend', fnEnd);
			function fnEnd(ev)
			{
				for(var i=0;i<ev.changedTouches.length;i++)
				{
//					document.getElementById('debug').innerHTML+=ev.changedTouches[i].identifier+' end<br/>';
					if(ev.changedTouches[i].identifier==id)
					{
						myDelEvent(document, 'touchmove', fnMove);
						myDelEvent(document, 'touchend', fnEnd);

						addTouch.idList.remove(id);

						if(json.up)json.up(ev.changedTouches[i].pageX, ev.changedTouches[i].pageY);
						return;
					}
				}
			}

			return false;
		}

		ret.start=fnStart;
	})();

	//PC
	(function (){
		myAddEvent(obj, 'mousedown', fnDown);
		function fnDown(ev)
		{
			var oEvent=ev||event;
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

			if(json.down)json.down(oEvent.clientX+scrollLeft, oEvent.clientY+scrollTop);

			myAddEvent(document, 'mousemove', fnMove);
			function fnMove(ev)
			{
				var oEvent=ev||event;
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

				if(json.move)json.move(oEvent.clientX+scrollLeft, oEvent.clientY+scrollTop);
			}
			myAddEvent(document, 'mouseup', fnUp);
			function fnUp(ev)
			{
				var oEvent=ev||event;
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

				myDelEvent(document, 'mousemove', fnMove);
				myDelEvent(document, 'mouseup', fnUp);
				document.onmouseup=null;

				if(json.up)json.up(oEvent.clientX+scrollLeft, oEvent.clientY+scrollTop);

				obj.releaseCapture&&obj.releaseCapture();
			}

			obj.setCapture&&obj.setCapture();

			if(ev.preventDefault)ev.preventDefault();
			return false;
		}

		ret.down=fnDown;
	})();

	ret.obj=obj;

	return ret;	//for remove Touch
}

function removeTouch(touchRes)
{
	if(!touchRes || !touchRes.start || !touchRes.down || !touchRes.obj)return;
	myDelEvent(touchRes.obj, 'touchstart', touchRes.start);
	myDelEvent(touchRes.obj, 'mousedown', touchRes.down);
}

function myAddEvent(obj, ev, fn){obj.attachEvent?obj.attachEvent('on'+ev, fn):obj.addEventListener(ev, fn, false);}
function myDelEvent(obj, ev, fn){obj.detachEvent?obj.detachEvent('on'+ev, fn):obj.removeEventListener(ev, fn, false);}/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexbox_legacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(k),g.offsetWidth,e=k.value!=l,g.removeChild(k)):e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.5.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e});var J=function(c,d){var f=c.join(""),g=d.length;y(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9,e.csstransforms3d=(j.csstransforms3d&&j.csstransforms3d.offsetLeft)===9&&j.csstransforms3d.offsetHeight===3,e.generatedcontent=(j.generatedcontent&&j.generatedcontent.offsetHeight)>=1,e.fontface=/src/i.test(h)&&h.indexOf(d.split(" ")[0])===0},g,d)}(['@font-face {font-family:"font";src:url("https://")}',["@media (",n.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",n.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join(""),['#generatedcontent:after{content:"',l,'";visibility:hidden}'].join("")],["fontface","touch","csstransforms3d","generatedcontent"]);s.flexbox=function(){return I("flexOrder")},s["flexbox-legacy"]=function(){return I("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){try{var d=b.createElement("canvas"),e;e=!(!a.WebGLRenderingContext||!d.getContext("experimental-webgl")&&!d.getContext("webgl")),d=c}catch(f){e=!1}return e},s.touch=function(){return e.touch},s.geolocation=function(){return!!navigator.geolocation},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b]+"WebSocket"])return!0;return"WebSocket"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&(a=e.csstransforms3d),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){return e.fontface},s.generatedcontent=function(){return e.generatedcontent},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)B(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),C(""),i=k=null,function(a,b){function g(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function h(){var a=k.elements;return typeof a=="string"?a.split(" "):a}function i(a){var b={},c=a.createElement,e=a.createDocumentFragment,f=e();a.createElement=function(a){var e=(b[a]||(b[a]=c(a))).cloneNode();return k.shivMethods&&e.canHaveChildren&&!d.test(a)?f.appendChild(e):e},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+h().join().replace(/\w+/g,function(a){return b[a]=c(a),f.createElement(a),'c("'+a+'")'})+");return n}")(k,f)}function j(a){var b;return a.documentShived?a:(k.shivCSS&&!e&&(b=!!g(a,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),f||(b=!i(a)),b&&(a.documentShived=b),a)}var c=a.html5||{},d=/^<|^(?:button|form|map|select|textarea)$/i,e,f;(function(){var a=b.createElement("a");a.innerHTML="<xyz></xyz>",e="hidden"in a,f=a.childNodes.length==1||function(){try{b.createElement("a")}catch(a){return!0}var c=b.createDocumentFragment();return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"}()})();var k={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:j};a.html5=k,j(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return o.call(a)=="[object Function]"}function e(a){return typeof a=="string"}function f(){}function g(a){return!a||a=="loaded"||a=="complete"||a=="uninitialized"}function h(){var a=p.shift();q=1,a?a.t?m(function(){(a.t=="c"?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){a!="img"&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l={},o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};y[c]===1&&(r=1,y[c]=[],l=b.createElement(a)),a=="object"?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),a!="img"&&(r||y[c]===2?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i(b=="c"?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),p.length==1&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&o.call(a.opera)=="[object Opera]",l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return o.call(a)=="[object Array]"},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,i){var j=b(a),l=j.autoCallback;j.url.split(".").pop().split("?").shift(),j.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]||h),j.instead?j.instead(a,e,f,g,i):(y[j.url]?j.noexec=!0:y[j.url]=1,f.load(j.url,j.forceCSS||!j.forceJS&&"css"==j.url.split(".").pop().split("?").shift()?"c":c,j.noexec,j.attrs,j.timeout),(d(e)||d(l))&&f.load(function(){k(),e&&e(j.origUrl,i,g),l&&l(j.origUrl,i,g),y[j.url]=2})))}function i(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var j,l,m=this.yepnope.loader;if(e(a))g(a,0,m,0);else if(w(a))for(j=0;j<a.length;j++)l=a[j],e(l)?g(l,0,m,0):w(l)?B(l):Object(l)===l&&i(l,m);else Object(a)===a&&i(a,m)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};﻿var zns=
{
	site:			//官网空间
	{
		fx: {},			//效果
		z:	{}			//后台接口
	},
	app:			//移动端空间
	{
		z:	{}			//后台接口
	}
};

if(window.location.host=='localhost')
	var _g_path='/project/zns/';
else
	var _g_path='/';

Array.prototype.indexOf=function (w)
{
	for(var i=0;i<this.length;i++)if(this[i]==w)return i;
	return -1;
};

Array.prototype.remove=function (w)
{
	var n=this.indexOf(w);
	if(n!=-1)this.splice(n,1);
};

Array.prototype.append=function (aAny)
{
	for(var i=0,len=aAny.length;i<len;i++)
		this.push(aAny[i]);

	return this;
};

window.console=window.console||{};
console.log=console.log||function (){};

function getPos(obj)
{
	var res={l: 0, t: 0};

	while(obj)
	{
		res.l+=obj.offsetLeft||0;
		res.t+=obj.offsetTop||0;

		obj=obj.offsetParent;
	}

	return res;
}

(function (){
	var bySys=false;

	bindEvent(window, 'scroll', function (){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

		if(!bySys)
		{
			zns.site.fx.stop(scrollTo);
		}
		bySys=false;
	});

	window.scrollTo=function (t)
	{
		if(t<0)
			t=0;
		else if(t>document.body.offsetHeight-document.documentElement.clientHeight)
			t=document.body.offsetHeight-document.documentElement.clientHeight;

		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		buffer(scrollTo, {t: scrollTop}, {t: t}, function (now){
			bySys=true;
			document.documentElement.scrollTop=document.body.scrollTop=now.t;
		});
	}
})();

function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

function setStyle(obj, json)
{
	if(obj.length)
		for(var i=0;i<obj.length;i++) setStyle(obj[i], json);
	else
	{
		if(arguments.length==2)	//json
			for(var i in json) setStyle(obj, i, json[i]);
		else	//name, value
		{
			switch(arguments[1].toLowerCase())
			{
				case 'opacity':
					obj.style.filter='alpha(opacity:'+arguments[2]+')';
					obj.style.opacity=arguments[2]/100;
					break;
				default:
					if(typeof arguments[2]=='number')
					{
						obj.style[arguments[1]]=arguments[2]+'px';
					}
					else
					{
						obj.style[arguments[1]]=arguments[2];
					}
					break;
			}
		}
	}
}

function _setStyle(now)
{
	setStyle(this, now);
}

function setStyle3(obj, name, value)
{
	obj.style['Webkit'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['Moz'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['ms'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['O'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style[name]=value;
}

function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	var aResult=[];

	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}

function addClass(obj, sClass)
{
	var re=new RegExp('\\b'+sClass+'\\b');

	if(re.test(obj.className))return;
	obj.className=(obj.className+' '+sClass).match(/\S+/g).join(' ');
}
function removeClass(obj, sClass)
{
	var re=new RegExp('\\b'+sClass+'\\b', 'g');

	obj.className=obj.className.replace(re, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}

function bindEvent(obj, ev, fn)
{
	obj.addEventListener?obj.addEventListener(ev, fn, false):obj.attachEvent('on'+ev, fn);
}
function unbindEvent(obj, ev, fn)
{
	obj.removeEventListener?obj.removeEventListener(ev, fn, false):obj.detachEvent('on'+ev, fn);
}

//cookie
function setCookie(name, value, iDay)
{
	if(iDay!==false)
	{
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);

		document.cookie=name+'='+value+';expires='+oDate+';path=/';
	}
	else
	{
		document.cookie=name+'='+value;
	}
}

function getCookie(name)
{
	var arr=document.cookie.split('; ');
	var i=0;

	for(i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');

		if(arr2[0]==name)
		{
			return arr2[1];
		}
	}

	return '';
}

function removeCookie(name)
{
	setCookie(name, 'a', -1);
}

function sprintf(format)
{
	var _arguments=arguments;

	return format.replace(/%\d+/g, function (str){
		return _arguments[parseInt(str.substring(1))];
	});
}

var onLoad=(function (){
	var loaded=false;
	var added=false;
	var arr=[];

	function init()
	{
		if(loaded)return;
		loaded=true;

		for(var i=0;i<arr.length;i++)
			arr[i]();

		arr=null;
	}

	return function (fn)
	{
		if(loaded)return fn();

		arr.push(fn);

		if(added)return;

		//开始加载
		//chrome
		if(document.addEventListener)document.addEventListener('DOMContentLoaded', init, false);
		else
		{
			document.attachEvent('onreadystatechange', function (){
				if(document.readyState=='complete')
				{
					init();
				}
			});
		}

		//其他连defer都不支持的
		window.onload=init;

		added=true;
	};
})();

function getEle(sExp, oParent)
{
	var aResult=[];
	var i=0;

	oParent || (oParent=document);

	if(oParent instanceof Array)
	{
		for(i=0;i<oParent.length;i++)aResult=aResult.concat(getEle(sExp, oParent[i]));
	}
	else if(typeof sExp=='object')
	{
		if(sExp instanceof Array)
		{
			return sExp;
		}
		else
		{
			return [sExp];
		}
	}
	else
	{
		//xxx, xxx, xxx
		if(/,/.test(sExp))
		{
			var arr=sExp.split(/,+/);
			for(i=0;i<arr.length;i++)aResult=aResult.concat(getEle(arr[i], oParent));
		}
		//xxx xxx xxx 或者 xxx>xxx>xxx
		else if(/[ >]/.test(sExp))
		{
			var aParent=[];
			var aChild=[];

			var arr=sExp.split(/[ >]+/);

			aChild=[oParent];

			for(i=0;i<arr.length;i++)
			{
				aParent=aChild;
				aChild=[];
				for(j=0;j<aParent.length;j++)
				{
					aChild=aChild.concat(getEle(arr[i], aParent[j]));
				}
			}

			aResult=aChild;
		}
		//#xxx .xxx xxx
		else
		{
			switch(sExp.charAt(0))
			{
				case '#':
					return [document.getElementById(sExp.substring(1))];
				case '.':
					return getByClass(oParent, sExp.substring(1));
				default:
					return [].append(oParent.getElementsByTagName(sExp));
			}
		}
	}

	return aResult;
}

function map(arr, fn)
{
	for(var i=0;i<arr.length;i++)
	{
		fn.call(arr[i], i);
	}
}

function rnd(n, m)
{
	return Math.random()*(m-n)+n;
}

//ajax、表单之类的
function json2url(json)
{
	var a=[];
	for(var i in json)
	{
		var v=json[i]+'';
		v=v.replace(/\n/g, '<br/>');
		v=encodeURIComponent(v);
		a.push(i+'='+v);
	}
	return a.join('&');
}

function ajax(url, opt)
{
	opt			=opt||{};
	opt.data	=opt.data||{};
	opt.data.t	=opt.data.t||new Date().getTime();
	opt.method	=opt.method||'get';

	var oAjax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

	if(opt.method=='post')
	{
		oAjax.open('POST', url, true);
		oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		try{
			oAjax.send(opt.data?json2url(opt.data):null);
		}catch(e){}
	}
	else
	{
		url+='?'+json2url(opt.data);
		oAjax.open('GET', url, true);
		try{
			oAjax.send();
		}catch(e){}
	}

	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				opt.fnSucc && opt.fnSucc(oAjax.responseText);
			}
			else
			{
				opt.fnFaild && opt.fnFaild(oAjax.status);
			}
		}
	};
}

/*
options:
succ:	function(json)
faild:	function(str, err)
check:	function(obj, name, value)
data:	额外的数据
*/
function postForm(oForm, options)
{
	if(!options)options={};

	oForm.onsubmit=function ()
	{
		var data={};
		var aEle=oForm.getElementsByTagName('*');

		for(var i=0;i<aEle.length;i++)
		{
			var name=aEle[i].name;
			var value=aEle[i].value;

			if(name)
			{
				if(aEle[i].type=='radio')
				{
					if(aEle[i].checked)
					{
						if(options.check && options.check(aEle[i], name, value)==false)return false;
						data[name]=value;
					}
				}
				else if(aEle[i].type!=undefined)
				{
					if(options.check && options.check(aEle[i], name, value)==false)return false;
					data[name]=value;
				}
			}
		}

		if(options.data)
		{
			for(var i in options.data)data[i]=options.data[i];
		}

		request(oForm.action, data, options.succ, options.faild);

		return false;
	};
}

function request(url, data, fnSucc, fnFaild)
{
	ajax(url, {
		data: data,
		fnSucc: function (str){
			//alert(str);
			//document.write(str);
			//document.getElementsByTagName('textarea')[0].value=str;
			try{
				str=str.replace(/\n/g, '');
				var json=eval('('+str+')');
			}
			catch(e)
			{
				fnFaild && fnFaild('parse error', -1);

				//alert('你懂的：'+str);
				var oDiv=document.getElementById('test_err_ndd');
				if(!oDiv)
				{
					oDiv=document.createElement('div');
					document.body.appendChild(oDiv);
					oDiv.style.display='none';
				}

				oDiv.innerHTML+=str;
				return;
			}

			if(json.error)
				fnFaild&&fnFaild(json.desc, json.error);
			else
				fnSucc&&fnSucc(json);
		},
		fnFaild: function (str){
			fnFaild&&fnFaild(str+'|'+url);
		}
	});
}

function time2date(t)
{
	function d(n){return n<10?'0'+n:''+n;}

	var oDate=new Date(t*1000);

	return oDate.getFullYear()+'-'+d(oDate.getMonth()+1)+'-'+d(oDate.getDate())+' '+d(oDate.getHours())+':'+d(oDate.getMinutes())+':'+d(oDate.getSeconds());
}

function time2day(t)
{
	function d(n){return n<10?'0'+n:''+n;}

	var oDate=new Date(t*1000);

	return oDate.getFullYear()+'-'+d(oDate.getMonth()+1)+'-'+d(oDate.getDate());
}

function preloadImgs(arr, fnSucc, fnFaild, fnProgress)
{
	var loaded=0;
	for(var i=0;i<arr.length;i++)
	{
		var oImg=new Image();

		oImg.onload=function ()
		{
			loaded++;

			fnProgress&&fnProgress(100*loaded/arr.length);

			if(loaded==arr.length)fnSucc&&fnSucc();

			this.onload=this.onerror=null;
			this.src='';
		};

		oImg.onerror=function ()
		{
			fnFaild&&fnFaild(this.src);

			fnFaild=fnSucc=fnProgress=null;
		};

		oImg.src=arr[i];
	}
}

//拖拽
function drag(objEv, objMove, fnMoveCallBack)
{
	var disX=0,disY=0;

	objEv.onmousedown=function (ev)
	{
		var oEvent=ev||event;
		disX=(document.documentElement.scrollLeft||document.body.scrollLeft)+oEvent.clientX-objMove.offsetLeft;
		disY=(document.documentElement.scrollTop||document.body.scrollTop)+oEvent.clientY-objMove.offsetTop;

		if(objEv.setCapture)
		{
			objEv.onmousemove=fnMove;
			objEv.onmouseup=fnUp;

			objEv.setCapture();
		}
		else
		{
			document.onmousemove=fnMove;
			document.onmouseup=fnUp;

			return false;
		}
	};

	function fnMove(ev)
	{
		var oEvent=ev||event;
		var l=(document.documentElement.scrollLeft||document.body.scrollLeft)+oEvent.clientX-disX;
		var t=(document.documentElement.scrollTop||document.body.scrollTop)+oEvent.clientY-disY;

		fnMoveCallBack(l,t);
	}

	function fnUp()
	{
		this.onmousemove=null;
		this.onmouseup=null;

		if(this.releaseCapture)this.releaseCapture();
	}
}

function mouseScroll(obj, fnCallBack)
{
	bindEvent(obj, 'mousewheel', fnScroll);
	bindEvent(obj, 'DOMMouseScroll', fnScroll);

	function fnScroll(ev)
	{
		var oEvent=ev||event;
		var bDown;

		if(oEvent.wheelDelta)
		{
			bDown=oEvent.wheelDelta<0;
		}
		else
		{
			bDown=oEvent.detail>0;
		}

		fnCallBack(bDown);

		if(oEvent.preventDefault)oEvent.preventDefault();
		return false;
	}
}

function format(str, json)
{
	str=str.replace(/{\w+}/g, function (str){
		var s=str.substring(1, str.length-1);

		return json[s];
	});

	return str;
}

//QQ咨询
(function (){
	zns.site.common=zns.site.common||{};

	zns.site.common.create=function ()
	{
		var buffer=zns.site.fx.buffer;
		var flex=zns.site.fx.flex;

		//微信弹出层
		var oDivWX=document.createElement('div');

		oDivWX.className='weixinShow';

		oDivWX.innerHTML=
			'<img src="'+_g_path+'images/weixin.jpg" alt="智能社官方微信"><span></span>'+
			'<a href="javascript:;" class="btn_close"></a>';

		document.body.appendChild(oDivWX);

		//点击弹出微信弹出层
		var time_wx=setInterval(function (){
			var oDivSlide=getEle('.newOnline')[0];
			if(!oDivSlide)return;

			var oBtn=getEle('.c_weixin', oDivSlide)[0];
			if(!oBtn)return;

			oBtn.onclick=function ()
			{
				oDivWX.style.display='block';

				oDivWX.style.top='-100%';
				flex(oDivWX, {top: -100}, {top: 0}, function (now){
					oDivWX.style.top=now.top+'%';
				}, null, 4, 0.6);
			};

			getEle('.btn_close', oDivWX)[0].onclick=function ()
			{
				buffer(oDivWX, {top: 0}, {top: 100}, function (now){
					oDivWX.style.top=now.top+'%';
				}, function (){
					oDivWX.style.display='none';
				});
			};
			clearInterval(time_wx);
		}, 10);

		//shadow_bg
		(function (){
			var oDiv=document.createElement('div');

			oDiv.className='shadow_bg';
			oDiv.innerHTML='<img src="'+_g_path+'images/login_layerBg.png" alt="" />';

			document.body.appendChild(oDiv);
		})();

		//gotoTop
		(function (){
			var oBtn=document.createElement('a');
			var alpha=0;

			oBtn.href='javascript:;';
			oBtn.className='gotoTop';

			oBtn.style.display='none';

			document.body.appendChild(oBtn);

			//滚动的时候出现
			function rePos()
			{
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

				oBtn.style.display='block';
				if(scrollTop)
				{
					buffer(oBtn, {opacity: alpha}, {opacity: 100}, function (now){
						alpha=now.opacity;

						this.style.filter='alpha(opacity:'+now.opacity+')';
						this.style.opacity=now.opacity/100;
					});
				}
				else
				{
					buffer(oBtn, {opacity: alpha}, {opacity: 0}, function (now){
						alpha=now.opacity;

						this.style.filter='alpha(opacity:'+now.opacity+')';
						this.style.opacity=now.opacity/100;
					}, function (){
						oBtn.style.display='none';
					});
				}
			}
			bindEvent(window, 'scroll', rePos);
			//bindEvent(window, 'resize', rePos);

			//点击回到顶部
			oBtn.onclick=function ()
			{
				zns_scroll_to(0);
			};
		})();
	};
})();

function zns_scroll_to(n, fnEnd)
{
	var timer=null;
	var bySys=true;

	bindEvent(window, 'scroll', fn);

	function fn()
	{
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

		if(!bySys)
		{
			clearInterval(timer);
			if(fnEnd)fnEnd(false);

			unbindEvent(window, 'scroll', fn);
		}
		bySys=false;
	}

	timer=setInterval(function (){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

		var speed=(n-scrollTop)/4;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);

		scrollTop+=speed;

		bySys=true;

		document.documentElement.scrollTop=scrollTop;
		document.body.scrollTop=scrollTop;

		if(scrollTop==n)
		{
			clearInterval(timer);
			if(fnEnd)fnEnd(true);
			unbindEvent(window, 'scroll', fn);
		}
	}, 30);
}

function alert_sm(msg, bOk, iShow, iHide)
{
	if(zns.site.fx.browser_test.IE6)
	{
		alert(msg);
		return;
	}

	var linear=zns.site.fx.linear;

	if(bOk==undefined)bOk=true;
	if(iShow==undefined)iShow=0;
	if(iHide==undefined)iHide=3500;

	var oDiv=document.createElement('div');

	oDiv.className='info';
	oDiv.innerHTML=
		'<div class="info_c">'+
			'<span class="'+(bOk?'correct':'error')+'"></span><em>'+msg+'</em>'+
		'</div>'+
		'<div class="info_r"></div>';

	document.body.appendChild(oDiv);

	if(navigator.userAgent.indexOf('MSIE 6')!=-1)
	{
		var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

		oDiv.style.display='block';
		oDiv.style.left=scrollLeft+(document.documentElement.clientWidth-oDiv.offsetWidth)/2+'px';
		oDiv.style.top=scrollTop+(document.documentElement.clientHeight-oDiv.offsetHeight)/2+'px';
		oDiv.style.display='none';
	}
	else
	{
		oDiv.style.display='block';
		oDiv.style.left=(document.documentElement.clientWidth-oDiv.offsetWidth)/2+'px';
		oDiv.style.top=(document.documentElement.clientHeight-oDiv.offsetHeight)/2+'px';
		oDiv.style.display='none';
	}

	setTimeout(function (){
		oDiv.style.filter='alpha(opacity:0)';
		oDiv.style.opacity='0';
		oDiv.style.display='block';

		linear(oDiv, {opacity:0}, {opacity:100}, function (now){
			oDiv.style.filter='alpha(opacity:'+now.opacity+')';
			oDiv.style.opacity=now.opacity/100;
		}, function (){
			setTimeout(function (){
				linear(oDiv, {opacity:100}, {opacity:0}, function (now){
					oDiv.style.filter='alpha(opacity:'+now.opacity+')';
					oDiv.style.opacity=now.opacity/100;
				}, function (){
					document.body.removeChild(oDiv);
				}, 10);
			}, iHide);
		}, 10);
	}, iShow);
}

//GET
var $_GET={};

(function (){
	var str=window.location.search.substring(1);
	var arr=str.split('&');

	for(var i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');

		$_GET[arr2[0]]=decodeURIComponent(arr2[1]);
	}
})();

(function (){
	//zhinengshe.com -> www.zhinengshe.com
	var sLocation=''+window.location;

	if(sLocation.indexOf('http://zhinengshe.com')==0)
	{
		window.location=sLocation.replace('http://zhinengshe.com', 'http://www.zhinengshe.com');
	}
})();







//摆动运动
zns.site.fx.swing=function (obj, cur, target, fnDo, fnEnd, acc)
{
	if(zns.site.fx.browser_test.IE6)
	{
		fnDo&&fnDo.call(obj, target);
		fnEnd&&fnEnd.call(obj, target);
		return;
	}
	if(!acc)acc=0.1;
	var now={};
	var x=0;	//0-100

	if(!obj.__swing_v)obj.__swing_v=0;

	if(!obj.__last_timer)obj.__last_timer=0;
	var t=new Date().getTime();
	if(t-obj.__last_timer>20)
	{
		fnMove();
		obj.__last_timer=t;
	}

	clearInterval(obj.timer);
	obj.timer=setInterval(fnMove, 20);

	function fnMove(){
		if(x<50)
		{
			obj.__swing_v+=acc;
		}
		else
		{
			obj.__swing_v-=acc;
		}

		//if(Math.abs(obj.__flex_v)>MAX_SPEED)obj.__flex_v=obj.__flex_v>0?MAX_SPEED:-MAX_SPEED;

		x+=obj.__swing_v;

		//alert(x+','+obj.__swing_v);

		for(var i in cur)
		{
			now[i]=(target[i]-cur[i])*x/100+cur[i];
		}


		if(fnDo)fnDo.call(obj, now);

		if(/*Math.abs(obj.__swing_v)<1 || */Math.abs(100-x)<1)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd.call(obj, target);
			obj.__swing_v=0;
		}
	}
};

//弹性运动
zns.site.fx.flex=function (obj, cur, target, fnDo, fnEnd, fs, ms)
{
	if(zns.site.fx.browser_test.IE6)
	{
		fnDo&&fnDo.call(obj, target);
		fnEnd&&fnEnd.call(obj, target);
		return;
	}
	var MAX_SPEED=16;

	if(!fs)fs=6;
	if(!ms)ms=0.75;
	var now={};
	var x=0;	//0-100

	if(!obj.__flex_v)obj.__flex_v=0;

	if(!obj.__last_timer)obj.__last_timer=0;
	var t=new Date().getTime();
	if(t-obj.__last_timer>20)
	{
		fnMove();
		obj.__last_timer=t;
	}

	clearInterval(obj.timer);
	obj.timer=setInterval(fnMove, 20);

	function fnMove(){
		obj.__flex_v+=(100-x)/fs;
		obj.__flex_v*=ms;

		if(Math.abs(obj.__flex_v)>MAX_SPEED)obj.__flex_v=obj.__flex_v>0?MAX_SPEED:-MAX_SPEED;

		x+=obj.__flex_v;

		for(var i in cur)
		{
			now[i]=(target[i]-cur[i])*x/100+cur[i];
		}


		if(fnDo)fnDo.call(obj, now);

		if(Math.abs(obj.__flex_v)<1 && Math.abs(100-x)<1)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd.call(obj, target);
			obj.__flex_v=0;
		}
	}
};

zns.site.fx.buffer=function (obj, cur, target, fnDo, fnEnd, fs)
{
	if(zns.site.fx.browser_test.IE6)
	{
		fnDo&&fnDo.call(obj, target);
		fnEnd&&fnEnd.call(obj, target);
		return;
	}

	if(!fs)fs=6;
	var now={};
	var x=0;
	var v=0;

	if(!obj.__last_timer)obj.__last_timer=0;
	var t=new Date().getTime();
	if(t-obj.__last_timer>20)
	{
		fnMove();
		obj.__last_timer=t;
	}

	clearInterval(obj.timer);
	obj.timer=setInterval(fnMove, 20);
	function fnMove(){
		v=Math.ceil((100-x)/fs);

		x+=v;

		for(var i in cur)
		{
			now[i]=(target[i]-cur[i])*x/100+cur[i];
		}


		if(fnDo)fnDo.call(obj, now);

		if(Math.abs(v)<1 && Math.abs(100-x)<1)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd.call(obj, target);
		}
	}
};

zns.site.fx.linear=function (obj, cur, target, fnDo, fnEnd, fs)
{
	if(zns.site.fx.browser_test.IE6)
	{
		fnDo&&fnDo.call(obj, target);
		fnEnd&&fnEnd.call(obj, target);
		return;
	}
	if(!fs)fs=50;
	var now={};
	var x=0;
	var v=0;

	if(!obj.__last_timer)obj.__last_timer=0;
	var t=new Date().getTime();
	if(t-obj.__last_timer>20)
	{
		fnMove();
		obj.__last_timer=t;
	}

	clearInterval(obj.timer);
	obj.timer=setInterval(fnMove, 20);

	v=100/fs;
	function fnMove(){
		x+=v;

		for(var i in cur)
		{
			now[i]=(target[i]-cur[i])*x/100+cur[i];
		}

		if(fnDo)fnDo.call(obj, now);

		if(Math.abs(100-x)<1)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd.call(obj, target);
		}
	}
};

zns.site.fx.stop=function (obj)
{
	clearInterval(obj.timer);
};

//css3运动
zns.site.fx.move3=function (obj, json, fnEnd, fTime, sType)
{
	var addEnd=zns.site.fx.addEnd;

	fTime||(fTime=1);
	sType||(sType='ease');

	setTimeout(function (){
		setStyle3(obj, 'transition', sprintf('%1s all %2', fTime, sType));
		addEnd(obj, function (){
			setStyle3(obj, 'transition', 'none');
			if(fnEnd)fnEnd.apply(obj, arguments);
		}, json);

		setTimeout(function (){
			if(typeof json=='function')
				json.call(obj);
			else
				setStyle(obj, json);
		}, 0);
	}, 0);
};

//监听css3运动终止
(function (){
	var aListener=[];	//{obj, fn, arg}
	if(!Modernizr.csstransitions)return;

	if(window.navigator.userAgent.toLowerCase().search('webkit')!=-1)
	{
		document.addEventListener('webkitTransitionEnd', endListrner, false);
	}
	else
	{
		document.addEventListener('transitionend', endListrner, false);
	}

	function endListrner(ev)
	{
		var oEvObj=ev.srcElement||ev.target;
		//alert(aListener.length);
		for(var i=0;i<aListener.length;i++)
		{
			if(oEvObj==aListener[i].obj)
			{
				aListener[i].fn.call(aListener[i].obj, aListener[i].arg);
				aListener.remove(aListener[i--]);
			}
		}
	}

	zns.site.fx.addEnd=function (obj, fn, arg)
	{
		if(!obj || !fn)return;
		aListener.push({obj: obj, fn: fn, arg: arg});
	}
})();

//自定义滚动条
(function (){
	zns.site.fx.scrollBar=function (
		con, bar, area,			//元素：滚动条、滑块、滚轮区
		dir_x, dir_y,			//方向：true
		fnStart, fnScroll, fnEnd
	)
	{
		con=getEle(con)[0];
		bar=getEle(bar)[0];
		scale_x=0;
		scale_y=0;

		//拖拽
		bar.onmousedown=function (ev)
		{
			var oEvent=ev||event;

			if(dir_x)
				var disX=oEvent.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-bar.offsetLeft;
			if(dir_y)
				var disY=oEvent.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-bar.offsetTop;

			if(bar.setCapture)
			{
				bar.onmousemove=fnMove;
				bar.onmouseup=fnUp;

				bar.setCapture();
			}
			else
			{
				document.onmousemove=fnMove;
				document.onmouseup=fnUp;
			}

			function fnMove(ev)
			{
				var oEvent=ev||event;

				if(dir_x)
				{
					var l=oEvent.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-disX;
					if(l<0)
						l=0;
					else if(l>con.offsetWidth-bar.offsetWidth)
						l=con.offsetWidth-bar.offsetWidth;

					bar.style.left=l+'px';
				}

				if(dir_y)
				{
					var t=oEvent.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-disY;
					if(t<0)
						t=0;
					else if(t>con.offsetHeight-bar.offsetHeight)
						t=con.offsetHeight-bar.offsetHeight;

					bar.style.top=t+'px';
				}

				scale_x=l/(con.offsetWidth-bar.offsetWidth);
				scale_y=t/(con.offsetHeight-bar.offsetHeight);

				fnScroll && fnScroll(scale_x, scale_y);
			}

			function fnUp()
			{
				this.onmousemove=null;
				this.onmouseup=null;

				if(bar.releaseCapture)
				{
					bar.releaseCapture();
				}

				fnEnd && fnEnd();
			}

			fnStart && fnStart(scale_x, scale_y);

			return false;
		};

		//鼠标滚轮
		if(area)
		{
			area=getEle(area)[0];

			function fnWheel(ev)
			{
				var oEvent=ev||event;

				var bDown=oEvent.wheelDelta?(oEvent.wheelDelta<0):(oEvent.detail>0);

				if(dir_y)
				{
					var t=bar.offsetTop+(bDown?30:-30);

					if(t<0)t=0;
					else if(t>con.offsetHeight-bar.offsetHeight)t=con.offsetHeight-bar.offsetHeight;

					bar.style.top=t+'px';
					scale_y=t/(con.offsetHeight-bar.offsetHeight);

					fnScroll && fnScroll(scale_x, scale_y);
				}
				else if(dir_x)
				{
					var l=bar.offsetLeft+(bDown?30:-30);

					if(l<0)l=0;
					else if(l>con.offsetWidth-bar.offsetWidth)t=con.offsetWidth-bar.offsetWidth;

					bar.style.left=l+'px';
					scale_x=l/(con.offsetWidth-bar.offsetWidth);

					fnScroll && fnScroll(scale_x, scale_y);
				}

				oEvent.preventDefault&&oEvent.preventDefault();
				return false;
			}
			bindEvent(area, 'DOMMouseScroll', fnWheel);
			bindEvent(area, 'mousewheel', fnWheel);
		}
	};
})();






zns.site.user={};

(function (){
	zns.site.user.curUser=null;
	var linear=zns.site.fx.linear;
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;

	onLoad(function (){
		var reg_code=$_GET['reg_code'];

		if(reg_code)
		{
			document.getElementById('reg_code_txt').value=reg_code;

			setTimeout(function (){
				zns.site.user.openDialog(function (){
					setTimeout(function (){
						zns.site.user.switchToReg();
					}, 200);
				});
			}, 500);
		}
	});

	zns.site.user.create=function ()
	{
		return;
		zns.site.user.createDOM();

		//找回密码
		(function (){
			var oBtn=document.getElementById('btn_forgot_pass');

			var oTxt=document.getElementById('txt_email_reg');

			oBtn.onclick=function ()
			{
				if(!oTxt.value)
				{
					alert('请填写注册邮箱，我们将会发送一封邮件，帮你完成密码找回操作');
					return;
				}

				request('zpi/zns_user.php', {act: 'forgot_pass', email: oTxt.value}, function (data){
					alert('邮件已发送，如未收到邮件，请在回收站里找找，或联系官方协助解决');
				});
			};
		})();

		var znsUser=zns.site.z.znsUser;

		var sState='login';

		//各种对象
		var oDivLogin=getEle('.head .h_con .conTxt')[0];
		var oLoginBox=getEle('#login')[0];
		var oBg=getEle('.shadow_bg')[0];

		var oBtnLogin=getEle('#login .lgn .aLogin')[0];
		var oBtnReg=getEle('#login .reg .aLogin')[0];

		var oTxtRegCode=getEle('#login .reg input')[0];
		var oTxtRegEmail=getEle('#login .reg input')[1];
		var oTxtRegPass=getEle('#login .reg input')[2];
		var oTxtLoginEmail=getEle('#login .lgn input')[0];
		var oTxtLoginPass=getEle('#login .lgn input')[1];

		//从cookie里找一下上次登录的用户名
		oTxtLoginEmail.value=getCookie('zns_user_name');

		var ready=true;

		function enterLogin(ev)
		{
			if((ev||event).keyCode==13)oBtnLogin.onclick();
		}
		bindEvent(oTxtLoginEmail, 'keydown', enterLogin);
		bindEvent(oTxtLoginPass, 'keydown', enterLogin);

		function enterReg(ev)
		{
			if((ev||event).keyCode==13)oBtnReg.onclick();
		}
		bindEvent(oTxtRegCode, 'keydown', enterReg);
		bindEvent(oTxtRegEmail, 'keydown', enterReg);
		bindEvent(oTxtRegPass, 'keydown', enterReg);

		//用户登陆成功时
		function setLoginOk(data)
		{
			zns.site.user.curUser=data;
			//切换登陆状态

			var oBtnLogin=getEle('.before_login', oDivLogin)[0];
			var oBtnDetail=getEle('.after_login', oDivLogin)[0];
			var oBtnLogout=getEle('.after_login', oDivLogin)[1];

			oBtnLogin.style.display='none';
			oBtnDetail.style.display='inline-block';
			oBtnLogout.style.display='inline-block';

			oBtnDetail.getElementsByTagName('img')[0].src=_g_path+'images/user_pic/'+data.face_s;
			oBtnDetail.getElementsByTagName('em')[0].innerHTML=data.nick_name;

			oBtnLogout.onclick=function (){
				znsUser.logout(setNotLogin, function (desc){
					alert('退出登录失败：'+desc);
				});

				//删除cookie
				removeCookie('zns_user_name');
				removeCookie('pass');
			};
		}

		function setNotLogin()
		{
			//当前没有用户登陆
			var oBtnLogin=getEle('.before_login', oDivLogin)[0];
			var oBtnDetail=getEle('.after_login', oDivLogin)[0];
			var oBtnLogout=getEle('.after_login', oDivLogin)[1];

			oBtnLogin.style.display='inline-block';
			oBtnDetail.style.display='none';
			oBtnLogout.style.display='none';

			zns.site.user.curUser=null;
		}

		onLoad(function (){
			var oBtnOpen=oDivLogin.getElementsByTagName('a')[0];
			var oBtnClose=getEle('.btn_close', oLoginBox)[0];

			oBtnOpen.onclick=openDialog;
			oBtnClose.onclick=closeDialog;
		});

		//检查是否登录
		znsUser.getCur(setLoginOk, function (){
			//尝试从cookie登录试试
			var email=getCookie('zns_user_name');
			var pass=getCookie('pass');

			if(email && pass)
			{
				znsUser.login(email, pass, setLoginOk, setNotLogin);
			}
			else
			{
				setNotLogin();
			}
		});

		//添加转场动画
		if(Modernizr.csstransforms3d)
		{
			//3d模式
			(function (){
				//登陆<-->注册
				var oBtnToReg=getEle('#login .lgn a')[2];
				var oBtnToLgn=getEle('#login .reg a')[2];
				var oBgLgn=getEle('#login .lgn .bg')[0];
				var oBgReg=getEle('#login .reg .bg')[0];

				zns.site.user.switchToReg=function ()
				{
					if(!ready)return;
					ready=false;

					var oDivReg=getEle('#login .reg')[0];
					oDivReg.style.display='block';

					sState='reg';

					oBgLgn.style.display='block';
					oBgLgn.style.filter='alpha(opacity:0)';
					oBgLgn.style.opacity=0;
					oBgReg.style.display='none';

					flex(oBgLgn, {opacity: 0, rotateY: 0}, {opacity:100, rotateY: 180}, function (now){
						oBgLgn.style.filter='alpha(opacity:'+now.opacity+')';
						oBgLgn.style.opacity=now.opacity/100;

						setStyle3(oLoginBox, 'transform', 'perspective(1000px) rotateY('+now.rotateY+'deg)');
					}, function (){
						oBgLgn.style.display='none';
						ready=true;
					}, 11);
				};

				zns.site.user.switchToLogin=function ()
				{
					if(!ready)return;
					ready=false;

					sState='login';
					oBgReg.style.display='block';
					oBgReg.style.filter='alpha(opacity:0)';
					oBgReg.style.opacity=0;
					oBgLgn.style.display='none';

					flex(oBgLgn, {opacity:0, rotateY: 180}, {opacity: 160, rotateY: 0}, function (now){
						oBgReg.style.filter='alpha(opacity:'+now.opacity+')';
						oBgReg.style.opacity=now.opacity/100;

						setStyle3(oLoginBox, 'transform', 'perspective(1000px) rotateY('+now.rotateY+'deg)');
					}, function (){
						oBgReg.style.display='none';
						ready=true;
					}, 11);
				};

				oBtnToReg.onclick=zns.site.user.switchToReg;
				oBtnToLgn.onclick=zns.site.user.switchToLogin;
			})();
		}
		else
		{
			//2d模式
			(function (){
				var oDivReg=getEle('#login .reg')[0];
				var oDivLgn=getEle('#login .lgn')[0];
				var oBtnToReg=getEle('#login .lgn a')[2];
				var oBtnToLgn=getEle('#login .reg a')[2];

				oDivReg.style.display='block';

				setStyle3(getEle('#login .btn_close')[0], 'transform', 'none');

				var oDiv=getEle('#login')[0];
				oDiv.style.overflow='hidden';

				oDivLgn.style.left='0';
				oDivReg.style.left='400px';

				zns.site.user.switchToReg=function ()
				{
					buffer(oDiv, {a: 0}, {a: 1}, function (now){
						oDivLgn.style.left=now.a*-400+'px';
						oDivReg.style.left=(1-now.a)*400+'px';
					});
				};

				zns.site.user.switchToLogin=function ()
				{
					buffer(oDiv, {a: 1}, {a: 0}, function (now){
						oDivLgn.style.left=now.a*-400+'px';
						oDivReg.style.left=(1-now.a)*400+'px';
					});
				};

				oBtnToReg.onclick=zns.site.user.switchToReg;
				oBtnToLgn.onclick=zns.site.user.switchToLogin;
			})();
		}

		zns.site.user.openDialog=openDialog;

		function openDialog(fnSucc)
		{
			if(!ready)return;
			ready=false;

			zns.site.fx.index_ppt.pause();

			//运动
			flex(oLoginBox, {bgAlpha:0, boxAlpha: 0, scale: 3}, {bgAlpha: 80, boxAlpha: 100, scale: 1}, function (now){
				if(oBg.style.display!='block')
				{
					oBg.style.display='block';
					oLoginBox.style.display='block';
				}

				oBg.style.filter='alpha(opacity:'+now.bgAlpha+')';
				oBg.style.opacity=now.bgAlpha/100;

				oLoginBox.style.filter='alpha(opacity:'+now.boxAlpha+')';
				oLoginBox.style.opacity=now.boxAlpha/100;

				setStyle3(oLoginBox, 'transform', 'scale('+now.scale+')');
			}, function (){
				ready=true;
				if(typeof fnSucc=='function')
					fnSucc();
			}, 4, 0.58);
		}

		function closeDialog()
		{
			if(!ready)return;
			ready=false;

			zns.site.fx.index_ppt.gotoPlay();

			//运动
			buffer(oLoginBox, {bgAlpha: 80, boxAlpha: 100, scale: 1}, {bgAlpha:0, boxAlpha: 0, scale: 3}, function (now){
				oBg.style.filter='alpha(opacity:'+now.bgAlpha+')';
				oBg.style.opacity=now.bgAlpha/100;

				oLoginBox.style.filter='alpha(opacity:'+now.boxAlpha+')';
				oLoginBox.style.opacity=now.boxAlpha/100;

				if(sState=='login')
					setStyle3(oLoginBox, 'transform', 'scale('+now.scale+')');
				else
					setStyle3(oLoginBox, 'transform', 'scale('+now.scale+') rotateY(180deg)');
			}, function (){
				ready=true;

				oBg.style.display='none';
				oLoginBox.style.display='none';

				//清空所有状态，为以后做准备
				sState='login';
			}, null);
		}

		//用户注册和登陆
		//用户注册
		oBtnReg.onclick=function (){
			znsUser.reg(oTxtRegCode.value, oTxtRegEmail.value, oTxtRegPass.value, function (data){
				alert('注册成功，欢迎加入智能社');
				loginSucc(data, oTxtRegEmail.value, oTxtRegPass.value);
			}, function (desc){
				alert(desc);
			});
		};

		//用户登陆
		oBtnLogin.onclick=function (){
			znsUser.login(oTxtLoginEmail.value, oTxtLoginPass.value, function (data){
				alert('登录成功');
				loginSucc(data, oTxtLoginEmail.value, oTxtLoginPass.value);
			}, function (desc){
				alert(desc);
			});
		};

		function loginSucc(data, email, pass)
		{
			setCookie('zns_user_name', email, 7);
			//用cookie记住用户名、密码
			setCookie('pass', pass, 7);

			setLoginOk(data);

			setTimeout(closeDialog, 500);
		}
	};

	zns.site.user.createDOM=function ()
	{
		//登录按钮
		(function (){
			var oPayTo=getEle('.head .payToDiv')[0];

			var oP=document.createElement('p');

			oP.className='conTxt';
			oP.innerHTML='\
<a href="javascript:;" class="bold before_login">登录</a>\
<a href="'+_g_path+'i.php" class="after_login">\
	<img alt="用户头像" src="'+_g_path+'images/regBg.jpg" width="20" height="20" />\
	<em></em>\
</a>&nbsp;\
<a href="javascript:;" class="bold after_login" style="width:auto;">退出</a>&nbsp;';

			oPayTo.parentNode.insertBefore(oP, oPayTo);
		})();

		//登录框
		(function (){
			var oDiv=document.createElement('div');
			oDiv.className='layerReg';
			oDiv.id='login';

			oDiv.innerHTML='\
<a href="javascript:;" class="btn_close"></a>\
<div class="lgn">\
	<span class="bg"></span>\
	<div class="layer_logo"></div>\
	<div class="login">\
		<div class="line_01"></div>\
		<div class="hr_30"></div>\
		<div class="user_login regS">\
			<ul class="ul_list">\
				<li class="bor"><span>邮　箱</span><input id="txt_email_reg" type="text" value="" /></li>\
				<li><span>密　码</span><input type="password" value="" /></li>\
			</ul>\
		</div>\
		<a href="javascript:;" class="aLogin">登　录</a>\
		<p class="login_reg">\
			<a id="btn_forgot_pass" href="javascript:;">忘记密码</a>&nbsp;&nbsp;&nbsp;\
			<a href="javascript:;">账号注册</a>\
		</p>\
	</div>\
	<div class="regBor"></div>\
	<div class="regBor"></div>\
</div>\
<div class="reg">\
	<span class="bg"></span>\
	<div class="layer_logo"></div>\
	<div class="login">\
		<div class="line_01"></div>\
		<div class="user_login regS">\
			<ul class="ul_list">\
				<li class="bor"><span>邀请码</span><input id="reg_code_txt" type="text" value="" /></li>\
				<li class="bor"><span>邮　箱</span><input type="text" value="" /></li>\
				<li><span>密　码</span><input type="password" value="" /></li>\
			</ul>\
		</div>\
		<a href="#" class="aLogin">注　册</a>\
		<p class="login_reg">\
			<a href="http://www.zhinengshe.com/news/1.html" target="_blank" style="float:left;">没有邀请码？</a>\
			<a href="javascript:;">返回</a>\
		</p>\
	</div>\
	<div class="regBor"></div>\
	<div class="regBor"></div>\
</div>';
			document.body.appendChild(oDiv);

			var timer=setInterval(function (){
				var a=getByClass(oDiv, 'login_b')[0];

				if(a)
				{
					a.style.color='#FFF';

					clearInterval(timer);
				}
			}, 100);
		})();
	};
})();

zns.site.works_list={};

(function (){
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;
	var tempNewDiv=
		'<a href="works/{num}/{name_en}.html" target="_blank">'+
			'<img src="images/product_pic/{pic}" />'+
		'</a>'+
		'<div class="hidden_txt"><strong>'+
			'<a href="works/{num}/{name_en}.html" target="_blank" style="color:white;">'+
				'{name}'+
			'</a>'+
		'</strong><br>{desc_s}</div>';

	if(window._product_data)
	{
		var data=_product_data.concat([]);
	}
	else
	{
		var data=[];
	}
	var pageSize=9;
	var page=0;
	var aPage=[];

	var oDiv=null;
	var oPage=null;
	var ready=true;

	data.sort(function (d1, d2){
		return d2.id-d1.id;
	});

	zns.site.works_list.create=function ()
	{
		oDiv=getEle('.listBox')[0];
		oPage=getEle('.listBox .page')[0];

		var aDiv=createDiv();

		//div布局
		oDiv.style.height=oDiv.offsetHeight+'px';
		oDiv.style.position='relative';

		createPage(onPageCreate);
		function onPageCreate(oldPage, newPage){
			ready=false;
			var i=aDiv.length-1;
			var iWait=aDiv.length;

			var timer=setInterval(function (){
				buffer(
					aDiv[i],
					{left: aPos[i].left, top: aPos[i].top, opacity: 100, width: aPos[i].width, height: aPos[i].height},
					{left: aPage[oldPage].offsetLeft+oPage.offsetLeft, top: aPage[oldPage].offsetTop+oPage.offsetTop, opacity: 0, width: 24, height: 24},
					function (now){
						this.style.left=now.left+'px';
						this.style.top=now.top+'px';
						this.style.width=now.width+'px';
						this.style.height=now.height+'px';
						this.style.filter='alpha(opacity:'+now.opacity+')';
						this.style.opacity=now.opacity/100;
					}, function (){
						this.parentNode.removeChild(this);
						iWait--;

						if(!iWait)
						{
							createPage(onPageCreate);
							aDiv=createDiv(function (){
								this.style.position='absolute';
								this.style.display='none';
								this.style.margin='0';
							});
							i=aDiv.length-1;
							var timer=setInterval(function (){
								buffer(
									aDiv[i],
									{left: aPage[newPage].offsetLeft+oPage.offsetLeft, top: aPage[newPage].offsetTop+oPage.offsetTop, opacity: 0, width: 24, height: 24},
									{left: aPos[i].left, top: aPos[i].top, opacity: 100, width: aPos[i].width, height: aPos[i].height},
									function (now){
										if(this.style.display!='block')
											this.style.display='block';
										this.style.left=now.left+'px';
										this.style.top=now.top+'px';
										this.style.width=now.width+'px';
										this.style.height=now.height+'px';
										this.style.filter='alpha(opacity:'+now.opacity+')';
										this.style.opacity=now.opacity/100;
									}, function (){
										if(this==aDiv[0])
										{
											ready=true;
										}
									}
								);

								i--;

								if(i==-1)clearInterval(timer);
							}, 100);
						}
					}, 5
				);

				i--;

				if(i==-1)clearInterval(timer);
			}, 100);
		}

		//page布局
		oPage.style.top=oPage.offsetTop+'px';
		oPage.style.position='absolute';
		oPage.style.left=(oDiv.offsetWidth-oPage.offsetWidth)/2+'px';

		//布局转换
		var aPos=[];

		for(var i=0;i<aDiv.length;i++)
		{
			aPos[i]={left: aDiv[i].offsetLeft, top: aDiv[i].offsetTop, width:aDiv[i].offsetWidth, height: aDiv[i].offsetHeight};
		}

		for(var i=0;i<aDiv.length;i++)
		{
			aDiv[i].style.position='absolute';
			aDiv[i].style.left=aPos[i].left+'px';
			aDiv[i].style.top=aPos[i].top+'px';
			aDiv[i].style.margin='0';
		}
	};

	function createDiv(fn)
	{
		var aDiv=[];
		function n(index){return index%data.length;}

		for(var i=pageSize*page;i<pageSize*(page+1);i++)
		{
			var oData=data[n(i)];

			oNewDiv=document.createElement('div');
			oNewDiv.className='list_comBox';
			oNewDiv.innerHTML=format(tempNewDiv, oData);

			var oTxt=getEle('.hidden_txt', oNewDiv)[0];
			oTxt.style.height=0;
			oTxt.style.filter='alpha(opacity:0)';
			oTxt.style.opacity=0;

			(function (oTxt){
				var a=0;
				var h=0;
				var timer=null;
				oTxt.onmouseover=oNewDiv.onmouseover=function ()
				{
					clearTimeout(timer);
					oTxt.style.display='block';
					buffer(oTxt, {h: h, opacity: a}, {h: 81, opacity: 100}, function (now){
						this.style.height=now.h+'px';
						this.style.filter='alpha(opacity:'+now.opacity+')';
						this.style.opacity=now.opacity/100;
						a=now.opacity;
						h=now.h;
					});
				};
				oTxt.onmouseout=oNewDiv.onmouseout=function ()
				{
					clearTimeout(timer);
					timer=setTimeout(function (){
						buffer(oTxt, {h: h, opacity: a}, {h: 0, opacity: 0}, function (now){
							this.style.height=now.h+'px';
							this.style.filter='alpha(opacity:'+now.opacity+')';
							this.style.opacity=now.opacity/100;
							a=now.opacity;
							h=now.h;
						}, function (){
							this.style.display='none';
						});
					}, 30);
				};
			})(oTxt);

			oDiv.insertBefore(oNewDiv, oPage);

			if(fn)fn.call(oNewDiv);
			aDiv.push(oNewDiv);
		}

		return aDiv;
	}

	function createPage(fnChangePage)
	{
		oPage.innerHTML='';

		var pageCount=Math.ceil(data.length/pageSize);
		if(pageCount==0)return;

		var str='';

		//上一个
		str+='<a href="javascript:;">&lt;</a>';

		//中间的
		for(var i=0;i<pageCount;i++)
		{
			if(i==page)
				str+='<a href="javascript:;" class="active">'+(i+1)+'</a>';
			else
				str+='<a href="javascript:;">'+(i+1)+'</a>';
		}

		//下一个
		str+='<a href="javascript:;">&gt;</a>';

		oPage.innerHTML=str;

		//事件
		var aA=oPage.getElementsByTagName('a');

		aA[0].onclick=function ()
		{
			if(!ready)return;
			var oldPage=page;
			if(page==0)return;
			page--;

			fnChangePage(oldPage, page);
		};
		aA[aA.length-1].onclick=function ()
		{
			if(!ready)return;
			var oldPage=page;
			if(page==pageCount-1)return;
			page++;

			fnChangePage(oldPage, page);
		};

		for(var i=1;i<pageCount+1;i++)
		{
			(function (i){
				aA[i].onclick=function ()
				{
					if(!ready)return;
					var oldPage=page;
					page=i-1;

					fnChangePage(oldPage, page);
				};
			})(i);
		}

		aPage=[];
		for(var i=1;i<pageCount+1;i++)
		{
			aPage.push(aA[i]);
		}
	}
})();zns.site.works={};

(function (){
	var zpi=_g_path+'zpi/zns_works.php';
	zns.site.works.loadData=function (worksId)
	{
		//1.加载查看、喜欢、评分
		request(zpi, {act: 'get_info', id: worksId}, function (data){
			var oLike=getEle('.imgOpen .like')[0];
			var oView=getEle('.imgOpen .look')[0];

			oLike.innerHTML=data.like+'人喜欢';
			oView.innerHTML=data.view_count+'次浏览';

			//添加like
			oLike.onclick=function ()
			{
				oLike.onclick=null;
				request(zpi, {act: 'add_like', id: worksId}, function (){
					oLike.innerHTML=parseInt(oLike.innerHTML)+1+'人喜欢';
				}, function (desc){
					//alert(desc);
					if(window.console && console.log)
		                                console.log(desc);

				});
			};

			//评分
			(function (){
				var oDiv=getEle('.score_yellow')[0];
				var oUl=oDiv.getElementsByTagName('ul')[0];
				var aLi=oUl.getElementsByTagName('li');
				var oThank=oDiv.getElementsByTagName('span')[0];

				//获取初始分值
				var rankTotal=data.rank_0+data.rank_1*2+data.rank_2*3+data.rank_3*4+data.rank_4*5;
				var rankCount=data.rank_0+data.rank_1+data.rank_2+data.rank_3+data.rank_4;

				var rank=rankCount==0?0:Math.ceil(rankTotal/rankCount);

				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].className='';
				}
				for(var i=0;i<rank;i++)
				{
					aLi[i].className='score_active';
				}
				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].index=i;
					aLi[i].onmouseover=function ()
					{
						oDiv.className='score_blue';
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].className='';
						}
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].className='score_active';
							if(this==aLi[i])break;
						}
					};
					aLi[i].onmouseout=function ()
					{
						oDiv.className='score_yellow';
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].className='';
						}
						for(var i=0;i<rank;i++)
						{
							aLi[i].className='score_active';
						}
					};
					aLi[i].onclick=function ()
					{
						//去掉所有事件
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].onclick=aLi[i].onmouseover=aLi[i].onmouseout=null;
						}

						//操作分值
						request(zpi, {act: 'add_rank', rank: this.index+1, id: worksId}, function (){
							oThank.style.display='block';
						}, function (desc){
							//alert(desc);
							if(window.console && console.log)
				                                console.log(desc);

						});
					};
				}
			})();
		}, function (desc){
			//alert(desc);
			if(window.console && console.log)
				console.log(desc);
		});

		//2.返回的提示标签
		(function (){
			var oA1=getEle('.blackTo a')[0];
			var oS1=getEle('.blackTo span')[0];

			//var oA2=getEle('.reply_blackTo a')[0];
			//var oS2=getEle('.reply_blackTo span')[0];

			if(oA1)
			{
				oA1.onmouseover=function ()
				{
					oS1.style.display='block';
				};
				oA1.onmouseout=function ()
				{
					oS1.style.display='none';
				};
			}

			/*oA2.onmouseover=function ()
			{
				oS2.style.display='block';
			};
			oA2.onmouseout=function ()
			{
				oS2.style.display='none';
			};*/
		})();

		//3.按钮状态
		(function (){
			var aBtn=getEle('.imgBtn a');

			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].onmouseover=function ()
				{
					this.className='btn_active';
				};
				aBtn[i].onmouseout=function ()
				{
					this.className='';
				};
			}
		})();
	};
})();zns.site.fx.zns_placeholder={};

(function (){
	zns.site.fx.zns_placeholder.create=function (oInput, text, defaultColor)
	{
		if(!oInput)return;

		if(!defaultColor)defaultColor='#CCC';

		oInput.value='';

		var timer=null;
		var isDefault=true;

		__doDefault__();

		function onblur(ev)
		{
			var oEvent=ev||event;
			var oElement=oEvent.srcElement || oEvent.target;

			__doDefault__();

			clearInterval(timer);
		}
		function onfocus(ev)
		{
			var oEvent=ev||event;
			var oElement=oEvent.srcElement || oEvent.target;

			__cancelDefault__();

			timer=setInterval(function (){
				isDefault=oInput.value==0;
			}, 30);
		}

		bindEvent(oInput, 'blur', onblur);
		bindEvent(oInput, 'focus', onfocus);

		function __doDefault__()
		{
			if(oInput.value.length==0)
			{
				isDefault=true;

				oInput.style.color=defaultColor;
				oInput.value=text;
			}
			else
			{
				isDefault=false;
			}
		}

		function __cancelDefault__()
		{
			if(isDefault)
			{
				oInput.style.color='';
				oInput.value="";
			}
		}

		return {oInput: oInput, onblur: onblur, onfocus: onfocus};//用于删除
	};
	zns.site.fx.zns_placeholder.remove=function (handler)
	{
		unbindEvent(handler.oInput, 'blur', handler.onblur);
		unbindEvent(handler.oInput, 'focus', handler.onfocus);

		handler.oInput.style.color='';
	};
})();zns.site.fx.about_naver={};

(function (){
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;
	zns.site.fx.about_naver.create=function (initIndex)
	{
		var aNaver=getEle('.leftNav a');
		var aLi=getEle('.rightCon .aboutTitle');
		var oDiv=getEle('.contentScroll')[0];
		var oContent=getEle('.rightCon .content')[0];
		var oMark=getEle('.leftNav_hover')[0];
		var nowScale=0;
		var iNow=0;

		if(!initIndex)initIndex=0;
		initIndex=Math.min(initIndex, aNaver.length-1);

		mouseScroll(oContent, function (bDown){
			//alert(bDown);
			if(bDown)
			{
				setScroll(nowScale+30/oContent.offsetHeight);
			}
			else
			{
				setScroll(nowScale-30/oContent.offsetHeight);
			}
		});

		//滚动条
		var oBtnUp=getEle('.scrollCon .scrollTop')[0];
		var oScrollBar=getEle('.scrollCon .scroll_cen')[0];
		var oBar=getEle('.scrollCon .scroll_cen span')[0];
		var oBtnDown=getEle('.scrollCon .scrollBot')[0];

		drag(oBar, oBar, function (l,t){
			var scale=(t-20)/(oScrollBar.offsetHeight-oBar.offsetHeight+11);

			setScroll(scale);
		});

		function setScroll(scale)
		{
			scale=Math.min(Math.max(0, scale), 1);

			nowScale=scale;

			var t=scale*(oScrollBar.offsetHeight-oBar.offsetHeight+11)+20;
			oBar.style.top=t+'px';

			var t=parseInt(oDiv.style.top);
			if(isNaN(t))t=0;

			buffer(oDiv, {t: t}, {t: -scale*(oDiv.offsetHeight-oContent.offsetHeight+41)}, function (now){
				this.style.top=now.t+'px';

				//找到当前应该是哪个naver了
				var max=-1;
				var _scale=-now.t/(oDiv.offsetHeight-oContent.offsetHeight+41);

				for(var i=0;i<aNaver.length;i++)
				{
					if(_scale>=aNaver[i].scale-0.02)max=i;
				}

				if(max!=-1 && iNow!=max)
				{
					iNow=max;

					for(var i=0;i<aNaver.length;i++)
					{
						aNaver[i].className='';
					}

					aNaver[iNow].className='active';

					var _t=aNaver[iNow].parentNode.offsetTop-9;
					if(iNow==0)
					{
						_t=aNaver[iNow].parentNode.offsetTop-15;
					}
					buffer(oMark, {t: oMark.offsetTop}, {t: _t}, function (now){
						oMark.style.top=now.t+'px';
					});
				}
			}, function (){
			});
		}

		//点击naver，跳到某一条数据
		for(var i=0;i<aNaver.length;i++)
		{
			aNaver[i].href='javascript:;';
			aNaver[i].scale=(aLi[i].offsetTop-20)/(oDiv.offsetHeight-oContent.offsetHeight);
			aNaver[i].onclick=function ()
			{
				setScroll(this.scale);
			};
		}

		aNaver[initIndex].onclick();
	};
})();zns.site.fx.browser_test={};

(function (){
	var flex=zns.site.fx.flex;
	var buffer=zns.site.fx.buffer;
	var linear=zns.site.fx.linear;

	zns.site.fx.browser_test.IE6=window.navigator.userAgent.search(/MSIE 6/)!=-1;
	zns.site.fx.browser_test.IE7=window.navigator.userAgent.search(/MSIE 7/)!=-1;
	zns.site.fx.browser_test.IE8=window.navigator.userAgent.search(/MSIE 8/)!=-1;
	zns.site.fx.browser_test.IE9=window.navigator.userAgent.search(/MSIE 9/)!=-1;
	zns.site.fx.browser_test.IE10=window.navigator.userAgent.search(/MSIE 10/)!=-1;

	zns.site.fx.browser_test.createDOM=function ()
	{
		var oDiv=document.createElement('div');

		oDiv.className='browser_alert';
		oDiv.innerHTML=
		'<a href="javascript:;" title="关闭" class="browser_close"></a>'+
		'<p class="browser_title">您的浏览器版本过低</p>'+
		'<p class="browser_content">'+
			'智能社官网大量采用了HTML5技术进行开发，所以低版本浏览器将无法展现网站的全部效果，建议您升级浏览器，然后进行访问。<br><br>'+
			'<em>因为智能社官网使用了Web3D技术，所以在没有显卡的计算机上，升级浏览器后仍会收到此提示，这时您将仍无法查看部分3D效果</em>'+
		'</p>'+
		'<p class="browser_btn">'+
			'<a href="http://www.google.cn/chrome" class="upgrade" target="_blank"></a><a href="support_list.html" class="testing" target="_blank"></a><a href="javascript:;" class="prompt"></a>'+
		'</p>';

		document.body.appendChild(oDiv);
	};
	zns.site.fx.browser_test.create=function ()
	{
		zns.site.fx.browser_test.createDOM();
		if(
			!Modernizr.csstransforms3d ||
			!Modernizr.canvas ||
			!Modernizr.geolocation ||
			!Modernizr.websockets ||
			!Modernizr.boxshadow ||
			!Modernizr.cssanimations
		)
		{
			var oAlert=getEle('.browser_alert')[0];
			var oBg=getEle('.shadow_bg')[0];
			var oClose=getEle('.browser_alert .browser_close')[0];
			var oBtnNotShowAgain=getEle('.browser_alert .prompt')[0];

			var ie6=zns.site.fx.browser_test.IE6;
			var ie7=zns.site.fx.browser_test.IE7;

			setTimeout(open, 1500);

			function open()
			{
				if(getCookie('zns_not_show_browser_test_again')=='1')return;
				oBg.style.display='block';
				oAlert.style.display='block';

				if(!ie6 && !ie7)
				{
					buffer(oBg, {alpha: 0}, {alpha: 100}, function (now){
						oBg.style.filter='alpha(opacity: '+now.alpha*0.8+')';
						oBg.style.opacity=now.alpha*0.8/100;

						oAlert.style.filter='alpha(opacity: '+now.alpha+')';
						oAlert.style.opacity=now.alpha/100;
					}, function (){
						oAlert.style.filter='';
						oAlert.style.opacity=1;
					});
				}
				else if(ie7)
				{
					oBg.style.filter='alpha(opacity:80)';
					oBg.style.opacity=0.8;
				}
			}

			oClose.onclick=close;

			function close()
			{
				if(window.navigator.userAgent.search(/MSIE 6|MSIE 7/)==-1)
				{
					buffer(oBg, {alpha: 100}, {alpha: 0}, function (now){
						oBg.style.filter='alpha(opacity: '+now.alpha*0.8+')';
						oBg.style.opacity=now.alpha*0.8/100;

						oAlert.style.filter='alpha(opacity: '+now.alpha+')';
						oAlert.style.opacity=now.alpha/100;
					}, function (){
						oBg.style.display='none';
						oAlert.style.display='none';
					});
				}
				else
				{
					oBg.style.display='none';
					oAlert.style.display='none';
				}
			}

			oBtnNotShowAgain.onclick=function ()
			{
				close();
				setCookie('zns_not_show_browser_test_again', '1', false);
			};
		}
	};
})();zns.site.fx.clock_3d={};

(function (){
	var flex=zns.site.fx.flex;

	zns.site.fx.clock_3d.create=function ()
	{
		var oDiv=document.getElementById('clock_3d');
		if(!Modernizr.csstransforms3d || window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1 || window.navigator.userAgent.toLowerCase().indexOf('msie 10')!=-1)
		{
			oDiv.parentNode.removeChild(oDiv);
			return;
		}

		zns.site.fx.clock_3d._create_ele(oDiv);

		var aUl=oDiv.getElementsByTagName('ul');
		var oContainer=getByClass(oDiv, 'container')[0];
		var now='000000';
		var rx=0,ry=0;
		var MAX_R=12;

		var paused=false;

		var finish=0;

		var start=function ()
		{
			var i=0;

			var tt=setInterval(function (){
				flex(aUl[i], {scale: 0}, {scale: 1}, function (now){
					setStyle3(this, 'transform', 'rotateX(0deg) scale('+now.scale+')');
				}, function (){
					setStyle3(this, 'transform', 'rotateX(0deg)');
					if(++finish==aUl.length)
					{
						finished();
					}
				});

				i++;

				if(i==aUl.length)
					clearInterval(tt);
			}, 70);

			/*oDiv.onmouseout=function (ev)
			{
				oDiv.lastOut=new Date().getTime();
			};

			oDiv.onmouseover=function (ev)
			{
				var oEvent=ev||event;
				if(new Date().getTime()-this.lastOut<5000)return;

				i=0;
				clearInterval(tt);
				tt=setInterval(function (){
					flex(aUl[i], {scale: 0}, {scale: 1}, function (now){
						setStyle3(this, 'transform', 'perspective(1300px) rotateX(0deg) scale('+now.scale+')');
					}, function (){
						setStyle3(this, 'transform', 'perspective(1300px) rotateX(0deg)');
						if(++finish==aUl.length)
						{
							finished();
						}
					});

					i++;

					if(i==aUl.length)
						clearInterval(tt);
				}, 70);
			};*/

			function finished()
			{
				function next()
				{
					var oDate=new Date();
					function d(n){return n<10?'0'+n:''+n;}
					oDate.setSeconds(oDate.getSeconds()-1);
					var str0=d(oDate.getHours())+d(oDate.getMinutes())+d(oDate.getSeconds());
					oDate.setSeconds(oDate.getSeconds()+1);
					var str1=d(oDate.getHours())+d(oDate.getMinutes())+d(oDate.getSeconds());
					oDate.setSeconds(oDate.getSeconds()+1);
					var str2=d(oDate.getHours())+d(oDate.getMinutes())+d(oDate.getSeconds());
					oDate.setSeconds(oDate.getSeconds()+1);
					var str3=d(oDate.getHours())+d(oDate.getMinutes())+d(oDate.getSeconds());

					for(var i=0;i<now.length;i++)
					{
						if(now.charAt(i)!=str1.charAt(i))
						{
							move(aUl[i], str1.charAt(i), str2.charAt(i), str0.charAt(i), str3.charAt(i));
						}
					}

					now=str1;

					function move(oUl, nu, nb, np, nf)
					{
						var su=getByClass(oUl, 'clock_3d_top')[0].getElementsByTagName('span')[0];
						var sb=getByClass(oUl, 'clock_3d_bottom')[0].getElementsByTagName('span')[0];
						var sf=getByClass(oUl, 'clock_3d_front')[0].getElementsByTagName('span')[0];
						var sb2=getByClass(oUl, 'clock_3d_back')[0].getElementsByTagName('span')[0];

						su.innerHTML=nu;
						sb2.innerHTML=nb;

						flex(oUl, {rotateX: 0}, {rotateX: -90}, function (now){
							setStyle3(this, 'transform', 'rotateX('+now.rotateX+'deg)');
						}, function (){
							setStyle3(this, 'transform', 'rotateX(0deg)');

							var tmp=sb.innerHTML;
							sb.innerHTML=np;
							sb2.innerHTML=nf;
							su.innerHTML=nb;
							sf.innerHTML=nu;
						});
					}
				}

				setInterval(function (){
					if(paused)return;
					next();
				}, 1000);

				//拖拽部分
				oDiv.onmousedown=function (ev)
				{
					clearInterval(oContainer.timer);
					clearInterval(timerAuto);

					var oEvent=ev||event;
					var sx=oEvent.clientX;
					var sy=oEvent.clientY;
					var srx=rx;
					var sry=ry;

					document.onmousemove=function (ev)
					{
						var oEvent=ev||event;

						rx=srx+(oEvent.clientX-sx)/20;
						ry=sry+(oEvent.clientY-sy)/20;

						setStyle3(oContainer, 'transform', 'rotateX('+-ry+'deg) rotateY('+rx+'deg)');
					};

					document.onmouseup=function ()
					{
						document.onmousemove=null;
						document.onmouseup=null;

						var nx,ny;

						if(rx<-MAX_R)
							nx=-MAX_R;
						else if(rx>MAX_R)
							nx=MAX_R;
						else
							nx=rx;

						if(ry<-MAX_R)
							ny=-MAX_R;
						else if(ry>MAX_R)
							ny=MAX_R;
						else
							ny=ry;

						flex(oContainer, {rx: rx, ry: ry}, {rx: nx, ry: ny}, function (now){
							rx=now.rx;
							ry=now.ry;
							setStyle3(this, 'transform', 'rotateX('+-ry+'deg) rotateY('+rx+'deg)');
						}, function (){
							timerAuto=setInterval(autoRotate, 30);
						});
					};

					return false;
				};

				//自动转动
				function rnd(n,m, min)
				{
					var r=0;

					while(1)
					{
						r=Math.random()*Math.abs(m-n)+Math.min(n, m);
						if(Math.abs(r)>=Math.abs(min))
						{
							return r;
						}
					}
				}

				var S_INIT=0.14;
				var S_INIT_MIN=0.03;
				var vx=rnd(-S_INIT, S_INIT, S_INIT_MIN);
				var vy=rnd(-S_INIT, S_INIT, S_INIT_MIN);
				function autoRotate()
				{
					rx+=vx;
					ry+=vy;

					if(rx<=-MAX_R)
					{
						rx=-MAX_R;
						vx=rnd(0, S_INIT, S_INIT_MIN);
					}
					else if(rx>=MAX_R)
					{
						rx=MAX_R;
						vx=rnd(-S_INIT, 0, S_INIT_MIN);
					}

					if(ry<=-MAX_R)
					{
						ry=-MAX_R;
						vy=rnd(0, S_INIT, S_INIT_MIN);
					}
					else if(ry>=MAX_R)
					{
						ry=MAX_R;
						vy=rnd(-S_INIT, 0, S_INIT_MIN);
					}

					setStyle3(oContainer, 'transform', 'rotateX('+-ry+'deg) rotateY('+rx+'deg)');
				}
				var timerAuto=setInterval(autoRotate, 30);
			}
		}

		//页面滚动，看看是否滚到了时钟这里
		function fnEnter(){
			if(start)
			{
				start();
				start=null;
			}
			else paused=false;
		}

		function fnLeave(){
			paused=true;
		}

		function fnScroll(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			scrollTop+=document.documentElement.clientHeight;

			if(scrollTop>=oDiv.offsetTop)fnEnter();
			else fnLeave();
		}
		bindEvent(window, 'scroll', fnScroll);
		bindEvent(window, 'resize', fnScroll);
	};

	zns.site.fx.clock_3d._create_ele=function (oDiv)
	{
		var arr=[];

		arr.push('<div class="container">');
			for(var i=1;i<=8;i++)
			{
				if(i%3==0)
					arr.push('<span class="split"></span>');
				else
					arr.push(
					'<div class="num_container">'+
						'<ul>'+
							'<li class="clock_3d_front"><span>0</span></li>'+
							'<li class="clock_3d_back"><span>0</span></li>'+
							'<li class="clock_3d_top"><span>0</span></li>'+
							'<li class="clock_3d_bottom"><span>0</span></li>'+
						'</ul>'+
					'</div>');
			}
		arr.push('</div>');

		oDiv.innerHTML=arr.join('');
	};
})();zns.site.fx.index_3d={};

(function (){
	var flex=zns.site.fx.flex;
	var buffer=zns.site.fx.buffer;
	var linear=zns.site.fx.linear;
	var move3=zns.site.fx.move3;
	var mode='2d';
	var oTouch=null;
	var aMoveList=['.nav', '.index-slide', '.index-course', '.index-class-list', '.index-news', '#clock_3d', '.bottom'];
	var upList=[];
	var oContainer=null;
	var timerStage=null;

	zns.site.fx.index_3d.create=function ()
	{
		var _upList=['.nav', '.index-slide', '.index-course', '.index-class-list', '.index-news', '#clock_3d', '.bottom'];

		for(var i=0;i<_upList.length;i++)
		{
			map(getEle(_upList[i]), function (){
				upList.push(this);
			});
		}
	};

	zns.site.fx.index_3d.to3d=function (){
		if(!Modernizr.csstransforms3d || window.navigator.userAgent.toLowerCase().search('webkit')==-1)
		{
			alert('您的浏览器不支持3D特性，请升级浏览器');
			return;
		}

		if(mode=='3d')return;

		clearInterval(timerStage);

		//把所有需要3d化的元素拎出来
		oContainer=document.createElement('div');

		for(var i=0;i<aMoveList.length;i++)
		{
			var aEle=getEle(aMoveList[i]);

			for(var j=0;j<aEle.length;j++)
			{
				var oSpan=document.createElement('span');
				aEle[j].parentNode.replaceChild(oSpan, aEle[j]);
				aEle[j].znsPlaceHolder=oSpan;
				oContainer.appendChild(aEle[j]);
			}
		}

		document.body.appendChild(oContainer);

		setStyle3(document.body, 'transform-style', 'preserve-3d');
		setStyle3(oContainer, 'transform', 'perspective(1100px) rotateX(0) rotateZ(0)');
		setStyle3(oContainer, 'transform-style', 'preserve-3d');
		/*map(getEle('.slide_sm div a'), function (){
			this.style.display='block';
		});*/

		startUp();

		function startUp()
		{
			move3(oContainer, function (){
				setStyle3(oContainer, 'transform', 'perspective(1100px) rotateX(60deg) rotateZ(40deg)');
			}, function (){
				//可转动
				var g_x=40;
				var g_y=60;

				var s_x,s_y;
				var last_x,last_y,vx,vy;

				mode='3d';

				//竖起来
				var i=0;

				var timer=setInterval(function (){
					setStyle3(upList[i], 'transform-origin', 'bottom');
					move3(upList[i], function (){
						setStyle3(this, 'transform', 'rotateX(-40deg) rotateY(0)');
					}, function (){
						if(this==upList[upList.length-1])
						{
							alert('这么隐藏的功能居然被你发现了，用鼠标拖拖试试吧 ^_^');
							oTouch=addTouch(document, {down: function (x, y){
								s_x=x;
								s_y=y;

								last_x=x;
								last_y=y;

								clearInterval(timerStage);
							}, move: function (x, y){
								var _x=g_x-(x-s_x)/7;
								var _y=g_y-(y-s_y)/7;
								setStyle3(oContainer, 'transform', 'perspective(1100px) rotateX('+_y+'deg) rotateZ('+_x+'deg)');

								vx=x-last_x;
								vy=y-last_y;

								last_x=x;
								last_y=y;
							}, up: function (x, y){
								g_y-=(y-s_y)/7;
								g_x-=(x-s_x)/7;

								vx/=5;
								vy/=5;

								clearInterval(timerStage);
								timerStage=setInterval(function (){
									g_x-=vx;
									g_y-=vy;

									vx*=0.9;
									vy*=0.9;

									if(Math.abs(vx)<1)vx=0;
									if(Math.abs(vy)<1)vy=0;

									if(vx==0 && vy==0)clearInterval(timerStage);

									setStyle3(oContainer, 'transform', 'perspective(1100px) rotateX('+g_y+'deg) rotateZ('+g_x+'deg)');
								}, 30);
							}});
						}
					});

					i++;

					if(i>=upList.length)clearInterval(timer);
				}, 300);
			});
		}
	};

	zns.site.fx.index_3d.to2d=function (){
		if(mode=='2d')return;
		removeTouch(oTouch);

		clearInterval(timerStage);

		//倒下去
		var i=upList.length-1;

		var timer=setInterval(function (){
//			setStyle3(upList[i], 'transform-origin', 'bottom');
			move3(upList[i], function (){
				setStyle3(this, 'transform', 'rotateX(0deg) rotateY(0)');
			}, function (){
				setStyle3(this, 'transform', '');
				setStyle3(this, 'transform-origin', '');

				if(this==upList[0])
				{
					move3(oContainer, function (){
						setStyle3(this, 'transform', 'perspective(1100px) rotateX(0deg) rotateZ(0deg)');
					}, function (){
						//所有元素还原DOM位置
						while(oContainer.children.length)
						{
							var oChild=oContainer.children[0];
							oChild.znsPlaceHolder.parentNode.replaceChild(oChild, oChild.znsPlaceHolder);
							oChild.znsPlaceHolder=null;
						}

						setStyle3(document.body, 'transform-style', '');
						setStyle3(oContainer, 'transform', '');
						setStyle3(oContainer, 'transform-style', '');

						oContainer.parentNode.removeChild(oContainer);
						oContainer=null;

						mode='2d';
					});
				}
			});

			i--;

			if(i<0)clearInterval(timer);
		}, 300);
	};
})();zns.site.fx.index_nav={};

(function (){
	var flex=zns.site.fx.flex;

	zns.site.fx.index_nav.create=function (){
		var aLi=getEle('.navTxt a');
		var oDiv=getEle('.navTxt .hover')[0];

		var timer=null;

		var initLeft=oDiv.offsetLeft+4;

		for(var i=0;i<aLi.length;i++)
		{
			aLi[i].onmouseover=function ()
			{
				clearTimeout(timer);
				flex(oDiv, {left: oDiv.offsetLeft}, {left: this.offsetLeft}, function (now){
					oDiv.style.left=Math.round(now.left)+'px';
				});
				//oDiv.style.left=this.offsetLeft-3+'px';
			};
			aLi[i].onmouseout=function ()
			{
				clearTimeout(timer);
				timer=setTimeout(function (){
					flex(oDiv, {left: oDiv.offsetLeft}, {left: initLeft}, function (now){
						oDiv.style.left=Math.round(now.left)+'px';
					});
				}, 100);
			};
		}

	};
	zns.site.fx.index_nav.create_shadow=function ()
	{
		//busy
	};
})();zns.site.fx.yy_vote={};

(function (){
	var oDiv=null;
	var created=false;
	var flex=zns.site.fx.flex;
	var buffer=zns.site.fx.buffer;
	var ready=true;

	function s(obj, opacity)
	{
		obj.style.filter='alpha(opacity:'+opacity+')';
		obj.style.opacity=opacity/100;
	}

	zns.site.fx.yy_vote.createDOM=function ()
	{
		if(oDiv)
		{
			document.body.removeChild(oDiv);
		}

		oDiv=document.createElement('div');

		oDiv.className='countLayer';
		oDiv.id='countLayer';
		oDiv.innerHTML=
			'<div class="countTitleBox">'+
				'<h3 class="countTitle"></h3>'+
				'<a href="javascript:;" class="countClose"></a>'+
			'</div>'+
			'<div class="countContent">'+
				'<ul class="countList">'+
					'<li>'+
						'<a href="javascript:;" class="countLink">'+
							'<span class="poll">0</span>'+
							'<span class="countTxt">'+
							'HTML<br>+<br>CSS'+
							'</span>'+
							'<em class="couplet"></em>'+
						'</a>'+
					'</li>'+
					'<li>'+
						'<a href="javascript:;" class="countLink">'+
							'<span class="poll">0</span>'+
							'<span class="countTxt">JavaScript</span>'+
							'<em class="couplet"></em>'+
						'</a>'+
					'</li>'+
					'<li>'+
						'<a href="javascript:;" class="countLink">'+
							'<span class="poll">0</span>'+
							'<span class="countTxt">'+
							'HTML5<br>+<br>CSS3'+
							'</span>'+
							'<em class="couplet"></em>'+
						'</a>'+
					'</li>'+
				'</ul>'+
				'<p class="count_alerts"></p>'+
				'<div class="countBtns">'+
					'<a href="javascript:;" class="countBtn">投&nbsp;&nbsp;票</a>'+
				'</div>'+
				'<div class="countAbout">'+
					'<div class="countAboutCon">'+
						'<span class="countAboutTitle"></span>'+
						'<div id="ckepop" class="jiathis_style_32x32">'+
							'<a class="jiathis_button_tsina count_icons count_icon_sina"></a>'+
							'<a class="jiathis_button_tqq count_icons count_icon_tencent"></a>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';

		oDiv.style.display='none';

		document.body.appendChild(oDiv);

		setInterval(function (){
			var aSpan=getEle('#ckepop .jtico');

			for(var i=0;i<aSpan.length;i++)
			{
				aSpan[i].style.background='none';
			}
		}, 500);
	};

	var _showMsg;

	zns.site.fx.yy_vote.create=function ()
	{
		zns.site.fx.yy_vote.createDOM();

		created=true;

		//关闭按钮
		var oClose=getEle('.countClose', oDiv)[0];
		oClose.onclick=zns.site.fx.yy_vote.hide;

		//投票代码
		var voteContent='';
		var aContent=['css', 'js', 'html5'];
		var aA=getEle('.countList li a', oDiv);

		for(var i=0;i<aA.length;i++)
		{
			(function (index){
				aA[i].onclick=function ()
				{
					for(var i=0;i<aA.length;i++)
					{
						aA[i].className='countLink';
					}

					this.className='countLink countLink_y';
					voteContent=aContent[index];
				};
			})(i);
		}

		_showMsg=showMsg;
		function showMsg(str)
		{
			if(showMsg.showed)
			{
				buffer(oP, {opacity: 100}, {opacity: 0}, function (now){
					s(this, now.opacity);
				}, function (){
					oP.innerHTML=str;
					buffer(oP, {opacity: 0}, {opacity: 100}, function (now){
						s(this, now.opacity);
					});
					showMsg.showed=true;
				});
			}
			else
			{
				oP.innerHTML=str;
				buffer(oP, {opacity: 0}, {opacity: 100}, function (now){
					s(this, now.opacity);
				});
				showMsg.showed=true;
			}
		}
		showMsg.showed=false;

		//投票
		var oP=getEle('.count_alerts', oDiv)[0];
		var oBtn=getEle('.countBtn', oDiv)[0];

		oBtn.onclick=function ()
		{
			//组织URL
			request('/zpi/vote.php', {
				act:		'vote',
				id:			1,
				content:	voteContent
			}, function (data){
				showMsg('谢谢参与，我们会根据投票结果，安排下次YY公开课内容，让我们一起来期待。 ^_^');
				setTimeout(function (){
					zns.site.fx.yy_vote.hide();
				}, 4000);
			}, function (str){
				showMsg(str+'，感谢你的积极参与，如有问题请联系我们 :)');
			});
		};
	};

	zns.site.fx.yy_vote.show=function ()
	{
		if(!created)zns.site.fx.yy_vote.create();

		var oBg=getEle('.shadow_bg')[0];

		if(!ready)return;
		ready=false;

		//显示背景遮罩
		oBg.style.display='block';

		buffer(oBg, {opacity: 0}, {opacity:80}, function (now){
			oBg.style.filter='alpha(opacity:'+now.opacity+')';
			oBg.style.opacity=now.opacity/100;
		}, function (){
			//3D模式
			if(Modernizr.csstransforms3d)
			{
				oDiv.style.display='block';

				flex(oDiv, {opacity: 0, y: 2}, {opacity: 100, y: 1}, function (now){
					setStyle3(oDiv, 'transform', 'scaleY('+now.y+')');

					oDiv.style.opacity=now.opacity/100;
				}, function (){
					setStyle3(oDiv, 'transform', 'none');
					oDiv.style.opacity='1';

					ready=true;
				});
			}
			//2D模式
			else
			{
				oDiv.style.display='block';

				buffer(oDiv, {opacity: 0}, {opacity: 100}, function (now){
					oDiv.style.filter='alpha(opacity:'+now.opacity+')';
					oDiv.style.opacity=now.opacity/100;
				}, function (){
					oDiv.style.filer='';
					oDiv.style.opacity='1';

					ready=true;
				});
			}
		});

	};

	zns.site.fx.yy_vote.hide=function ()
	{
		var oBg=getEle('.shadow_bg')[0];

		if(!ready)return;
		ready=false;

		//3D模式
		if(Modernizr.csstransforms3d)
		{
			buffer(oDiv, {opacity: 100, y: 1}, {opacity: 0, y: 2}, function (now){
				setStyle3(oDiv, 'transform', 'scale('+now.y+', '+now.y+')');

				oDiv.style.opacity=now.opacity/100;
			}, function (){
				setStyle3(oDiv, 'transform', 'none');
				oDiv.style.opacity='0';

				hideShadow();

				oDiv.style.display='none';
			});
		}
		//2D模式
		else
		{
			buffer(oDiv, {opacity: 100}, {opacity: 0}, function (now){
				oDiv.style.filter='alpha(opacity:'+now.opacity+')';
				oDiv.style.opacity=now.opacity/100;
			}, function (){
				oDiv.style.filer='';
				oDiv.style.opacity='1';

				oDiv.style.display='none';

				hideShadow();
			});
		}

		function hideShadow()
		{
			//隐藏背景遮罩
			buffer(oBg, {opacity: 80}, {opacity:0}, function (now){
				oBg.style.filter='alpha(opacity:'+now.opacity+')';
				oBg.style.opacity=now.opacity/100;
			}, function (){
				oBg.style.display='none';
				ready=true;

				var oP=getEle('.count_alerts', oDiv)[0];

				oP.innerHTML='投票';
				_showMsg.showed=false;
				s(oP, 0);
			});
		}
	};
})();










zns.site.fx.news={};

(function (){
	var buffer=zns.site.fx.buffer;

	zns.site.fx.news.indexNewsCreate=function ()
	{
		zns.site.fx.news.create(getEle('.index-news')[0], _news_data, getEle('.index_bot_l h3 a')[1], getEle('.index_bot_l h3 a')[0], 7, true);
	};

	zns.site.fx.news.create=function (oUl, aData, oBtnPrev, oBtnNext, pageSize, autoPlay)
	{
		var pageCount=Math.ceil(aData.length/pageSize);
		var lastDir='down';	//上一次的方向

		function getPageData(page)
		{
			if(page<0 || page>=pageCount)return [];

			var arr=[];
			for(var i=page*pageSize;i<Math.min(aData.length, (page+1)*pageSize);i++)
			{
				arr.push({text: aData[i].title, time: time2day(aData[i].post_time), url: aData[i].url});
			}
			while(arr.length<pageSize)
			{
				arr.push({text: '', time: '', url: 'javascript:;'});
			}

			return arr;
		}

		//初始数据
		fillData(getPageData(0));

		//显示初始数据
		function fillData(arr)
		{
			oUl.innerHTML='';

			for(var i=0;i<arr.length;i++)
			{
				var oLi=document.createElement('li');

				oLi.innerHTML='<div><a href="'+arr[i].url+'" target="_blank">'+arr[i].text+'</a><span>'+arr[i].time+'</span><br><a href="#"></a><span></span></div><em></em>';

				oUl.appendChild(oLi);
			}
		}

		//翻页
		var now=0;

		oBtnNext.onclick=function ()
		{
			prevNext(true);
		};

		oBtnPrev.onclick=function ()
		{
			prevNext(false);
		};

		function prevNext(bNext)
		{
			if(bNext)
			{
				if(now==pageCount-1)return false;	//最后一页

				now++;
			}
			else
			{
				if(now==0)return false;

				now--;
			}

			if(lastDir=='down')
			{
				slide(getPageData(now), 'up');
				lastDir='up';
			}
			else
			{
				slide(getPageData(now), 'down');
				lastDir='down';
			}

			//更新按钮状态
			oBtnPrev.className='no_scrollLeft';
			oBtnNext.className='no_scrollRight';

			if(now<pageCount-1)	oBtnNext.className='scrollRight';
			if(now>0)	oBtnPrev.className='scrollLeft';

			return true;
		}

		//滚动
		function slide(arrNew,dir)
		{
			var aDiv=oUl.getElementsByTagName('div');

			for(var i=0;i<arrNew.length;i++)
			{
				var oA=aDiv[i].getElementsByTagName('a')[dir=='up'?1:0];
				var oSpan=aDiv[i].getElementsByTagName('span')[dir=='up'?1:0];

				oA.href=arrNew[i].url;
				oA.target='_blank';
				oA.innerHTML=arrNew[i].text;

				oSpan.innerHTML=arrNew[i].time;
			}

			var i=0;
			timer=setInterval(function (){
				(function (i){
					buffer(aDiv[i], {top: dir=='up'?0:-aDiv[i].offsetHeight/2}, {top: dir=='up'?-aDiv[i].offsetHeight/2:0}, function (now){
						aDiv[i].style.top=now.top+'px';
					});
				})(i);

				i++;

				if(i==aDiv.length)clearInterval(timer);
			}, 200);
		}
	};

	zns.site.fx.news.create_reply=function (news_id)
	{
		var oDiv=getEle('.reply_news')[0];
		var oPage=getEle('.reply_news .pages_news')[0];
		var oTxt=getEle('.reply_news .textarea_reply textarea')[0];
		var oBtn=getEle('.reply_news .textarea_reply .inputBox_reply input')[0];

		//发布留言
		oBtn.onclick=function ()
		{
			if(/^\s*$/.test(oTxt.value))
			{
				alert('请填写留言内容');
				return;
			}
			request('/zpi/news_msg.php', {act: 'add', msg: oTxt.value, news_id: news_id}, function (data){
				var oNewDiv=document.createElement('div');

				oNewDiv.innerHTML=
					'<dl>'+
						'<dt><img src="/images/user_pic/'+data.face+'" /></dt>'+
						'<dd>'+
							'<h3 class="userMessages">'+data.nick_name+'：</h3>'+
							'<p>'+oTxt.value+'</p>'+
						'</dd>'+
					'</dl>';

				oNewDiv.className='userReplay';

				oTxt.value='';

				oDiv.insertBefore(oNewDiv, oDiv.children[0]||null);
			});
		};

		function getPage(n)
		{
			request('/zpi/news_msg.php', {act: 'get_page', page: n, news_id: news_id}, function (data){
				var aDiv=getEle('.userReplay', oDiv);

				for(var i=aDiv.length-1;i>=0;i--)
				{
					oDiv.removeChild(aDiv[i]);
				}

				//alert(data.list.length);
				for(var i=0;i<data.list.length;i++)
				{
					var oNewDiv=document.createElement('div');

					if(data.list[i].reply)
					{
						oNewDiv.innerHTML=
							'<dl>'+
								'<dt><img src="/images/user_pic/'+data.list[i].face+'" /></dt>'+
								'<dd>'+
									'<h3 class="userMessages">'+data.list[i].nick_name+'：</h3>'+
									'<p>'+data.list[i].msg+'</p>'+
									'<div class="znsReply_news">'+
										'<h3>智能社的回复：</h3>'+
										'<p>'+data.list[i].reply+'</p>'+
									'</div>'+
								'</dd>'+
							'</dl>';
					}
					else
					{
						oNewDiv.innerHTML=
							'<dl>'+
								'<dt><img src="/images/user_pic/'+data.list[i].face+'" /></dt>'+
								'<dd>'+
									'<h3 class="userMessages">'+data.list[i].nick_name+'：</h3>'+
									'<p>'+data.list[i].msg+'</p>'+
								'</dd>'+
							'</dl>';
					}

					oNewDiv.className='userReplay';

					oDiv.insertBefore(oNewDiv, oPage);
				}
			});
		}

		function getPageCount()
		{
			request('/zpi/news_msg.php', {act: 'get_page_count', news_id: news_id}, function (data){
				//alert(data.count);
				if(data.count<=1)
				{
					oPage.style.display='none';
				}
				else
				{
					oPage.style.display='block';

					oPage.innerHTML='';
					for(var i=0;i<data.count;i++)
					{
						var oA=document.createElement('a');

						oA.index=i;
						oA.href='javascript:;';
						oA.innerHTML=i+1;

						oA.onclick=function ()
						{
							getPage(this.index+1);

							for(var i=0;i<oPage.children.length;i++)
							{
								oPage.children[i].className='';
							}
							this.className='active';
						};

						oPage.appendChild(oA);
					}

					oPage.children[0].className='active';
				}
			});
		}

		getPage(1);
		getPageCount();
	};
})();











zns.site.fx.index_ppt={};

(function (){
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;
	var linear=zns.site.fx.linear;

	var pause=false;

	zns.site.fx.index_ppt.pause=function ()
	{
		pause=true;
	};
	zns.site.fx.index_ppt.gotoPlay=function ()
	{
		pause=false;
	};

	zns.site.fx.index_ppt.create=function (aImgPath, aHref){
		var oA=getEle('.index-slide a')[0];

		oA.href=aHref[0];

		var oDiv=getEle('.index-slide .index-slide-img')[0];

		//正式开始
		var oPrev=getEle('#prev_active')[0];
		var oNext=getEle('#next_active')[0];
		var aBtn=getEle('.index-slide .index-number a');

		var now=0;
		var ready=true;
		var W=oDiv.offsetWidth;
		var H=oDiv.offsetHeight;

		var autoTimer=null;

		//左右按钮移入移出
		oPrev.opacity=oNext.opacity=0;
		oPrev.onmouseover=oPrev.onmouseout=oNext.onmouseover=oNext.onmouseout=function (ev)
		{
			var oEvent=ev||event;
			moveBtnOpacity(this, oEvent.type.toLowerCase()=='mouseover'?100:0);
		};

		//小圆点移入移出
		map(aBtn, function (i){
			this.opacity=0;
			this.onmouseover=this.onmouseout=function (ev)
			{
				var oEvent=ev||event;
				//if(this.className!='active')
					//moveBtnOpacity(this, oEvent.type.toLowerCase()=='mouseover'?100:0);
			}
		});

		oDiv.onmouseover=function ()
		{
			clearInterval(autoTimer);
		};
		oDiv.onmouseout=function ()
		{
			autoTimer=setInterval(function (){
				oNext.onclick&&oNext.onclick();
			}, 8000);
		};
		oDiv.onmouseout();

		function tabABtn(index)
		{
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className='';
				//moveBtnOpacity(aBtn[i], 0);
			}
			aBtn[index].className='active';
			//moveBtnOpacity(aBtn[index], 100);
		}

		if(Modernizr.csstransforms3d)
		{
			(function (){
				//3d爆炸效果
				if(!oDiv)return;

				map(aBtn, function (i){
					this.onclick=function ()
					{
						tabExplode(i);
					};
				});

				oPrev.onclick=function (){
					tabExplode((now+aBtn.length-1)%aBtn.length);
				};
				oNext.onclick=function (){
					tabExplode((now+1)%aBtn.length);
				};

				//爆炸
				function tabExplode(index)
				{
					if(pause)return;
					if(now==index)return;
					if(!ready)return;
					ready=false;

					var R=3;
					var C=6;

					var cw=W/2;
					var ch=H/2;

					tabABtn(index);

					oDiv.innerHTML='';
					oDiv.style.background='url('+aImgPath[index]+') no-repeat';
					oDiv.href=aHref[index];
					if(aHref[index].indexOf('javascript:')==0)
					{
						oDiv.target='_self';
					}
					else
					{
						oDiv.target='_blank';
					}

					var aData=[];

					var wait=R*C;

					for(var i=0;i<R;i++)
					{
						for(var j=0,k=0;j<C;j++,k++)
						{
							aData[i]={left: W*j/C, top: H*i/R};
							(function (){
								var oNewDiv=document.createElement('div');

								setStyle(oNewDiv, {
									position: 'absolute',
									background: 'url('+aImgPath[now]+')'+-aData[i].left+'px '+-aData[i].top+'px no-repeat',
									width:Math.ceil(W/C)+'px', height: Math.ceil(H/R)+'px',
									left: aData[i].left+'px', top: aData[i].top+'px'
								});
								setStyle3(oNewDiv, 'transition', '0.5s all ease-out');

								oDiv.appendChild(oNewDiv);

								var l=((aData[i].left+W/(2*C))-cw)*rnd(2,3)+cw-W/(2*C);
								var t=((aData[i].top+H/(2*R))-ch)*rnd(2,3)+ch-H/(2*R);

								setTimeout((function (oNewDiv,l,t){
									return function ()
									{
										setStyle(oNewDiv, {left: l+'px', top: t+'px', opacity: 0});

										function tEnd(ev){
											if(--wait==0)
											{
												ready=true;
												now=index;
											}

											oNewDiv.style.display='none';
											setTimeout(function (){
												oNewDiv.parentNode&&oNewDiv.parentNode.removeChild(oNewDiv);
											}, 500);
										}

										zns.site.fx.addEnd(oNewDiv, tEnd);

										setTimeout(function (){
											if(oNewDiv)
											{
												ready=true;
												now=index;
												oNewDiv.parentNode&&oNewDiv.parentNode.removeChild(oNewDiv);
											}
										}, 700);

										setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateX('+rnd(-180, 180)+'deg) rotateY('+rnd(-180, 180)+'deg) rotateZ('+rnd(-180, 180)+'deg) scale('+rnd(1.5, 3)+')');
									};
								})(oNewDiv,l,t), rnd(0, 200));
							})();
						}
					}
				}
			})();
		}
		else
		{
			//滑动
			(function (){
				//修正结构
				var oAImg=getEle('.slide .slide_img')[0];

				var oUl=document.createElement('ul');
					oUl.style.cssText=sprintf('position:absolute; left:0; top:0; width:%1px; height:%2px;', W, H);

				for(var i=0;i<aImgPath.length;i++)
				{
					var oLi=document.createElement('li');
						oLi.style.cssText=sprintf('float:left; width:%1px; height:%2px; background:url(%3) no-repeat;', W, H, aImgPath[i]);
						oUl.appendChild(oLi);
				}

				oAImg.appendChild(oUl);
				oAImg.style.overflow='hidden';
				oAImg.style.background='none';

				var aLi=oUl.getElementsByTagName('li');

				oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';

				function tab(index)
				{
					buffer(oUl, {left: oUl.offsetLeft}, {left: -index*aLi[0].offsetWidth}, function (now){
						this.style.left=now.left+'px';
					}, function (){
						this.style.left=-index*aLi[0].offsetWidth+'px';
						oAImg.href=aHref[index];
						if(aHref[index].indexOf('javascript:')==0)
						{
							oAImg.target='_self';
						}
						else
						{
							oAImg.target='_blank';
						}
					});

					tabABtn(index);

					now=index;
				}

				//添加事件
				map(aBtn, function (i){
					this.onclick=function ()
					{
						tab(i);
					};
				});

				oPrev.onclick=function (){
					tab((now+aBtn.length-1)%aBtn.length);
				};
				oNext.onclick=function (){
					tab((now+1)%aBtn.length);
				};
			})();
		}
	}

	function moveBtnOpacity(obj, opacity)
	{
		buffer(obj, {opacity: obj.opacity}, {opacity: opacity}, function (now){
			this.opacity=now.opacity;
			this.style.opacity=now.opacity/100;
			this.style.filter='alpha(opacity:'+now.opacity+')';
		}, null, 12);
	}
})();zns.site.fx.fast_nav={};

(function (){
	var flex=zns.site.fx.flex;
	var buffer=zns.site.fx.buffer;

	var aDataFastNav=
	[
		//开班信息
		[
			'JS周末班 2012年10月13日开班&nbsp;&nbsp;[已开班]',
			'JS全日制 2012年10月19日开班&nbsp;&nbsp;&nbsp;&nbsp;<a href="contact.html">[咨询]</a>',
			'HTML5周末班 2012年10月21日开班 <a href="contact.html">[咨询]</a>',
			'JS周末班 2012年11月17日开班&nbsp;&nbsp;&nbsp;&nbsp;<a href="contact.html">[咨询]</a>'
		],
		//最新留言
		[
			'<a href="message.html">老师 这个留言板分页 鼠标移动上去 就...</a>',
			'<a href="message.html">看到16集里说会开远程教学，不知道是不...</a>',
			'<a href="message.html">这个站做的真的很牛逼呀，貌似后台都是...</a>',
			'<a href="message.html">现在有没有能加上的Q群啊blue老湿</a>'
		],
		//常见问题
		[
			'<a href="js02_desc.html#zns_zt_content">JS课程包括哪些内容？</a>',
			'<a href="html5_01_desc.html#zns_zt_content">HTML5课程包括哪些内容？</a>',
			'<a href="js02_desc.html#zns_zt_content">课程收费是多少？</a>',
			'<a href="contact.html">我想去学习，如何报名呢？</a>'
		],
		//综合其他
		[
			'<a href="http://www.zhinengshe.com/news/4.html">积分系统上线</a>',
			'<a href="http://www.zhinengshe.com/news/1.html">邀请码系统开始公测</a>',
			'<a href="http://zhinengshe.com/video.html">视频教程，已更新到第31集</a>',
			'<a href="http://zhinengshe.com/contact.html">智能社联系方式</a>'
		]
	];

	zns.site.fx.fast_nav.createDOM=function (aData)
	{
		function createUl(data)
		{
			var arr=[];

			for(var i=0;i<data.length;i++)
			{
				arr.push('<li>'+data[i]+'</li>');
			}

			return '<ul>'+arr.join('')+'</ul>';
		}

		var oDiv=document.createElement('div');
		oDiv.className='fast_nav';

		oDiv.innerHTML=
			'<div class="fastNav_close" title="关闭"></div>'+
			'<img src="http://www.zhinengshe.com/images/fast_nav.png" class="fast_navImg" alt="" />'+
			'<div class="fastNavBox_tran_01">'+
    			'<div class="fastNavBox fastNav_lt">'+
        			'<div class="hr_27"></div>'+
        			'<h3 class="fastCom_title_l">近期开班信息</h3>'+
            		'<div class="hr_15"></div>'+
            		createUl(aData[0])+
				'</div>'+
			'</div>'+
			'<div class="fastNavBox_tran_02">'+
				'<div class="fastNavBox fastNav_rt">'+
					'<div class="hr_27"></div>'+
					'<h3 class="fastCom_title_r">最新留言</h3>'+
					'<div class="hr_15"></div>'+
					createUl(aData[1])+
				'</div>'+
			'</div>'+
			'<div class="fastNavBox_tran_03">'+
				'<div class="fastNavBox fastNav_lb">'+
					'<div class="problem">'+
						'<div class="hr_25"></div>'+
						createUl(aData[2])+
					'</div>'+
					'<div class="hr_27"></div>'+
					'<h3 class="fastCom_title_l">常见问题</h3>'+
				'</div>'+
			'</div>'+
			'<div class="fastNavBox_tran_04">'+
				'<div class="fastNavBox fastNav_rb">'+
					'<div class="problem">'+
						'<div class="hr_25"></div>'+
						createUl(aData[3])+
					'</div>'+
					'<div class="hr_27"></div>'+
					'<h3 class="fastCom_title_r">综合其他</h3>'+
				'</div>'+
			'</div>';

		document.body.appendChild(oDiv);

		//fast_nav_bg
		(function (){
			var oDiv=document.createElement('div');

			oDiv.className='fast_nav_bg';
			oDiv.innerHTML='<img src="'+_g_path+'images/login_layerBg.png" alt="" />';

			document.body.appendChild(oDiv);
		})();
	};

	zns.site.fx.fast_nav.create=function ()
	{
		if(zns.site.fx.browser_test.IE6)
		{
			return;
		}
		zns.site.fx.fast_nav.createDOM(aDataFastNav);


		var oDiv=getEle('.fast_nav')[0];
		var oOpenBtn=getEle('img', oDiv)[0];
		var oCloseBtn=getEle('.fastNav_close')[0];
		var opened=false;
		var ready=true;

		function openFast(fnEnd)
		{
			if(!ready)return;
			ready=false;

			var oBg=getEle('.fast_nav_bg')[0];

			oBg.style.display='block';
			buffer(oBg, {opacity: 0}, {opacity: 80}, function (now){
				this.style.filter='alpha(opacity: '+now.opacity+')';
				this.style.opacity=now.opacity/100;
			}, null, 6);

			flex(oDiv, {right: 60, top: 50}, {right: document.documentElement.clientWidth/2, top: document.documentElement.clientHeight/2}, function (now){
				oDiv.style.right=now.right+'px';
				oDiv.style.top=now.top+'px';
			}, function (){
				oDiv.style.right='50%';
				oDiv.style.top='50%';

				//开始展开四个小片
				var aDiv=getEle('.fastNavBox_tran_0\\d', oDiv);
				var tmp=aDiv[2];
				aDiv[2]=aDiv[3];
				aDiv[3]=tmp;

				var w=301;
				var h=187;
				var start=[
					{left: 0, top: h, opacity: 0},
					{left: -w, top: 0, opacity: 0},
					{left: 0, top: -h, opacity: 0},
					{left: w, top: 0, opacity: 0}
				];

				for(var i=0;i<aDiv.length;i++)
				{
					aDiv[i].index=i;
					aDiv[i].onclick=function (ev)
					{
						(ev||event).cancelBubble=true;
					};
				}

				move(aDiv[0], start[0], {left: 0, top: 0, opacity: 100});
				function move(obj, _start, _end)
				{
					obj.style.display='block';

					buffer(obj.children[0], _start, _end, function (now){
						//alert(now.left);
						this.style.left=now.left+'px';
						this.style.top=now.top+'px';
						this.style.filter='alpha(opacity:'+now.opacity+')';
						this.style.opacity=now.opacity/100;
					}, function (){
						if(obj.index<aDiv.length-1)
						{
							move(aDiv[obj.index+1], start[obj.index+1], {left: 0, top: 0, opacity: 100});
						}
						else
						{
							oCloseBtn.style.display='block';
							opened=true;
							fnEnd&&fnEnd();

							ready=true;
						}
					}, 4);
				}
			}, 3, 0.6);
		}

		function closeFast(fnEnd)
		{
			if(!ready)return;
			ready=false;

			oCloseBtn.style.display='none';
			var aDiv=getEle('.fastNavBox_tran_0\\d', oDiv);
			var tmp=aDiv[2];
			aDiv[2]=aDiv[3];
			aDiv[3]=tmp;

			var w=301;
			var h=187;
			var end=[
				{left: 0, top: h, opacity: 0},
				{left: -w, top: 0, opacity: 0},
				{left: 0, top: -h, opacity: 0},
				{left: w, top: 0, opacity: 0}
			];

			for(var i=0;i<aDiv.length;i++)
			{
				aDiv[i].index=i;
			}

			move(aDiv[3], {left: 0, top: 0, opacity: 100}, end[3]);
			function move(obj, _start, _end)
			{
				buffer(obj.children[0], _start, _end, function (now){
					//alert(now.left);
					this.style.left=now.left+'px';
					this.style.top=now.top+'px';
					this.style.filter='alpha(opacity:'+now.opacity+')';
					this.style.opacity=now.opacity/100;
				}, function (){
					obj.style.display='none';

					if(obj.index>0)
					{
						move(aDiv[obj.index-1], {left: 0, top: 0, opacity: 100}, end[obj.index-1]);
					}
					else
					{
						var oBg=getEle('.fast_nav_bg')[0];

						buffer(oBg, {opacity: 80}, {opacity: 0}, function (now){
							this.style.filter='alpha(opacity: '+now.opacity+')';
							this.style.opacity=now.opacity/100;
						}, function (){
							oBg.style.display='none';
						}, 6);

						flex(oDiv, {right: document.documentElement.clientWidth/2, top: document.documentElement.clientHeight/2}, {right: 60, top: 50}, function (now){
							oDiv.style.right=now.right+'px';
							oDiv.style.top=now.top+'px';
						}, function (){
							opened=false;
							fnEnd&&fnEnd();

							ready=true;
						}, 3, 0.6);
					}
				}, 4);
			}
		}

		oOpenBtn.onclick=function ()
		{
			!opened?openFast():closeFast();
		};
		oCloseBtn.onclick=function ()
		{
			closeFast();
		};
	};
})();zns.site.fx.class_list={};

(function (){
	var linear=zns.site.fx.linear;

	zns.site.fx.class_list.create=function ()
	{
		var aDiv=getEle('.courseBox .courseTitle div');

		function rnd(min, max)
		{
			return Math.floor(Math.random()*(max-min))+min;
		}

		for(var i=0;i<aDiv.length;i++)
		{
			(function (i){
				var fadeIn=true;

				function doOpt()
				{
					if(fadeIn)
					{
						linear(aDiv[i], {opacity: 0}, {opacity: 100}, function (now){
							this.style.filter='alpha(opacity:'+now.opacity+')';
							this.style.opacity=now.opacity/100;
						});
					}
					else
					{
						linear(aDiv[i], {opacity: 100}, {opacity: 0}, function (now){
							this.style.filter='alpha(opacity:'+now.opacity+')';
							this.style.opacity=now.opacity/100;
						});
					}

					fadeIn=!fadeIn;
					setTimeout(doOpt, rnd(3, 7)*1000);
				}

				setTimeout(doOpt, rnd(3, 7)*1000);
			})(i);
		}
	};
})();// JavaScript Document

zns.site.fx.message={};

(function (){
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;

	//创建一个留言div
	zns.site.fx.message._createDiv=function (sTitle, sContent, sReply, iReplyTime, id, iTime, face_m)
	{
		sContent+='';
		var oDiv=document.createElement('div');

		var sTime=time2date(iTime);
		var aTime=sTime.split(' ');

		if(sReply)
		{
			var sReplyTime=time2date(iReplyTime);
			var aReplyTime=sReplyTime.split(' ');

			var reply='<p class="zns_reply">智能社的回复：<br />'+(sReply+'').replace(/\n/g, '<br/>')+'<br/><span class="time">'+aReplyTime[0]+'<em></em>'+aReplyTime[1]+'</span></p>';
		}
		else
			var reply='';

		//各种div的信息和innerHTML
		oDiv.className='list';
		oDiv.innerHTML=
			'<div class="name_time">'+
				'<span class="userName">'+sTitle+'</span>'+
				'<span class="time">'+aTime[0]+'<em></em>'+aTime[1]+'</span>'+
			'</div>'+
			'<div class="userHead">'+
				'<img src="images/user_pic/'+face_m+'" alt="userHead" />'+
			'</div>'+
			'<div class="userCon">'+
				'<p>'+(sContent+'').replace(/\n/g, '<br/>')+'</p>'+
				reply+
			'</div>';


		oDiv.getElementsByTagName('img')[0].onerror=function ()
		{
		        this.src='images/user_pic/userPic.png';
		};

		var oParent=getEle('.comMain .leAreaCon')[0];
		while(oParent.children.length>=5)
		{
			oParent.removeChild(oParent.children[oParent.children.length-1]);
		}

		return oDiv;
	};
	zns.site.fx.message.create=function ()
	{
		var Msg=zns.site.fx.message;

		var oTxt1=document.getElementById('txt_title');
		var oTxt2=document.getElementById('txt_content');
		var oBtn=document.getElementById('btn_submit');

		var iInitHeight=oTxt2.scrollHeight-4;

		oBtn.onclick=fnClick;

		function fnClick()
		{
			var allSp=/^\s*$/;
			if(allSp.test(oTxt1.value) || allSp.test(oTxt2.value) || oTxt1.value=='输入标题' || oTxt2.value=='留言内容（可输入多行）')
			{
				alert('要填全才能发出去 ^_^');
				return;
			}
			oBtn.onclick=null;
			Msg.postMsg(oTxt1.value, oTxt2.value, function (){
				oTxt1.value='';
				oTxt2.value='';

				zns.site.fx.zns_placeholder.remove(oHolder1);
				zns.site.fx.zns_placeholder.remove(oHolder2);
				oHolder1=zns.site.fx.zns_placeholder.create(document.getElementById('txt_title'), '输入标题', '#999');
				oHolder2=zns.site.fx.zns_placeholder.create(document.getElementById('txt_content'), '留言内容（可输入多行）', '#999');
				oBtn.onclick=fnClick;
			});
		}

		oTxt2.oninput=function ()
		{
			this.style.height=this.scrollHeight-4+'px';
			setTimeout(function (){
				oTxt2.scrollTop=0;
			}, 0);
		};

		oTxt2.onfocus=function ()
		{
			this.style.height=this.scrollHeight-4+'px';
		};

		oTxt2.onblur=function ()
		{
			this.style.height=iInitHeight+'px';
		};

		Msg.loadMsgPage();
		Msg.loadMsg();

		//加入placeholder
		var oHolder1=zns.site.fx.zns_placeholder.create(document.getElementById('txt_title'), '输入标题', '#999');
		var oHolder2=zns.site.fx.zns_placeholder.create(document.getElementById('txt_content'), '留言内容（可输入多行）', '#999');
	};
	//加入动画效果
	if(Modernizr.csstransforms3d)
	{
		var aniItem=function (oDiv)
		{
			var iHeight=oDiv.offsetHeight;

			oDiv.style.height=0;
			setStyle3(oDiv, 'transform', 'perspective(1000px) rotateX(180deg) translateZ(100px) scale(0.9)');
			oDiv.style.filter='alpha(opacity:0)';
			oDiv.style.opacity=0;

			buffer(oDiv, {h: 0}, {h: iHeight}, function (now){
				oDiv.style.height=now.h+'px';
			}, function (){
				flex(oDiv, {x: 180, opacity: 0}, {x: 0, opacity: 100}, function (now){
					setStyle3(oDiv, 'transform', 'perspective(1000px) rotateX('+now.x+'deg) translateZ(100px) scale(0.9)');
					oDiv.style.filter='alpha(opacity:'+now.opacity+')';
					oDiv.style.opacity=now.opacity/100;
				}, function (){
					//去掉各种效果，防止慢
					setStyle3(oDiv, 'transition', 'none');
					setStyle3(oDiv, 'transform', 'none');
				}, 12, 0.74);
			});
		}
	}
	else
	{
		var aniItem=function (oDiv)
		{
			var iHeight=oDiv.offsetHeight;

			oDiv.style.height=0;
			oDiv.style.filter='alpha(opacity:0)';
			oDiv.style.opacity=0;

			flex(oDiv, {height: 0, alpha: 0}, {height: iHeight, alpha: 100}, function (now){
				oDiv.style.height=now.height+'px';
				oDiv.style.filter='alpha(opacity:'+now.alpha+')';
			oDiv.style.opacity=now.alpha/100;
			});
		}
	}

	//发布一条留言
	zns.site.fx.message.postMsg=function (sTitle, sContent, fnSucc){
		var oDiv=getEle('.comMain .leAreaCon')[0];
		var createDiv=zns.site.fx.message._createDiv;
		var sFace='';

		if(zns.site.user.curUser)
			sFace=zns.site.user.curUser.face_m;
		else
			sFace='userPic.png';

		//提交到服务器
		zns.site.z.siteMessage.add(sTitle, sContent, function (data){
			var oNewDiv=createDiv(sTitle, sContent, data.reply, data.reply_time, data.ID, data.post_time, sFace);

			insertItem(oNewDiv);
			aniItem(oNewDiv);

			fnSucc&&fnSucc();
		}, function (desc){
			alert('留言提交失败，请稍后重试：'+desc);
		});

		//插入Li
		function insertItem(oNewDiv)
		{
			/*var oPre=getEle('.hr_20', oDiv)[0];

			oDiv.insertBefore(oNewDiv, oPre.nextElementSibling||oPre.nextSibling);
			*/

			var aDiv=getEle('.list', oDiv);

			if(aDiv.length)
				oDiv.insertBefore(oNewDiv, aDiv[0]);
			else
				oDiv.appendChild(oNewDiv);

			for(var i=aDiv.length-1;i>=5;i--)
			{
				oDiv.removeChild(aDiv[i]);
			}
		}
	};
	var ready=true;
	var nowPage=1;

	if(window.location.hash)
	{
		/p=(\d+)\b/i.test(window.location.hash);
		if(!isNaN(RegExp.$1))
		{
			nowPage=Math.max(1, parseInt(RegExp.$1));
		}
	}
	//获取留言页码
	zns.site.fx.message.loadMsgPage=function (){
		/*if(!ready)return;
		ready=false;*/

		zns.site.z.siteMessage.get_page_count(function (data){
			genPager(data.count);

			function genPager(count)
			{
				var aPage=getEle('.page');
				var aA=[];

				for(var p=0;p<aPage.length;p++)
				{
					aA[p]=[];
					var oPage=aPage[p];

					//创建各个页码
					oPage.innerHTML='';

					//←箭头
					var oLeft=document.createElement('a');
					oLeft.href='javascript:;';
					oLeft.innerHTML='&lt;';
					oPage.appendChild(oLeft);
					oLeft.onclick=function ()
					{
						nowPage--;
						if(nowPage<1) return nowPage=1;
						_tab();
					};

					//中间的东西
					var min=Math.max(0, nowPage-1-4);
					var max=Math.min(min+8,count);

					for(var i=min;i<max;i++)
					{
						var oA=document.createElement('a');

						oA.href='javascript:;';
						oA.innerHTML=i+1;
						oA.index=i;
						if(i==nowPage-1)oA.className='active';

						oA.onclick=function ()
						{
							if(this.index==nowPage-1)return;
							nowPage=this.index+1;

							_tab();
						};

						oPage.appendChild(oA);

						aA[p].push(oA);
					}

					//→箭头
					var oRight=document.createElement('a');
					oRight.href='javascript:;';
					oRight.innerHTML='&gt;';
					oPage.appendChild(oRight);
					oRight.onclick=function ()
					{
						nowPage++;
						if(nowPage>count) return nowPage=count;
						_tab();
					};

					function _tab()
					{
						genPager(count);
						zns.site.fx.message.loadMsg(true);

						window.location='#p='+nowPage;
					}
				}

				//ready=true;
			}
		}, function (desc){
			//alert('获取页码错误：'+desc);
			if(window.console && console.log)
				console.log('获取页码错误：'+desc);
		});
	};
	//获取留言信息、以及换页效果
	zns.site.fx.message.loadMsg=function (noFirstTime){
		if(!ready)return;
		ready=false;

		zns.site.z.siteMessage.get_page(nowPage, function (data){
			var oDiv=getEle('.comMain .leAreaCon')[0];

			if(noFirstTime)
			{
				var aDiv=getEle('.list', oDiv);

				var i=data.list.length-1;
				//var i=0;

				/*if(aDiv.length!=data.list.length)alert('需要完善');

				var timer=setInterval(function (){
					aDiv[i].style.WebkitTransform='perspective(1000px) rotateX(0deg) translateZ(100px) scale(0.9)';
					aDiv[i].i=i;
					var waitMod=true;
					buffer(aDiv[i], {x: 0, opacity: 1}, {x: 360, opacity: -1}, function (now){
						this.style.WebkitTransform='perspective(1000px) rotateX('+now.x+'deg) translateZ(100px) scale(0.9)';
						this.style.opacity=Math.abs(now.opacity);

						if(now.opacity<0 && waitMod)
						{
							waitMod=false;
//							alert(this.i);
							var sTime=time2date(data.list[this.i].post_time);
							var aTime=sTime.split(' ');

							getEle('.userName', this)[0].innerHTML=data.list[this.i].title;
							getEle('.time', this)[0].innerHTML=aTime[0]+'<em></em>'+aTime[1];
							getEle('.userHead img', this)[0].src=data.list[this.i].face;
							getEle('.userCon p', this)[0].innerHTML=data.list[this.i].content;
						}
					}, function (){
						this.style.WebkitTransform='';

						if(this==aDiv[0])ready=true;
					}, 15);
					i--;

					if(i<0)
					{
						clearInterval(timer);
					}
				}, 400);*/

				function inner(){
					if(!data.list[i].face_m)data.list[i].face_m='userPic.png';
					var oNewDiv=zns.site.fx.message._createDiv(data.list[i].title, data.list[i].content, data.list[i].reply, data.list[i].reply_time, data.list[i].ID, data.list[i].post_time, data.list[i].face_m);

					oDiv.insertBefore(oNewDiv, oDiv.firstChild);
					aniItem(oNewDiv);
					i--;

					if(i<0)
					{
						clearInterval(timer);
						ready=true;
					}
				}
				if(Modernizr.csstransforms3d)
				{
					var timer=setInterval(inner, 80);
				}
				else
				{
					var timer=setInterval(inner, 500);
				}
				inner();
			}
			else
			{
				for(var i=0;i<data.list.length;i++)
				{
					if(!data.list[i].face_m)data.list[i].face_m='userPic.png';
					var oNewDiv=zns.site.fx.message._createDiv(data.list[i].title, data.list[i].content, data.list[i].reply, data.list[i].reply_time, data.list[i].ID, data.list[i].post_time, data.list[i].face_m);

					oDiv.appendChild(oNewDiv);
				}
				ready=true;
			}
		}, function (){
			//alert(desc);
			if(window.console && window.console.log)
				console.log(desc);
		});
	};
})();zns.site.fx.product_full={};

if(Modernizr.csstransforms3d)
{
	//3d模式
	(function (){
		var flex=zns.site.fx.flex;
		var buffer=zns.site.fx.buffer;

		zns.site.fx.product_full.create=function (aPic, fnHide)
		{
			var oDiv=getEle('.proListFull')[0];

			if(!oDiv)return;

			var oBg=getEle('.bg', oDiv)[0];
			var oBtnClose=getEle('.btn_close', oDiv)[0];
			var aLi=oDiv.getElementsByTagName('li');
			var aUl=oDiv.getElementsByTagName('ul');

			var aBtns=getEle('.btnLink,.listTitle', oDiv);
			var oAboutFull=getEle('.proListFull .btn_about')[0];

			var oBtnLeft=getEle('.proListFull a')[1];
			var oBtnRight=getEle('.proListFull a')[2];

			var ready=false;

			//关闭按钮
			oBtnClose.onclick=function ()
			{
				if(!ready)return;
				ready=false;

				for(var i=0;i<aBtns.length;i++)
					aBtns[i].style.opacity=0;

				zns.site.fx.addEnd(aBtns[0], function (){
					var i=aLi.length-1;

					var timer=setInterval(function (){
						buffer(aLi[i], {x: 0, y: 0}, {x: -180, y: -10}, function (now){
							setStyle3(this, 'transform', 'perspective(1000px) translateY('+now.y+'px) rotateX('+now.x+'deg)');
						}, function (){
							if(this==aLi[0])
							{
								//下一步
								oBg.style.display='block';
								oDiv.style.background='none';

								buffer(oBg, {w: oBg.offsetWidth, opacity: 100}, {w: 0, opacity: 0}, function (now){
									oBg.style.width=oBg.style.height=now.w+'px';
									oBg.style.marginRight=-now.w/2+'px';
									oBg.style.marginTop=-now.w/2+'px';

									oBg.style.filter='alpha(opacity:'+now.opacity+')';
									oBg.style.opacity=now.opacity/100;
								}, function (){
									buffer(oBtnClose, {rotate: 0}, {rotate: 90}, function (now){
										setStyle3(this, 'transform', 'rotate('+now.rotate+'deg)');
									}, fnHide);
								});
							}
							this.parentNode.removeChild(this);
						}, 12);

						i--;
						if(i<0)clearInterval(timer);
					}, 170);
				});
			};

			oBtnRight.onclick=function ()
			{
				if(!ready)return;
				ready=false;

				aUl[0].className='l3';
				aUl[1].className='l2';
				aUl[2].className='l1';
				aUl[3].className='r1';
				aUl[4].className='r2';

				zns.site.fx.addEnd(aUl[4], function (){
					for(var i=0;i<aUl.length-1;i++)
					{
						aUl[i].innerHTML='';
						while(aUl[i+1].children.length)
							aUl[i].appendChild(aUl[i+1].children[0]);
					}

					for(var i=0;i<aUl.length;i++)
						setStyle3(aUl[i], 'transition', 'none');
					aUl[0].className='l2';
					aUl[1].className='l1';
					aUl[2].className='r1';
					aUl[3].className='r2';
					aUl[4].className='r3';

					aUl[3].innerHTML='';

					var timer=null;

					timer=setInterval(function (){
						var oLi=createLi();

						aUl[3].appendChild(oLi);

						expLi(oLi, function (){
							if(this==aUl[3].children[2])
							{
								for(var i=0;i<aUl.length;i++)
									setStyle3(aUl[i], 'transition', '1s all ease');

								ready=true;
							}
						});

						if(aUl[3].children.length==3)clearInterval(timer);
						//aUl[4].children[i].style.WebkitTransition='';
					}, 100);
				});
			};

			oBtnLeft.onclick=function ()
			{
				if(!ready)return;
				ready=false;

				aUl[0].className='l1';
				aUl[1].className='r1';
				aUl[2].className='r2';
				aUl[3].className='r3';

				zns.site.fx.addEnd(aUl[3], function (){
					for(var i=aUl.length-2;i>0;i--)
					{
						aUl[i].innerHTML='';
						while(aUl[i-1].children.length)
							aUl[i].appendChild(aUl[i-1].children[0]);
					}


					for(var i=0;i<aUl.length;i++)
						setStyle3(aUl[i], 'transition', 'none');
					aUl[0].className='l2';
					aUl[1].className='l1';
					aUl[2].className='r1';
					aUl[3].className='r2';

					aUl[0].innerHTML='';

					var timer=null;

					timer=setInterval(function (){
						var oLi=createLi();

						aUl[0].appendChild(oLi);

						expLi(oLi, function (){
							if(this==aUl[0].children[2])
							{
								for(var i=0;i<aUl.length;i++)
									setStyle3(aUl[i], 'transition', '1s all ease');

								ready=true;
							}
						});

						if(aUl[0].children.length==3)clearInterval(timer);
					}, 100);
				});
			};

			var now=0;

			function n()
			{
				var n=now;
				now=(now+1)%aPic.length;

				return n;
			}

			for(var i=0;i<12;i++)
			{
				aUl[parseInt(i/3)].appendChild(createLi());
			}

			function createLi()
			{
				var oLi=document.createElement('li');
				var oPic=aPic[n()];
				oLi.style.background='URL('+oPic.src+')';
				oLi.style.backgroundSize='100% 100%';
				oLi.onmouseover=function ()
				{
					var oTitle=getEle('.listTitle', oDiv)[0];

					oTitle && (oTitle.innerHTML=oPic.title);
				};
				oLi.onclick=function ()
				{
					window.open(oPic.url, '_blank');
				};

				return oLi;
			}

			//开始的时候
			buffer(oBtnClose, {rotate: 90}, {rotate: 0}, function (now){
				setStyle3(oBtnClose, 'transform', 'rotate('+now.rotate+'deg)');
			}, function (){
				var w=Math.ceil(Math.sqrt(Math.pow(document.documentElement.clientWidth,2)+Math.pow(document.documentElement.clientHeight, 2)))*2;

				buffer(oBg, {w: 0, opacity: 0}, {w: w, opacity: 100}, function (now){
					oBg.style.width=oBg.style.height=now.w+'px';
					oBg.style.marginRight=-now.w/2+'px';
					oBg.style.marginTop=-now.w/2+'px';

					oBg.style.filter='alpha(opacity:'+now.opacity+')';
					oBg.style.opacity=now.opacity/100;
				}, function (){
					oBg.style.display='none';
					oDiv.style.background='black';

					(function (){
						var i=0;
						var N=aLi.length;

						var timer=setInterval(function (){

							expLi(aLi[i], function (){
								if(this==aLi[N-1])
								{
									for(var i=0;i<aBtns.length;i++)
										aBtns[i].style.opacity=1;

									zns.site.fx.addEnd(aBtns[0], function ()
									{
										ready=true;
									});
								}
							});

							i++;

							if(i==aLi.length)
								clearInterval(timer);
						}, 100);
					})();
				}, 14);
			}, 10);

			function expLi(oLi, fnEnd)
			{
				flex(oLi, {x: -90, y: -10, opacity:0}, {x: 0, y: 0, opacity:1}, function (now){
					//alert(this);
					setStyle3(this, 'transform', 'perspective(1000px) translateY('+now.y+'px) rotateX('+now.x+'deg)');
					this.style.opacity=now.opacity;
				}, function (){
					setStyle3(this, 'transform', 'perspective(1000px) rotateX(0deg)');
					fnEnd && fnEnd.call(this);
				}, 12, 0.85);
			}
		};
	})();
}
else
{
	//2d模式
	(function (){
		var flex=zns.site.fx.flex;
		var buffer=zns.site.fx.buffer;

		//aPic->src,title,url
		zns.site.fx.product_full.create=function (aPic, fnHide)
		{
			var oDiv=getEle('.proListFull')[0];
			var oContainer=getEle('.proListFull .proList_full_3d')[0];
			var aLi=oContainer.getElementsByTagName('li');
		};

		zns.site.fx.product_full._create_ele=function (aPic)
		{
			var oDiv=getEle('.proListFull')[0];
			var oContainer=getEle('.proListFull .proList_full_3d')[0];

			oContainer.className='proList_full_2d';
			oContainer.innerHTML='<ul></ul>';

			var oUl=oContainer.getElementsByTagName('ul')[0];

			for(var i=0;i<Math.min(9,aPic.length);i++)
			{
				var oLi=document.createElement('li');

				oLi.innerHTML='<img src="'+aPic[i].src+'" />';

				oUl.appendChild(oLi);
			}


		};
	})();
}zns.site.fx.product_s={};

if(Modernizr.csstransforms3d)
{
	var buffer=zns.site.fx.buffer;
	var swing=zns.site.fx.swing;
	var flex=zns.site.fx.flex;
	//3d模式
	(function (){
		zns.site.fx.product_s.createEle=function (aData)
		{
			var aClass=['cur', 'right', 'right2'];
				aClass[aData.length-2]='left2';
				aClass[aData.length-1]='left'
			var oUl=getEle('.proList ul')[0];
			var arr=[];

			aData.sort(function (){return Math.random()-0.5;});
			aData.sort(function (){return Math.random()-0.5;});
			aData.sort(function (){return Math.random()-0.5;});

			for(var i=0;i<aData.length;i++)
			{
				if(aClass[i])
					arr.push('<li class="li_3d '+aClass[i]+'"><img src="'+aData[i].src+'" /></li>');
				else
					arr.push('<li class="li_3d"><img src="'+aData[i].src+'" /></li>');
			}

			oUl.innerHTML=arr.join('');
		};

		zns.site.fx.product_s.create=function (aData)
		{
			var oDiv=getEle('.listMain .proList div')[0];
			var oTxt=getEle('.proList_p')[0];

			//var oDiv=document.getElementById('div1');
			var oUl=oDiv.getElementsByTagName('ul')[0];
			var aLi=oUl.getElementsByTagName('li');
			var oLeft=getEle('.listMain .btnLink a')[1];
			var oRight=getEle('.listMain .btnLink a')[3];
			var i=0;
			var iNow=0;
			//var aA=oDiv.getElementsByTagName('a');
			var ready=true;
			var wait=0;

			getEle('.scroll_bar')[0].style.display='none';

			aLi.indexOf=Array.prototype.indexOf;

			oLeft.onclick=goLeft;
			oRight.onclick=goRight;

			function goLeft()
			{
				tab((iNow-1+aLi.length)%aLi.length);
			}
			function goRight()
			{
				tab((iNow+1)%aLi.length);
			}

			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].index=i;
			}

			function m(n){return (n+aLi.length)%aLi.length;}

			function tab(now)
			{
				if(!ready)return;
				ready=false;

				oDiv.onmouseover();

				iNow=now;

				//wait=aLi.length;

				for(var i=0;i<aLi.length;i++)
				{
					if(i!=m(iNow-2) && i!=m(iNow-1) && i!=m(iNow+1) && i!=m(iNow+2) && i!=m(iNow))
					{
						setClass(aLi[i], 'li_3d');
					}
					//aLi[i].className='li_3d';
					aLi[i].onclick=null;
				}
				setClass(aLi[m(iNow-2)],	'li_3d left2', function (){ready=true;});
				setClass(aLi[m(iNow-1)],	'li_3d left');
				setClass(aLi[iNow],			'li_3d cur');
				setClass(aLi[m(iNow+1)],	'li_3d right');
				setClass(aLi[m(iNow+2)],	'li_3d right2');

				oDiv.onmouseout();

				setEv();
				oTxt.innerHTML=aData[iNow].title;
				oTxt.href=aData[iNow].url;

				//替代css3效果
				function setClass(obj, newClass, fnEnd)
				{
					var oldClass=obj.className;

					if(oldClass==newClass)return;
					var aClass={
						'li_3d':		{y: 0, scale: 1, tx: 0, ty: 0, z: 1, opacity: 0},
						'li_3d left':	{y: 60, scale: 0.9, tx: -280, ty: 10, z: 3, opacity: 0.9},
						'li_3d left2':	{y: 60, scale: 0.9, tx: -400, ty: 10, z: 2, opacity: 0},
						'li_3d right':	{y: -60, scale: 0.9, tx: 280, ty: 10, z: 3, opacity: 0.9},
						'li_3d right2':	{y: -60, scale: 0.9, tx: 400, ty: 10, z: 2, opacity: 0},
						'li_3d cur':	{y: 0, scale: 1, tx: 0, ty: 0, z: 4, opacity: 1}
					};

					flex(obj, aClass[oldClass], aClass[newClass], function (now){
						setStyle3(obj, 'transform', 'perspective(1100px) translate('+now.tx+'px, '+now.ty+'px) rotateY('+now.y+'deg) scale('+now.scale+')');
						obj.style.zIndex=Math.round(now.z);
						obj.style.filter='alpha(opacity:'+parseInt(now.opacity*100)+')';
						obj.style.opacity=now.opacity;
					}, fnEnd, 100, 0.87);

					obj.className=newClass;
				}
			}

			setEv();
			oTxt.innerHTML=aData[0].title;
			oTxt.href=aData[0].url;

			function setEv()
			{
				//var scaled=false;
				aLi[m(iNow-1)].onclick=goLeft;
				aLi[iNow].onclick=function ()	//放大
				{
					window.open(oTxt.href, '_blank');
				};
				aLi[m(iNow+1)].onclick=goRight;
			}

			document.onkeydown=function (ev)
			{
				var oEvent=ev||event;

				switch(oEvent.keyCode)
				{
					case 37:	//←
						goLeft();
						break;
					case 39:	//→
						goRight();
						break;
				}
			};

			//自动播放
			var autoPlayTimer=null;
			oDiv.onmouseout=function ()
			{
				clearInterval(autoPlayTimer);
				autoPlayTimer=setInterval(goRight, 3000);
			};
			oDiv.onmouseover=function ()
			{
				clearInterval(autoPlayTimer);
			};

			oDiv.onmouseout();

			//倒影
			createReflect();

			function createReflect()
			{
				removeReflect();

				for(var i=0;i<aLi.length;i++)
				{
					var oSpan=document.createElement('span');
					oSpan.innerHTML=aLi[i].innerHTML+'<em></em>';
					oSpan.getElementsByTagName('img')[0].className='s_img';
					aLi[i].appendChild(oSpan);
				}
			}

			function removeReflect()
			{
				for(var i=0;i<aLi.length;i++)
				{
					var aSpan=aLi[i].getElementsByTagName('span');
					while(aSpan.length)aLi[i].removeChild(aSpan[0]);
				}
			}
			return {
				show: function (){
					//oDiv.style.display='block';
					oDiv.onmouseout();
				},
				hide: function (){
					oDiv.onmouseover();
					//oDiv.style.display='none';
				}
			};
		};
	})();
}else{
	//2d模式
	(function (){
		var buffer=zns.site.fx.buffer;
		var flex=zns.site.fx.flex;
		var stop=zns.site.fx.stop;

		//不反过来调整滚动条
		var dontFixScroll=true;

		zns.site.fx.product_s.createEle=function (aData)
		{
			getEle('.listMain')[0].style.overflow='hidden';
			var oUl=getEle('.proList ul')[0];
			var arr=[];

			for(var i=0;i<aData.length;i++)
				arr.push('<li class="li_2d"><img src="images/product_pic/browser.png" class="img_bg" /><img class="item" src="'+aData[i].src+'" /></li>');

			oUl.innerHTML=arr.join('');

			var aLi=oUl.getElementsByTagName('li');

			oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		};
		zns.site.fx.product_s.create=function (aData)
		{
			var oUl=getEle('.proList ul')[0];
			var aLi=oUl.getElementsByTagName('li');
			var oDiv=oUl.parentNode;
			var aPos=[];
			var iNow=0;

			var W=aLi[0].offsetWidth;
			var H=aLi[0].offsetHeight;

			oDiv.parentNode.style.position='relative';
			oDiv.style.cssText=sprintf('left:0; top:0; width:%1px; position:absolute; margin:0;', oDiv.parentNode.offsetWidth);
			oUl.style.left=0;
			oUl.style.top='100px';

			//左右按钮
			(function (){
				var oBtnLeft=getEle('#btn_left')[0];
				var oBtnRight=getEle('#btn_right')[0];
				var oBtnLeft2=getEle('.scroll_bar_l')[0];
				var oBtnRight2=getEle('.scroll_bar_r')[0];

				oBtnLeft2.onmousedown=oBtnLeft.onmousedown=function ()
				{
					dontFixScroll=false;
					iNow--;

					if(iNow<0)iNow=0;

					moveToLi(iNow);
				};
				oBtnRight2.onmousedown=oBtnRight.onmousedown=function ()
				{
					dontFixScroll=false;
					iNow++;

					if(iNow>=aLi.length)iNow=aLi.length-1;

					moveToLi(iNow);
				};
			})();

			//布局转换
			var liIndexTmp=0;
			map(aLi, function (i){
				aPos[i]={left: this.offsetLeft, top: this.offsetTop};
				this.index=i;
				/*this.onclick=function ()
				{
					liIndexTmp=this.index;
					alert('a'+liIndexTmp);
					//alert(liIndexTmp);
				};*/
			});
			map(aLi, function (i){
				this.style.position='absolute';
				this.style.left=aPos[i].left+'px';
				this.style.top=aPos[i].top+'px';
			});

			//拖拽
			var disX=0;
			var downX,downY;
			addTouch(oUl, {down: function (x,y){
				disX=x-oUl.offsetLeft;
				downX=x;
				downY=y;
				stop(oUl);
				dontFixScroll=false;
			}, move: function (x, y){
				var l=x-disX;

				//oUl.style.left=l+'px';
				buffer(oUl, {left: oUl.offsetLeft}, {left: l}, function (now){
					oUl.style.left=now.left+'px';
					fixSize();
				});
				fixSize();
			}, up: function (x, y){
				fixSize();
				//alert(iNow);

				//alert(Math.sqrt(Math.pow(x-downX, 2)+Math.pow(y-downY, 2)));
				if(Math.sqrt(Math.pow(x-downX, 2)+Math.pow(y-downY, 2))<4)	//是click
				{
					gotoHref=aData[iNow].url;
					/*if(iNow==liIndexTmp)	//点当前的，跳转
					{
						gotoHref=aData[liIndexTmp].url;
					}*/
					//document.title=liIndexTmp;
					//alert(liIndexTmp+','+iNow+','+gotoHref);
					//iNow=liIndexTmp;
					//alert(iNow);
				}
				setTimeout(function (){
					moveToLi(iNow);
				},0);
			}});

			var gotoHref='';

			oUl.onclick=function ()
			{
				//alert(gotoHref);
				if(gotoHref)
				{
					window.open(gotoHref);
					gotoHref='';
				}
			};

			//滚动条
			var fnSetScaleScroll=null;
			(function (){
				var oCon=getEle('.scroll_bar .scroll_bar_cen')[0];
				var oBar=getEle('.scroll_bar .scroll_bar_cen .scroll_bar_this')[0];

				oBar.style.left='6px';

				var disX=0;
				//blue
				addTouch(oBar, {down: function (x){
					disX=x-oBar.offsetLeft;
					dontFixScroll=true;
				}, move: function (x){
					var l=x-disX;

					if(l<-5)l=-5;
					else if(l>oCon.offsetWidth-oBar.offsetWidth+3)l=oCon.offsetWidth-oBar.offsetWidth+3;

					oBar.style.left=l+'px';

					var scale=(l+5)/(oCon.offsetWidth-oBar.offsetWidth+8);
					moveToLi(Math.round(scale*(aLi.length-1)));
				}, up: function (){
				}});

				fnSetScaleScroll=function (scale)
				{
					if(scale<0)scale=0;
					else if(scale>1)scale=1;

					oBar.style.left=scale*(oCon.offsetWidth-oBar.offsetWidth+8)-5+'px';
				};
			})();

			//定位函数
			function fixSize()
			{
				if(!dontFixScroll)
					fnSetScaleScroll((oUl.offsetLeft-362)/(-7360-362));
				var max=-100,
					maxIndex=-1;

				for(var i=0;i<aLi.length;i++)
				{
					var l=aLi[i].offsetLeft+aLi[i].offsetWidth/2+oUl.offsetLeft-oDiv.offsetWidth/2;
					var scale=1-Math.abs(l)/1000;//Math.abs(l);

					if(scale<0)scale=0;

					if(scale==0)continue;

					aLi[i].style.width=2*W*scale+'px';
					aLi[i].style.height=2*H*scale+'px';
					aLi[i].style.marginTop=-(aLi[i].offsetHeight-H)/4+'px';
					aLi[i].style.marginLeft=-(aLi[i].offsetWidth-W)/2+'px';
					aLi[i].style.zIndex=scale*1000;
					aLi[i].style.filter='alpha(opacity:'+scale*100+')';
					aLi[i].style.opacity=scale;
					getEle('.item', aLi[i])[0].style.width=Math.max(0,aLi[i].offsetWidth-2)+'px';

					if(scale>max)
					{
						max=scale;
						maxIndex=i;
					}
				}

				//document.title=maxIndex;

				iNow=maxIndex;
			}

			function moveToLi(index)
			{
				var l=-W*index-W/2+oDiv.offsetWidth/2;

				buffer(oUl, {left: oUl.offsetLeft}, {left: l}, function (now){
					oUl.style.left=now.left+'px';
					fixSize();
				});
			}
			moveToLi(1);
		};
	})();
}zns.site.fx.train_outline={};

(function (){
	zns.site.fx.train_outline.create=function ()
	{
		var aList = getByClass(document.body,'stHidd');

		for(var i=0;i<aList.length;i++)
		{
			aList[i].onmouseover = function()
			{
				this.style.overflow = 'visible';
				var aListCon = getByClass(this,'stList_top')[0];
				aListCon.style.position = 'absolute';
				aListCon.style.zIndex = 99;
				this.style.zIndex = 12;
				var aList_txt = getByClass(this,'stList')[0];
				if(aList_txt.scrollHeight<158)
				{

				}
				else
				{
					aList_txt.style.height = aList_txt.scrollHeight - 20 + 'px';
				}
			}
			aList[i].onmouseout = function()
			{
				if(window.navigator.userAgent.indexOf('MSIE 7.0')>=1)
				{
					this.style.overflow = 'hidden';
				}
				else
				{

				}
				//this.style.overflow = 'hidden';
				var aListCon = getByClass(this,'stList_top')[0];
				aListCon.style.position = '';
				aListCon.style.zIndex = 2;
				this.style.zIndex = 10;
				var aList_txt = getByClass(this,'stList')[0];
				aList_txt.style.height = 158 + 'px';
			}
		}

		//按钮增加划入效果
		map(getEle('.iWant a'), function (){
			this.onmouseover=function ()
			{
				this.className='iWant_active';
			};
			this.onmouseout=function ()
			{
				this.className='';
			};
		});
	};
})();zns.site.fx.video={};

(function (){
	var pageSize=6;

	if(window._video_data)
	{
		var aData=_video_data;

		//aData.unshift(aData.pop());
		//aData.unshift(aData.pop());

		//aData[0].new_video=true;
		//aData[1].new_video=true;
	}
	else
		var aData=[];

	var buffer=zns.site.fx.buffer;
	var linear=zns.site.fx.linear;
	//var nowPlayVideoId=0;

	var prev=null;
	var next=null;

	//记住页码
	var nowPage=parseInt(window.location.hash.substring(1));
	if(isNaN(nowPage))nowPage=0;

	//上一页、下一页
	bindEvent(document, 'keydown', function (ev){
		var oEvent=ev||event;

		switch(oEvent.keyCode)
		{
			case 37:
				prev&&prev();
				break;
			case 39:
				next&&next();
				break;
		}

	});

	//var str_video_player_inner_html='';

	zns.site.fx.video.create=function ()
	{
		var oDiv=getEle('#video_box')[0];

		str_video_player_inner_html=oDiv.innerHTML;

		var ready=true;
		function getPage(n)
		{
			var arr=[];

			for(var i=n*pageSize;i<(n+1)*pageSize;i++)
			{
				if(i<aData.length)	arr.push(aData[i]);
				else				arr.push({null_data: true});
			}

			return arr;
		}

		function getPageCount()
		{
			return Math.ceil(aData.length/pageSize);
		}
		//zns.site.fx.video._create_list(_video_data);
		//换页操作
		zns.site.fx.video._create_block(getPage(nowPage), getPageCount(), function (page){
			//fnChange
			if(!ready)return;
			ready=false;

			window.location.hash=page;

			zns.site.fx.video.change_block(getPage(page), getPageCount(), function (){
				var oPage=getEle('.videoBox .page')[0];
				nowPage=page;

				for(var i=0;i<oPage.children.length;i++)
				{
					oPage.children[i].className='';
				}
				oPage.children[nowPage+1].className='active';
				ready=true;
			});
		});

		//createMsg();
	};
	/*zns.site.fx.video._create_list=function (data, pageCount)
	{
		var oUl=getEle('.videoBox_list .video_list_tran')[0];

		for(var i=0;i<data.length;i++)
		{
			var oData=data[i];
			var oLi=document.createElement('li');

			oLi.innerHTML=
				'<a href="#">'+oData.title+'</a><span>视频下载</span>'+
				'<div class="video_list_download">'+
					'<a href="#" class="vd_yunpan" title="360云盘" target="_blank">360云盘</a>'+
					'<a href="#" class="vd_baidu" title="百度网盘" target="_blank">百度网盘</a>'+
					'<a href="#" class="vd_sina" title="新浪网盘" target="_blank">新浪网盘</a>'+
					'<a href="#" class="vd_xunlei" title="迅雷快传" target="_blank">迅雷快传</a>'+
					'<a href="#" class="vd_huawei" title="华为网盘" target="_blank">华为网盘</a>'+
				'</div>';

			oUl.appendChild(oLi);
		}
	};*/
	zns.site.fx.video.change_block=function (aNewData, pageCount, fnEnd)
	{
		var oDiv=getEle('.videoBox')[0];
		var aDiv=getEle('.video_list', oDiv);
		var max=90;
		var speed=16;

		var i=0;
		var timer=setInterval(function (){
			var oShadow=getEle('.video_shadow', aDiv[i])[0];

			(function (i, oShadow){
				linear(oShadow, {opacity: 0}, {opacity: max}, function (now){
					//doMove
					this.style.display='block';
					this.style.filter='alpha(opacity:'+now.opacity+')';
					this.style.opacity=now.opacity/100;
				}, function (){
					//end
					var oData=aNewData[i];

					if(oData.img_url)
						getEle('.video_content a img', aDiv[i])[0].src='images/video_pic/'+oData.img_url;
					else
						getEle('.video_content a img', aDiv[i])[0].src='';

					getEle('.videoTxt a', aDiv[i])[0].innerHTML=oData.title;
					if(oData.n_view){
						getEle('.videoTxt em', aDiv[i])[0].innerHTML=oData.n_view+'次';
					}else{
						getEle('.videoTxt em', aDiv[i])[0].innerHTML='-';
					}
					aDiv[i].data=aNewData[i];

					if(oData.new_video)getEle('.video_new', aDiv[i])[0].style.display='block';
					else getEle('.video_new', aDiv[i])[0].style.display='none';

					getEle('.video_play .vLink', aDiv[i])[0].setAttribute('href', oData.down_url);

					if(oData.null_data)
					{
						getEle('.not_null_content', aDiv[i])[0].style.display='none';
						getEle('.null_content', aDiv[i])[0].style.display='block';
					}
					else
					{
						getEle('.not_null_content', aDiv[i])[0].style.display='block';
						getEle('.null_content', aDiv[i])[0].style.display='none';
					}

					linear(this, {opacity: max}, {opacity: 0}, function (now){
						//doMove
						this.style.filter='alpha(opacity:'+now.opacity+')';
						this.style.opacity=now.opacity/100;
					}, function (){
						//END
						this.style.display='none';
						fnEnd();
					}, speed);
				}, speed);
			})(i, oShadow);

			i++;
			if(i==aDiv.length)
			{
				clearInterval(timer);
			}
		}, 50);
	};
	zns.site.fx.video._create_block=function (data, pageCount, fnChange)
	{
		var oDiv=getEle('.videoBox')[0];
		var oPage=getEle('.videoBox .page')[0];

		//生成视频
		for(var i=0;i<data.length;i++)
		{
			(function (i){
				var oData=data[i];

				var oNewDiv=document.createElement('div');
				oNewDiv.data=oData;

				oNewDiv.className='video_list';
				oNewDiv.innerHTML=
					'<div class="video_content not_null_content">'+
						'<a href="javascript:;"><img src="'+(oData.img_url?('images/video_pic/'+oData.img_url):'')+'" class="video_img" /></a>'+
						'<div class="video_new"></div>'+
						'<p class="videoTxt">'+
							'<a href="javascript:;">'+oData.title+'</a><em>'+(oData.n_view?oData.n_view+'次':'')+'</em>'+
						'</p>'+
						'<div class="video_play" style="display:block; filter:alpha(opacity:0); opacity:0;">'+
							'<a href="'+oData.down_url+'" title="点击播放该视频" class="vLink" target="_blank"></a>'+
							/*'<div class="video_download">'+
								'<span class="vDownLoadTxt">视频下载：</span>'+
								'<a href="#" class="vd_yunpan" title="360云盘" target="_blank"></a>'+
								'<a href="#" class="vd_baidu" title="百度网盘" target="_blank"></a>'+
								'<a href="#" class="vd_sina" title="新浪网盘" target="_blank"></a>'+
								'<a href="#" class="vd_xunlei" title="迅雷快传" target="_blank"></a>'+
								'<a href="#" class="vd_huawei" title="华为网盘" target="_blank"></a>'+
							'</div>'+*/
						'</div>'+
					'</div>'+
					'<div class="video_content null_content" style="display:none;">'+
						'<a href="http://bbs.zhinengshe.com/forum-36-1.html" target="_blank"><img src="images/video_next.jpg" class="video_img" /></a>'+
					'</div>'+
					'<div class="video_shadow"></div>';

				if(oData.new_video)getEle('.video_new', oNewDiv)[0].style.display='block';
				else getEle('.video_new', oNewDiv)[0].style.display='none';

				if(oData.null_data)
				{
					getEle('.not_null_content', oNewDiv)[0].style.display='none';
					getEle('.null_content', oNewDiv)[0].style.display='block';
				}
				else
				{
					getEle('.not_null_content', oNewDiv)[0].style.display='block';
					getEle('.null_content', oNewDiv)[0].style.display='none';
				}

				//播放图片黑色层
				var oPlayDiv=getEle('.video_play', oNewDiv)[0];
				var opacity=0;
				var timer=null;

				function doMoveOpacity(now)
				{
					opacity=now.opacity;

					this.style.filter='alpha(opacity:'+opacity+')';
					this.style.opacity=opacity/100;
				}
				oNewDiv.onmouseover=function ()
				{
					clearTimeout(timer);
					buffer(oPlayDiv, {opacity: opacity}, {opacity: 100}, doMoveOpacity);
				};
				oNewDiv.onmouseout=function ()
				{
					timer=setTimeout(function (){
						buffer(oPlayDiv, {opacity: opacity}, {opacity: 0}, doMoveOpacity);
					}, 100);
				};
				//var oBtn=getEle('.vLink', oNewDiv)[0];

				//播放弹出层
				/*(function (){
					var oBtn=getEle('.vLink', oNewDiv)[0];
					//var oDiv=getEle('#video_box')[0];

					oBtn.onclick=function ()
					{
						var oMask=getEle('.shadow_bg')[0];

						if(getEle('.fast_nav')[0])
						{
							getEle('.fast_nav')[0].style.zIndex=997;
						}
						buffer(oMask, {opacity: 0}, {opacity: 80}, function (now){
							setStyle(this, now);
							oMask.style.display='block';
						}, function (){
							oDiv.style.height='0';
							oDiv.style.display='block';
							window.onresize();

							getEle('.video_play_alert', oDiv)[0].style.visibility='hidden';
							buffer(oDiv, {height: 0, marginTop: 290}, {height: 580, marginTop: 0}, function (now){
								this.style.height=now.height+'px';
								this.style.marginTop=now.marginTop+'px';
							}, function (){
								getEle('.video_play_alert', oDiv)[0].style.visibility='visible';

								loadVideo(oNewDiv.data.id, oDiv);
							}, 10);
						});
					};

					//关闭按钮
					getEle('.title_colse', oDiv)[0].onclick=function ()
					{
						closePlayer();
					};

					window.onresize=function ()
					{
						oDiv.style.left=(document.documentElement.clientWidth-oDiv.offsetWidth)/2+'px';
						oDiv.style.top=(document.documentElement.clientHeight-580)/2+'px';
					};
				})();*/

				oDiv.insertBefore(oNewDiv, oPage);
			})(i);
		}

		//生成页码
		oPage.innerHTML='';
		//上一页
		var oA=document.createElement('a');
		oA.href='javascript:;';
		oA.innerHTML='&lt;';
		oPage.appendChild(oA);

		oA.onclick=prev=function ()
		{
			if(nowPage>0)fnChange(nowPage-1);
		}

		//中间
		for(var i=0;i<pageCount;i++)
		{
			var oA=document.createElement('a');
			oA.href='javascript:;';
			oA.innerHTML=i+1;
			oA.index=i;
			oPage.appendChild(oA);

			if(nowPage==i)
				oA.className='active';

			oA.onclick=function ()
			{
				fnChange(this.index);
			};
		}
		//下一页
		var oA=document.createElement('a');
		oA.href='javascript:;';
		oA.innerHTML='&gt;';
		oPage.appendChild(oA);

		oA.onclick=next=function ()
		{
			if(nowPage<oPage.children.length-3)fnChange(nowPage+1);
		}
	};

	/*function closePlayer(fnEnd)
	{
		var oDiv=getEle('#video_box')[0];

		getEle('.video_play_alert', oDiv)[0].style.visibility='hidden';
		buffer(oDiv, {height: 580, marginTop: 0}, {height: 0, marginTop: 290}, function (now){
			this.style.height=now.height+'px';
			this.style.marginTop=now.marginTop+'px';
		}, function (){
			oDiv.style.display='none';

			//oDiv.innerHTML=str_video_player_inner_html;
			//收起来的时候
			getEle('.video_play_alert', oDiv)[0].innerHTML='';
			getEle('.myIntegral', oDiv)[0].innerHTML='';

			var oMask=getEle('.shadow_bg')[0];
			buffer(oMask, {opacity: 80}, {opacity: 0}, function (now){
				setStyle(this, now);
			}, function (){
				oMask.style.display='none';

				if(getEle('.fast_nav')[0])
				{
					getEle('.fast_nav')[0].style.zIndex=9999;
				}

				fnEnd&&fnEnd();
			});
		}, 10);
	}

	function loadVideo(id, oDiv)
	{
		nowPlayVideoId=id;

		loadMsg(id, 1);

		doOps('view');

		getEle('.internalAd')[0].onclick=function ()
		{
			doOps('ad');
		};

		var resize=null;
		bindEvent(window, 'resize', function (){
			resize&&resize();
		});

		request('zpi/video.php', {act: 'get_video', video_id: id}, function (data){
			nowPlayVideoId=id;
			//alert(JSON.stringify(data));

			getEle('.title_txt', oDiv)[0].innerHTML='当前播放：'+data.title;
			getEle('.setNumberTitle', oDiv)[0].innerHTML=data.title;
			getEle('.setNumberTitle', oDiv)[1].innerHTML=data.tags;
			if(!data.password)
			{
				if(data.price>0)	//收费、未购买视频
				{
					var cip=getEle('.videoCipher', oDiv)[0];
					cip.innerHTML='<a href="javascript:;" style="color:white;">点击解锁本集密码</a>';

					getEle('.videoCipher a')[0].onclick=function ()
					{
						doOps('pay', function (data){
							//成功支付，显示密码
							cip.innerHTML='密码：'+data.password;
							//更新积分
							zns.site.user.curUser.point=data.point;
							getEle('.myIntegral', oDiv)[0].innerHTML='';
						}, function (desc, error){
							alert(desc);
							setTimeout(function (){
								closePlayer(function (){
									//blue
									switch(error)
									{
										case 2:	//需要登录
											zns.site.user.openDialog();
											break;
										case 3:	//积分不足
											(function (){
												var oDiv=document.getElementById('small_alert');
												var oTxt=getEle('.alert_input', oDiv)[0];

												//读取一个验证码过来
												oTxt.value='读取中...';
												request('zpi/zns_user.php', {act: 'get_reg_code'}, function (data){
													oTxt.value='http://www.zhinengshe.com/?reg_code='+data.code;
												});

												//框显示出来
												oDiv.style.display='block';
												oDiv.style.filter='alpha(opacity:0)';
												oDiv.style.opacity=0;

												var oMask=getEle('.shadow_bg')[0];

												buffer(oMask, {opacity: 0}, {opacity: 80}, function (now){
													setStyle(this, now);
													oMask.style.display='block';
												}, function (){
													buffer(oDiv, {opacity: 0}, {opacity: 100}, function (now){
														oDiv.style.filter='alpha(opacity:'+now.opacity+')';
														oDiv.style.opacity=now.opacity/100;
													});
												});

												resize=function ()
												{
													oDiv.style.left=(document.documentElement.clientWidth-oDiv.offsetWidth)/2+'px';
													oDiv.style.top=(document.documentElement.clientHeight-oDiv.offsetHeight)/2+'px';
												};

												resize();

												//关闭积分框
												var oBtnClose=getEle('.title_colse', oDiv)[0];

												oBtnClose.onclick=function ()
												{
													buffer(oDiv, {opacity: 100}, {opacity: 0}, function (now){
														oDiv.style.filter='alpha(opacity:'+now.opacity+')';
														oDiv.style.opacity=now.opacity/100;
													}, function (){
														oDiv.style.display='none';
														buffer(oMask, {opacity: 80}, {opacity: 0}, function (now){
															setStyle(this, now);
															oMask.style.display='block';
														}, function (){
															oMask.style.display='none';
														});
													});
												};
											})();
											break;
									}
								});
							}, 500);
						});
					};

					if(zns.site.user.curUser)
					{
						getEle('.myIntegral', oDiv)[0].innerHTML='解锁本集需<em>'+data.price+'</em>积分 你的积分<em>'+zns.site.user.curUser.point+'</em>分';
					}
					else
					{
						getEle('.myIntegral', oDiv)[0].innerHTML='解锁本集需<em>'+data.price+'</em>积分 请登录后解锁';
					}
				}
				else
				{
					getEle('.videoCipher', oDiv)[0].innerHTML='公开视频';
				}
			}
			else
			{
				getEle('.videoCipher', oDiv)[0].innerHTML='密码：'+data.password;
			}
			getEle('.video_play_alert', oDiv)[0].innerHTML='<embed src="'+data.swf_url+'" quality="high" width="610" height="506" align="middle" allowScriptAccess="sameDomain" allowFullscreen="true" type="application/x-shockwave-flash"></embed>';

			if(data.ppt_url)
			{
				getEle('#btn_ppt_down')[0].href=data.ppt_url;
				getEle('#btn_ppt_down')[0].target='_blank';
			}
			else
			{
				getEle('#btn_ppt_down')[0].href="javascript:alert('即将推出，敬请期待...');";
				getEle('#btn_ppt_down')[0].target='';
			}
		}, function (){
			alert('视频信息读取失败，建议刷新页面试试');
		});
	}*/

	/*function createMsg()
	{
		var oDiv=getEle('.video_discussion_content')[0];
		var oTxt=getEle('.videoMessage textarea')[0];
		var oBtnDown=getEle('.videoMessage .c_input')[0];
		var oBtnAsk=getEle('.videoMessage .c_input')[2];
		var oBtnPost=getEle('.videoMessage .c_input')[1];

		oBtnDown.onclick=function ()
		{
			doOps('down');
		};

		oBtnAsk.onclick=function ()
		{
			doOps('ask');
		};

		oBtnPost.onclick=function ()
		{
			doOps('msg');
			request('zpi/video.php', {
				act: 'add_msg', video_id: nowPlayVideoId, content: oTxt.value
			}, function (data){
				var oP=document.createElement('p');

				data.content=data.content.replace(/</g, '&lt;');
				data.content=data.content.replace(/>/g, '&gt;');

				if(zns.site.user.curUser)
				{
					oP.innerHTML=zns.site.user.curUser.nick_name+'：'+data.content;
				}
				else
				{
					oP.innerHTML='ZNS热心网友'+'：'+data.content;
				}
				oTxt.value='';

				oDiv.insertBefore(oP, oDiv.firstChild);
			});
		};
	}

	function loadMsg(video_id, page)
	{
		var oDiv=getEle('.video_discussion_content')[0];
		oDiv.innerHTML='读取中...';

		request('zpi/video.php', {
			act: 'get_msg_page', video_id: video_id, page: page
		}, function (data){
			oDiv.innerHTML='';

			var arr=data.list;

			for(var i=0;i<arr.length;i++)
			{
				var oP=document.createElement('p');

				if(!arr[i].nick_name)arr[i].nick_name='ZNS热心网友';

				oP.innerHTML=arr[i].nick_name+'：'+arr[i].content;

				oDiv.appendChild(oP);
			}
		});
	}

	function doOps(ops, fnSucc, fnFaild)
	{
		//操作
		//pay
		//msg/view/ask/ad/true_view/down

		if(ops!='msg' && ops!='view' && ops!='ask' && ops!='ad' && ops!='true_view' && ops!='down' && ops!='pay')
		{
			alert('类型不对');
			return;
		}

		request('zpi/video.php', {act: 'video_ops', video_id: nowPlayVideoId, ops: ops}, fnSucc, fnFaild);
	}*/
})();zns.site.fx.one={};

(function (){
	var ie6=zns.site.fx.browser_test.IE6;
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;
	var swing=zns.site.fx.swing;
	var stop=zns.site.fx.stop;

	function toDou(n)
	{
		return n<10?'0'+n:''+n;
	}

	zns.site.fx.one={
		createImg: function ()
		{
			zns.site.fx.one._createTimeLine();
		},
		create: function ()
		{
			/*if(!ie6)
			{
				zns.site.fx.one._createFixTop();
			}*/
			zns.site.fx.one._createCountDown();
			zns.site.fx.one._createHashMove();
			zns.site.fx.one._createWeiXin();
		},
		_createFixTop: function ()
		{
			var aDiv=getEle('.trigonum');
			var aTop=[];

			for(var i=0;i<aDiv.length;i++)
			{
				aTop[i]=getPos(aDiv[i]).t;
			}

			//滚动吸顶
			function fnScroll()
			{
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

				for(var i=0;i<aDiv.length;i++)
				{
					if(aTop[i]<scrollTop)
					{
						aDiv[i].style.position='fixed';
						aDiv[i].style.top=0+'px';
					}
					else
					{
						aDiv[i].style.position='';
						aDiv[i].style.top='';
					}
				}
			}
			bindEvent(window, 'scroll', fnScroll);
		},
		_createTimeLine: function ()
		{
			var oUl=getEle('.deedList')[0];
			for(var i=0;i<oUl.children.length;i++)
			{
				oUl.children[i].style.height=oUl.children[i].offsetHeight+'px';
			}

			var aLeft=getEle('.deedListTitle');
			var aRight=getEle('.deedRepresent');

			var aPos=[];
			var aTop=[];

			for(var i=0;i<aLeft.length;i++)
			{
				aLeft[i].style.left='-500px';
				aRight[i].style.left='2000px';

				aRight[i].style.width=aRight[i].offsetWidth+'px';

				aTop[i]=getPos(oUl.children[i]).t;
				aPos[i]=[-500, 2000];

				aRight[i].style.position=aLeft[i].style.position='absolute';
			}

			function fnScroll()
			{
				var dis=100;
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				var scrollBottom=scrollTop+document.documentElement.clientHeight;

				for(var i=0;i<aLeft.length;i++)
				{
					/*var scale=(aTop[i]-(scrollBottom-dis))/(10*dis);

					if(scale<0)scale=0;
					else if(scale>1)scale=1;*/

					/*if(i==0)
					alert(-500*scale);*/

					/*(function (index){
						buffer(aLeft[i], {l: aPos[i][0], l2: aPos[i][1]}, {l: Math.round(-500*scale), l2: Math.round(2000*scale)}, function (now){
							aLeft[index].style.left=now.l+'px';
							aRight[index].style.left=now.l2+'px';

							aPos[index][0]=now.l;
							aPos[index][1]=now.l2;
						});
					})(i);*/
					if(aTop[i]<scrollBottom-dis)
					{
						(function (index){
						buffer(aLeft[i], {l: aPos[i][0], l2: aPos[i][1]}, {l: 0, l2: 0}, function (now){
							aLeft[index].style.left=now.l+'px';
							aRight[index].style.left=now.l2+'px';

							aPos[index][0]=now.l;
							aPos[index][1]=now.l2;
						});
					})(i);
					}
					else
					{
						(function (index){
							buffer(aLeft[i], {l: aPos[i][0], l2: aPos[i][1]}, {l: -500, l2: 2000}, function (now){
								aLeft[index].style.left=now.l+'px';
								aRight[index].style.left=now.l2+'px';

								aPos[index][0]=now.l;
								aPos[index][1]=now.l2;
							}, null, 20);
						})(i);
					}
				}
			}
			bindEvent(window, 'scroll', fnScroll);
		},
		_createCountDown: function ()
		{
			//
			var server_time=0;
			var start=0;

			//开始
			var oDate=new Date();
			oDate.setFullYear(2013, 4, 23);
			oDate.setHours(0,0,0,0);

			var start_time=oDate.getTime();

			//结束
			var oDate=new Date();
			oDate.setFullYear(2013, 4, 23);
			oDate.setHours(23,59,59,0);

			var end_time=oDate.getTime();

			var oDiv=document.getElementById('time_count_down');

			ajax('/zpi/time.php?act=get_timestamp', {
				fnSucc:	function (str)
				{
					//alert(str);
					server_time=parseInt(str)*1000;
					start=new Date().getTime();

					setInterval(function (){
						var now=new Date().getTime()-start+server_time

						//alert(oDate);
						if(now<start_time)
						{
							var s=parseInt((start_time-now)/1000);

							var h=parseInt(s/3600);
							s%=3600;

							var m=parseInt(s/60);
							s%=60;

							oDiv.innerHTML='距活动开始还有<span>'+toDou(h)+'</span>小时<span>'+toDou(m)+'</span>分<span>'+toDou(s)+'</span>秒';
						}
						else if(now>=start_time && now<=end_time)
						{
							var s=parseInt((end_time-now)/1000);

							var h=parseInt(s/3600);
							s%=3600;

							var m=parseInt(s/60);
							s%=60;

							oDiv.innerHTML='活动进行中 <span>'+toDou(h)+'</span>小时<span>'+toDou(m)+'</span>分<span>'+toDou(s)+'</span>秒';
						}
						else
						{
							oDiv.innerHTML='活动已结束，我们共同期待精彩的未来';
						}
					}, 1000);
				}
			});
		},
		_createHashMove: function ()
		{
			var aBtn=getEle('.headerContent a');

			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].onclick=function ()
				{
					var bySys=false;
					var s=this.href.match(/#\w+/)[0];
					var oDiv=document.getElementById(s.substring(1));

					var p=getPos(oDiv);
					var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

					window.onscroll=function ()
					{
						if(!bySys)
						{
							stop(oDiv);
						}
						bySys=false;
					};

					buffer(oDiv, {s: scrollTop}, {s: p.t}, function (now){
						bySys=true;
						document.documentElement.scrollTop=document.body.scrollTop=now.s;

						//alert(now.s);
					});

					return false;
				};
			}
		},
		_createWeiXin: function ()
		{
			var oBtn=getEle('.weixinLink')[0];

			oBtn.onclick=function (ev)
			{
				getEle('.layer')[0].style.display='block';
				getEle('.weixin_imgBig')[0].style.display='block';

				(ev||event).cancelBubble=true;

				document.onclick=function ()
				{
					getEle('.layer')[0].style.display='none';
					getEle('.weixin_imgBig')[0].style.display='none';

					document.onclick=null;
				};
			};
		}
	};
})();

















zns.site.fx.contact={};

(function (){
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;

	zns.site.fx.contact.create=function ()
	{
		var aBtn=getEle('.newContact_nav li a');
		var aDiv=getEle('.newContact_map .newContact_list');

		//点击按钮
		for(var i=0;i<aBtn.length;i++)
		{
			(function (index){
				aBtn[i].onclick=function ()
				{
					changeTo(index);
					window.location.hash='#'+index;
				};
			})(i);
		}

		function changeTo(index)
		{
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className='';
			}
			aBtn[index].className='active';
			scrollTo(getPos(aDiv[index]).t-6);
		}

		//吸顶
		var oUl=getEle('.newContact_nav')[0];
		var t=getPos(oUl).t-10;
		var l=getPos(oUl).l;

		bindEvent(window, 'scroll', function (){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

			if(scrollTop>t)
			{
				oUl.style.cssText='position:fixed; left:'+l+'px; top:'+10+'px';
			}
			else
			{
				oUl.style.position='static';
			}
		});

		//页面载入
		setTimeout(function (){
			var id=parseInt(window.location.hash.substring(1));

			if(!isNaN(id))
			{
				if(id>=0 && id<aDiv.length)changeTo(id);
			}
		}, 300);
	};
})();

zns.site.z.siteMessage={
	_url: _g_path+'zpi/site_message.php',
	add: function (title, content, fnSucc, fnFaild)
	{
		request(this._url, {act: 'add', title: title, content: content}, fnSucc, fnFaild);
	},
	get_page_count: function (fnSucc, fnFaild)
	{
		request(this._url, {act: 'get_page_count'}, fnSucc, fnFaild);

		//fnSucc({error: 0, count: 110});
	},
	get_page: function (page, fnSucc, fnFaild)
	{
		request(this._url, {act: 'get_page', page: page}, fnSucc, fnFaild);
		/*fnSucc({error: 0, list: [{ID: 806,user_id: 0,title: '南方没有',content: '真心希望合肥有，支持！',post_time: 1406966099,reply: '我们会尽快努力把优质的课程体验，带到尽可能多的地方，让大家不用都大老远跑到北京来的，不过，我们一切计划都还是以质量和学员感受优先的，请大家多多谅解哈——感谢你对智能社的支持',reply_time: 1407305247,email: '',face_m: ''},{ID: 804,user_id: 0,title: 'js下一个开班时间',content: 'js下次开班是什么时候有啊',post_time: 1406140348,reply: '请参考官网首页的开班时间:) 下一个JS全日制是在8-25开班，请提前联系官网客服咨询报名——感谢你对智能社的支持',reply_time: 1407305946,email: '',face_m: ''},{ID: 791,user_id: 0,title: '课程咨询',content: '现在的课程对比现在的课程大纲里面的课程有更新吗？',post_time: 1402671815,reply: '有很多，最近即将对这一块东西进行说明，敬请期待——感谢你对智能社的支持',reply_time: 1407306551,email: '',face_m: ''},{ID: 774,user_id: 0,title: '你们是个人还是公司',content: '你们是个人还是公司',post_time: 1398748256,reply: '你好，智能社是一家培训机构，专职的培训公司:)——感谢你对智能社的支持',reply_time: 1407304985,email: '',face_m: ''},{ID: 758,user_id: 0,title: '住宿问题',content: '在哪住呢',post_time: 1397728083,reply: '你好，住宿问题可以直接联系官网客服，会帮你安排:)——感谢你对智能社的支持',reply_time: 1407304763,email: '',face_m: ''}]});*/
	}
};(function (){
	var _url=_g_path+'zpi/video.php';
	zns.site.z.video={
		getPage: function (page, fnSucc, fnFaild)
		{
			request(_url, {act: 'get_page', page: page}, function (data){
				fnSucc(data.list);
			}, fnFaild);
		},
		getPageCount: function (fnSucc, fnFaild)
		{
		},
		getVideo: function (id, fnSucc, fnFaild)
		{
		},
		payVideo: function (id, fnSucc, fnFaild)
		{
		},
		videoOps: function (id, ops, fnSucc, fnFaild)
		{
		}
	};
})();zns.site.z.znsUser={
	_url: _g_path+'zpi/zns_user.php',
	reg: function (sCode, sEmail, sPassword, fnSucc, fnFaild)
	{
		request(this._url, {act: 'reg', reg_code: sCode, email: sEmail, password: sPassword}, fnSucc, fnFaild);
	},
	login: function (sEmail, sPassword, fnSucc, fnFaild)
	{
		request(this._url, {act: 'login', email: sEmail, password: sPassword}, fnSucc, fnFaild);
	},
	checkEmail: function (sEmail, fnSucc, fnFaild)
	{
		request(this._url, {act: 'check', email: sEmail}, fnSucc, fnFaild);
	},
	logout: function (fnSucc, fnFaild)
	{
		request(this._url, {act: 'logout'}, fnSucc, fnFaild);
	},
	getCur: function (fnSucc, fnFaild)
	{
		request(this._url, {act: 'cur_user'}, fnSucc, fnFaild);
	}
};zns.site.i={};

(function (){
	var linear=zns.site.fx.linear;
	var buffer=zns.site.fx.buffer;
	var flex=zns.site.fx.flex;
	var placeholder=zns.site.fx.zns_placeholder.create;

	zns.site.i.create=function ()
	{
		//左侧选项卡
		(function (){
			var aBtn=getEle('.userNav a');
			var aDiv=getEle('.userContent .userListBox');

			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].index=i;
				aBtn[i].onclick=function ()
				{
					for(var i=0;i<aBtn.length;i++)
					{
						aBtn[i].className='';
						aDiv[i].style.display='none';
					}
					aBtn[this.index].className='active';
					aDiv[this.index].style.display='block';

					if(window.navigator.userAgent.search(/msie 6/i)!=-1)
					{
						if(this.index==3)
							setTimeout(function (){
								getEle('.userInfoBox')[0].style.height=getEle('.userContent .userListBox')[3].scrollHeight+27+'px';
								getEle('.about_us')[0].style.height=getEle('.userContent .userListBox')[3].scrollHeight+'px';
							}, 10);
						else
						{
							getEle('.userInfoBox')[0].style.height='554px';
							getEle('.about_us')[0].style.height='527px';
						}
					}
				};
			}

			var oBtnFace=document.getElementById('change_face');
			oBtnFace.onclick=aBtn[2].onclick;
			oBtnFace.index=2;
		})();
	};
})();