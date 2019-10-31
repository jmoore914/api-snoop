const publicPath = process.env.NODE_ENV==='development' ? '' : `${process.cwd()}/dist/`;

module.exports = {
	publicPath: publicPath
};