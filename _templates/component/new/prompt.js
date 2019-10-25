module.exports = {
	prompt: ({prompter, args}) => {
		if (args.name) {
			return Promise.resolve({name: args.name});
		}
		return prompter.prompt({
			type: 'input',
			name: 'name',
			message: 'Component name: '
		});
	}
};