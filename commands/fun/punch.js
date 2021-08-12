const tenorGif = require('../../helpers/tenorGif');

module.exports = {
	name: 'punch',
	description: 'Punch the mentioned member',
	async execute(message, args) {
		const gif = await tenorGif('punch', { gifType: 'anime' });
		return message.channel.send(`${gif}\nPunching ${args[0]}`);
	},
};