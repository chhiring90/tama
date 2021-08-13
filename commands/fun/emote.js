const tenorGif = require('../../helpers/tenorGif');
const catchAsync = require('../../helpers/catchAsync');

module.exports = {
	name: 'emote',
	aliases: ['gif'],
	description: 'Send the Gif',
	execute: catchAsync(async (message, args) => {
		const gif = await tenorGif(args.join(' '));
		return message.channel.send(`${gif}\n${args.join(' ')}`);
	}),
};