// main.js

// require the SDK modules
const { Panel } = require("dev/panel");
const { Tool } = require("dev/toolbox");
const { Class } = require("sdk/core/heritage");

const { MessageChannel } = require("sdk/messaging");
const channel = new MessageChannel();
const addonSide = channel.port1;
const panelSide = channel.port2;


var pageMod = require('sdk/page-mod');
var data = require("sdk/self").data;
var mod = null;
var panel = require("sdk/panel");

//global varible
var _myPanel;

// define the panel constructor
const myPanel = Class({
	extends: Panel,
	label: "MyAddon",
	tooltip: "tooltip",
	icon: "./icon-16.png",
	url: "./panel/interface.html",
	// when the panel is created,
	// take a reference to the debuggee
	setup: function(options) {
		this.debuggee = options.debuggee;
	},
	dispose: function() {
		this.debuggee = null;
		console.log("dispose");
		if(mod != null){
			console.log("mod.destroy()")
			mod.destroy();
		}
	},
	
	onReady: function() {
		_myPanel = this;
		_myPanel.postMessage("add-on-ready", [panelSide]);

	}
});

// export the constructor
exports.myPanel = myPanel;
// create a new tool, initialized
// with the new constructor

const myTool = new Tool({
	panels: { myPanel: myPanel }
});


// messages from the panel arrive here
addonSide.onmessage = function(event) {
	switch(true){
		case "inspect".localeCompare(event.data) == 0:
			handleClick();
			break;

		case "repare".localeCompare(event.data) == 0:
			mod.port.emit("alert", event.data);
			break;

		case "stop-inspect".localeCompare(event.data) == 0:
			mod.destroy();
			break;
		
		default:
			console.log("default case " + event.data);
	}
}


function handleClick() {

	mod = pageMod.PageMod({
		include: ['*'],
		contentScriptFile: data.url("./addonside/inspector.js"),
		attachTo: ["existing", "top"],
		onAttach: function(worker) {
			worker.on('message', function(message) {
				console.log('mouseclick: ' + message);
				_myPanel.postMessage("mouseclick: " + message, [panelSide]);
			});
		}
	});
}