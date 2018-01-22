NodeList.prototype.toArray = function(){
	return Array.apply(null, this);
};
Array.prototype.last = function(){
	if(this.length <= 0)
		return null;
	return this[this.length-1];
};

(function(){
	var getAlreadyReadPages = function(doc){
		return doc.querySelectorAll('[data-already-read-page]').toArray();
	};
	var startingPoint = null;
	var reachingPoint = null;
	var CONTENT_WIDTH = 640;		// FIXME: 固定値

	window.onload = function(){
		var backPage = function(){
			var last = getAlreadyReadPages(document).last();
			if(!last || !last.previousElementSibling)
				return false;
			delete last.dataset.alreadyReadPage;
		};
		var forwardPage = function(){
			var last = getAlreadyReadPages(document).last();
			if(!last || !last.nextElementSibling)
				return false;
			last.nextElementSibling.dataset.alreadyReadPage = true;
		};
		var toggleMenu = function(){
			var menu = document.querySelector('.book > header');
			if(menu.dataset.showingInfo == "true")
				delete menu.dataset.showingInfo;
			else
				menu.dataset.showingInfo = true;
		};

		var content = document.getElementsByClassName('content')[0];
		content.addEventListener('touchstart', function(e){
			//e.preventDefault();
			var t = e.touches[0];
			startingPoint = {x: t.pageX, y: t.pageY};
			reachingPoint = null;
		});
		content.addEventListener('touchmove', function(e){
			//e.preventDefault();
			var t = e.touches[0];
			reachingPoint = {x: t.pageX, y: t.pageY};
		});
		content.addEventListener('touchend', function(e){
			//e.preventDefault();
			if(reachingPoint == null){
				toggleMenu();
				return;
			}
			var dx = CONTENT_WIDTH / 3;
			var movedX = reachingPoint.x - startingPoint.x;
			var movedY = reachingPoint.y - startingPoint.y;
			if(movedX < 0 && -movedX >= dx)
				forwardPage();
			else if(movedX > 0 && movedX >= dx)
				backPage();
		});
	};
})();
