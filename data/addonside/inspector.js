var oldAttribute;
var previousElem = null;
var previousElemAttr = null;

self.port.on('alert', function(messageFromAddon){
	previousElem.setAttribute('style', previousElemAttr); // Возвращаем атрибуты кликнутому элементу
});

self.port.on("detach", function() {
	window.removeEventListener('click', clickListener, true);
	window.removeEventListener('mouseover', mouseoverListener, true);
	window.removeEventListener('mouseout', mouseoutListener, true);
});


var clickListener = function(event){
	var elem = event.target;
	self.postMessage(elem.nodeName);

	if(previousElem != null){ //если до этого момента был кликнут другой элемент - вернуть его атрибуты
		previousElem.setAttribute('style', previousElemAttr);
	}

	elem.setAttribute("style", oldAttribute);	// удалить атрибуты от события mouseover

	previousElemAttr = elem.getAttribute('style');	// Сохранить исходные атрибуты кликнутого элемента

	elem.setAttribute("style", oldAttribute + ";background: rgba(0, 0, 255, 0.1);");
	oldAttribute = elem.getAttribute('style');	// событие mouseover вернёт атрибуты кликнутого элемента

	previousElem = elem;	// Запомнить кликнутый элемент

	event.preventDefault();	 	//kill event
	event.stopPropagation();	//kill event
}

var mouseoverListener = function(event){
	var elem = event.target;
	oldAttribute = elem.getAttribute('style');
	elem.setAttribute("style", oldAttribute + ";background: rgba(0, 255, 0, 0.3);");
	event.preventDefault();		//kill event
	event.stopPropagation();	//kill event	
}

var mouseoutListener = function(event){
	var elem = event.target;
	elem.setAttribute("style", oldAttribute);
	event.preventDefault();		//kill event
	event.stopPropagation();	//kill event	
}

window.addEventListener('click', clickListener, true);	//"true" kill button click
window.addEventListener('mouseover', mouseoverListener, true);
window.addEventListener('mouseout', mouseoutListener, true);