const catchAsync = require('../../helpers/catchAsync');

module.exports = {
	name: 'prune',
	description: 'prune!',
	args: true,
	usage: '<command> <number>',
	execute: catchAsync(async (message, args) => {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) return message.reply('that doesnot seems to be a valid number.');
		if (amount < 2 || amount > 100) return message.reply('You need to input a number between 2 and 100');

		await message.channel.bulkDelete(amount, true);
		message.reply(`No of ${amount} message deleted successfully!!`);
	}),
};