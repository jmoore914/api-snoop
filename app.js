const {app, BrowserWindow} = require('electron');

let win;

function createWindow () {
	win = new BrowserWindow({
		title: 'Api Snoop',
		icon: __dirname + '/dist/favicon.svg',
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.on('page-title-updated', function(e) {
		e.preventDefault();
	});

	win.loadFile('dist/index.html');

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});