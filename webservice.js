
MRS.webService = (function (global) {


    //main server
    var urlServer = '';

    // local function to call AJAX request
    function sendOrReceiveRequest(type, url, data, dataType, successCallBack, afterErrorCallBack, async) {
        // if async is not specified then, by default send async request
		if ((!!(async)) || (async === undefined)) {
			async = true;
		}

        global.ajaxObj = $.ajax({
            type: type,
            url: url,
            data: data,
            async: async,
            dataType: dataType,
            timeout: 10000,
            crossDomain: true,
            beforeSend: function (xhr, settings) {
                //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
                //xhr.setRequestHeader('CLIENTIDENTITY', session.hash);

            },
            success: function (data, status, xhr) {
                // on success, call the passed success callback function
                if (typeof (successCallBack) === 'function') {
                    successCallBack(data, status, xhr);
                }

            },
            error: function (xhr, status, error) {
                // on error, call the error callback function
                if (status === 'timeout') {
                    console.log(status);

                } else {
                    // if error, pop-up alert
                    navigator.notification.alert('We\'re sorry! The server encountered an internal error or there is some connection problem in the network . Please try again later.', function () {
                        if (typeof (afterErrorCallBack) === 'function') {
                            afterErrorCallBack(xhr, status, error);
                        }
                    }, 'MRS', 'ok');

                }


            }

        });
    }


    // to send request to the server
    // it accepts url, data to be sent, success calllback, error callback and sync or async call 
    sendData = function (urlData, data, successCallBack, afterErrorCallBack, async) {
        // send POST request
        var type = 'POST';
        var url = urlServer + urlData;

        sendOrReceiveRequest(type, url, data, 'json', successCallBack, afterErrorCallBack, async);
    };
	
	
    // to receive data from the server
    // it accepts url, data format, success calllback, error callback and sync or async call
    receiveData = function (urlData, data, successCallBack, afterErrorCallBack, async) {
        // send GET request
        var type = 'GET';
        var url = urlServer + urlData;
        sendOrReceiveRequest(type, url, data, '', successCallBack, afterErrorCallBack, async);
    };
	
	
	return publicAPI = {
		sendData : sendData,
		receiveData : receiveData
		
	};
	
// in case, if require	
})(window.MRS);

