const { ipcRenderer } = require('electron');

ipcRenderer.on('playpause', function(evt, args) {
    externalAPI.togglePause();
});

ipcRenderer.on('next', function(evt, args) {
    externalAPI.next();
});

ipcRenderer.on('prev', function(evt, args) {
    externalAPI.prev();
});

ipcRenderer.on('shuffle', function(evt, args) {
    externalAPI.toggleShuffle();
});

ipcRenderer.on('repeat', function(evt, args) {
    externalAPI.toggleRepeat();
});

function sendControls() {
    ipcRenderer.send('controls', externalAPI.getControls());
}

function sendTrack() {
    ipcRenderer.send('track', externalAPI.getCurrentTrack());
}

function sendState() {
	ipcRenderer.send('state', externalAPI.isPlaying());
}

window.onload = () => {
    externalAPI.on(externalAPI.EVENT_CONTROLS, sendControls);
    externalAPI.on(externalAPI.EVENT_TRACK, sendTrack);
    externalAPI.on(externalAPI.EVENT_STATE, sendState);

	setTimeout(function () {
		let playing = externalAPI.isPlaying();
		if (!playing) {
			externalAPI.play();
		}
	}, 2000);
};
