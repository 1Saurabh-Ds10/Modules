MRS.templates = (function(global) {
	

	
	var showContainer = function(templateName, containerName, callBackFunction) {

		// obj to pass to the template
		var dataObj = {
			
		};
		// local function to render template
		renderTemplate(templateName, containerName, dataObj, callBackFunction);

	};

	// render and show sub module
	var showSubContainer = function(templateName, containerName, list, callBackFunction) {

		var list = list || {};

		// obj to pass to the template
		var dataObj = {
			list: list

		};
		// local function to render template
		renderTemplate(templateName, containerName,	dataObj, callBackFunction, function(render) {
				$('#'+containerName).hide().html(render).fadeOut('fast').delay(100).fadeIn('fast');
			});

	};

	
	// local function to render and show template
	function renderTemplate(templateName, containerName, dataObj, callBackFunction, animateFunction) {

		// render the template based on Id
		var render = (typeof dataObj === 'undefined') 
							? $('#' + templateName).render()
							: $('#' + templateName).render(dataObj);
		
		(typeof (animateFunction) === 'function')
							? animateFunction(render)
							: $('#' + containerName).html(render);
		
		if (typeof (callBackFunction) === 'function') {
			callBackFunction(dataObj);
		}

	}
	
	
	return publicAPI = {
		
		showContainer: showContainer,
		showSubContainer: showSubContainer
		
		
		
	};

})(window.MRS);


