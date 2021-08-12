const tenorGif = require('../../helpers/tenorGif');

module.exports = {
	name: 'emote',
	aliases: ['gif'],
	description: 'Send the Gif',
	async execute(message, args) {
		try {
			const gif = await tenorGif(args.join(' '));
			return message.channel.send(`${gif}\n${args.join(' ')}`);
		} catch (err) {
			return message.channel.send('Oops! Something went wrong!!');
		}
	},
};