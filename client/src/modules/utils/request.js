var request = {};

request.get = function(url, callback) {
	var xhr = cc.loader.getXMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.timeout = 3000;
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 207)) {
			var json = null;
			try {
				json = JSON.parse(xhr.responseText);
			} catch (err) {
				cc.log("Failed to parse json");
				callback("Error");
			}
			return callback(null, json);
		} else {
			return callback("Error");
		}
	}

	xhr.onerror = function() {
		if (!xhr.isTimeout) {
			cc.log("On error occurs", xhr.status);
			return callback("Error");
		}
	}

	xhr.ontimeout = function() {
		cc.log("Timeout");
		return callback("Timeout");
		xhr.isTimeout = true;
	}

	xhr.send();
}
