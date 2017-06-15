let setSize = function(doc, win){
	var docEl = document.documentElement,
		isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1,
		dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if(width / dpr > 750) {
			width = 750 * dpr;
		}
		docEl.dataset.width = width
		docEl.dataset.percent = 100 * (width / 750);
		docEl.style.fontSize = 100 * (width / 750) + 'px';
		console.log(docEl.style.fontSize);
	};
	recalc()
	if(!document.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);	
}

/*(function(doc, win) {
	var docEl = doc.documentElement,
		isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
		dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if(width / dpr > 750) {
			width = 750 * dpr;
		}
		docEl.dataset.width = width
		docEl.dataset.percent = 100 * (width / 750);
		docEl.style.fontSize = 100 * (width / 750) + 'px';
	};
	recalc()
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);	*/

export default {
	setSize: setSize
}