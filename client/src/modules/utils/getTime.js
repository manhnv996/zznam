function getTime() {
	var currentClientTime = new Date().getTime();
	// var delta = currentClientTime - gv.clientStartTime;
	return currentClientTime - gv.deltaTime;
}
