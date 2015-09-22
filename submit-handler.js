
// convert form data to serialize object
$(function(){
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
})();



MRS.submitHandler = (function(global) {

	// form serialize object to JSON conversion	
	formToJSON = function(form) {
		var params = JSON.stringify($(form).serializeObject());
		params = jQuery.parseJSON(params);
		// remove leading and trailing spaces from all the form element values
		params = removeSpacesFromFormData(params);
		return params;
	};


	// Common form validation by using validation plugin
	// validationEngine() is a function of validation plugin
	genericFormValidation = function(form) {
		$(form).validationEngine();
		if (!$(form).validationEngine('validate', {
			validateNonVisibleFields: true
		})) {
			return false;
		} else {
			return true;
		}
	};

	// trim extra leading and trailing spaces
	// function local to submit-handling logic
	function removeSpacesFromFormData(formData) {
		for (var key in formData) {
			if (formData.hasOwnProperty(key)) {
				var tempVal = $.trim(formData[key]);
				formData[key] = tempVal;
			}

		}
		return formData;
	}


	return publicAPI = {
		formToJSON: formToJSON,
		genericFormValidation: genericFormValidation
		
	};

})(window.MRS);
