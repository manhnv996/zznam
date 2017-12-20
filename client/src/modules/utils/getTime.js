// Return time in miliseconds, new Date().getTime()
function getTime() {
	var currentClientTime = new Date().getTime();
	// var delta = currentClientTime - gv.clientStartTime;
	return currentClientTime - gv.deltaTime;
}

// Return time in date object // new Date()
function getDate() {
	return new Date(getTime());
}
