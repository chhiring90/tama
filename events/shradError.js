module.exports = {
	name: 'shardError',
	execute(err) {
		console.error('A websocket connection encountered an error', err);
	},
};