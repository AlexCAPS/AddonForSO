window.addEventListener("message", function(event) {
	toAddon = event.ports[0];
	toAddon.start();

	switch(true){
		case "add-on-ready".localeCompare(event.data) == 0:
			$(document).ready(function(){
				$("#stop-inspect").hide();
				
				$("#inspect").click(function(){
					$(this).hide();
					$("#stop-inspect").show();
					toAddon.postMessage("inspect");
				});

				$("#stop-inspect").click(function(){
					$("#stop-inspect").hide();
					$("#inspect").show();
					toAddon.postMessage("stop-inspect");
				});

				$("#repare").click(function(){
					toAddon.postMessage("repare");
				});

			});
			break;
		
	}
});