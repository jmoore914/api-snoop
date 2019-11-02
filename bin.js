const electron = require('electron');
const spawn = require('cross-spawn');
const argv = process.argv.slice(2);

console.log(require('electron'));


const result = spawn.sync(electron,
	[require.resolve('./app')].concat(argv),
	{stdio: 'ignore'});

process.exit(result.status);